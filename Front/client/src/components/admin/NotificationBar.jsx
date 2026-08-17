import { useEffect, useState } from 'react';
import { apiFetch } from '../../api/client';
import './NotificationBar.css';

const TYPE_OPTIONS = ['info', 'success', 'warning', 'danger'];

export default function NotificationBar() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const [submitting, setSubmitting] = useState(false);

  async function loadNotifications() {
    try {
      const response = await apiFetch('/admin/notifications');
      if (!response.ok) throw new Error('Failed to load notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function handleDismiss(id) {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, dismissed: true } : n)));
    try {
      await apiFetch(`/admin/notifications/${id}/dismiss`, { method: 'PATCH' });
    } catch (error) {
      console.error('Error dismissing notification:', error);
    }
  }

  async function handleCreate(event) {
    event.preventDefault();
    if (!title.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      const response = await apiFetch('/admin/notifications', {
        method: 'POST',
        body: JSON.stringify({ title, message, type })
      });
      if (!response.ok) throw new Error('Failed to create notification');
      setTitle('');
      setMessage('');
      setType('info');
      setShowForm(false);
      await loadNotifications();
    } catch (error) {
      console.error('Error creating notification:', error);
    } finally {
      setSubmitting(false);
    }
  }

  const active = notifications.filter((n) => !n.dismissed);

  return (
    <div className="notification-bar mb-4">
      {!loading && active.map((n) => (
        <div key={n._id} className={`alert alert-${n.type} d-flex justify-content-between align-items-start`} role="alert">
          <div>
            <strong>{n.title}</strong>
            <div>{n.message}</div>
          </div>
          <button type="button" className="btn-close" aria-label="Dismiss" onClick={() => handleDismiss(n._id)}></button>
        </div>
      ))}

      <button type="button" className="btn btn-sm btn-outline-secondary mb-2" onClick={() => setShowForm((s) => !s)}>
        {showForm ? 'Cancel' : '+ New notification'}
      </button>

      {showForm && (
        <form className="notification-form card card-body mb-3" onSubmit={handleCreate}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              required
            />
          </div>
          <div className="mb-2">
            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Posting…' : 'Post notification'}
          </button>
        </form>
      )}
    </div>
  );
}
