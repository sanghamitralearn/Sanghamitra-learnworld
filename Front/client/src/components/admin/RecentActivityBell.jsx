import { useEffect, useRef, useState } from 'react';
import { apiFetch } from '../../api/client';
import './RecentActivityBell.css';

function relativeTime(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

function percentClass(pct) {
  if (pct >= 70) return 'activity-pct-high';
  if (pct >= 40) return 'activity-pct-mid';
  return 'activity-pct-low';
}

export default function RecentActivityBell() {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const rootRef = useRef(null);

  async function loadActivity() {
    setLoading(true);
    try {
      const response = await apiFetch('/admin/recent-activity');
      if (!response.ok) throw new Error('Failed to load recent activity');
      const data = await response.json();
      setActivity(data);
    } catch (error) {
      console.error('Error loading recent activity:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActivity();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="recent-activity-bell" ref={rootRef}>
      <button
        type="button"
        className="activity-bell-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Recent activity"
      >
        <i className="bi bi-bell-fill"></i>
        {activity.length > 0 && <span className="activity-bell-badge">{activity.length}</span>}
      </button>

      {open && (
        <div className="activity-panel">
          <div className="activity-panel-header">
            <span>Recent Activity</span>
          </div>
          <div className="activity-panel-body">
            {loading && <p className="text-muted small px-3 py-2 mb-0">Loading&hellip;</p>}
            {!loading && activity.length === 0 && (
              <p className="text-muted small px-3 py-2 mb-0">No test activity yet.</p>
            )}
            {!loading && activity.map((item) => (
              <div key={item.id} className="activity-row">
                <div className={`activity-icon activity-icon-${item.subject}`}>
                  <i className={item.subject === 'maths' ? 'bi bi-calculator' : 'bi bi-journal-text'}></i>
                </div>
                <div className="activity-details">
                  <div className="activity-name">{item.username}</div>
                  <div className="activity-topic">{item.topic}</div>
                  <div className="activity-time">{relativeTime(item.date)}</div>
                </div>
                <div className={`activity-pct ${percentClass(item.percentage)}`}>{item.percentage}%</div>
              </div>
            ))}
          </div>
          <button type="button" className="activity-panel-footer" onClick={loadActivity}>
            Refresh Notifications
          </button>
        </div>
      )}
    </div>
  );
}
