import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import RecentActivityBell from '../../components/admin/RecentActivityBell';
import { ALL_COURSES, COURSE_GROUPS, courseStudents } from './adminCourses';
import './admin.css';

export default function AdminDashboard() {
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await apiFetch('/admin/scores');
        if (!response.ok) throw new Error('Failed to load admin data');
        const data = await response.json();
        if (!cancelled) setScores({ math: [], exams: [], ...data });
      } catch (err) {
        console.error('Error loading admin dashboard:', err);
        if (!cancelled) setError('Failed to load admin dashboard data.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const studentCount = (key) => (scores ? courseStudents(scores, key).length : null);

  return (
    <section className="adm-page">
      <div className="adm-topbar">
        <div className="container adm-topbar-inner">
          <h2 className="adm-topbar-title">
            <i className="bi bi-shield-lock-fill"></i> Admin Dashboard
          </h2>
          <RecentActivityBell />
        </div>
      </div>

      <div className="container adm-overview">
        <aside className="adm-sidebar">
          <NavLink to="/admin" end className="adm-sidebar-link">
            <i className="bi bi-speedometer2"></i> Dashboard Overview
          </NavLink>
          {ALL_COURSES.map((course) => (
            <NavLink key={course.key} to={`/admin/course/${course.key}`} className="adm-sidebar-link">
              <i className={`bi ${course.icon}`}></i> {course.label}
            </NavLink>
          ))}
        </aside>

        <div className="adm-overview-main">
          <div className="adm-welcome">
            <div className="adm-welcome-avatar">
              <i className="bi bi-person-fill"></i>
            </div>
            <div>
              <h1>Welcome to Admin Dashboard</h1>
              <p>Here&apos;s what&apos;s happening with your platform today.</p>
            </div>
          </div>

          {error && <p className="text-danger">{error}</p>}

          {COURSE_GROUPS.map((group) => (
            <div key={group.title} className="adm-course-group">
              <h3 className="adm-group-title">
                <i className={`bi ${group.icon}`}></i> {group.title}
              </h3>
              <div className="adm-course-grid">
                {group.courses.map((course) => {
                  const count = studentCount(course.key);
                  return (
                    <Link
                      key={course.key}
                      to={`/admin/course/${course.key}`}
                      className="adm-course-card adm-course-card-link"
                    >
                      <div className="adm-course-card-top">
                        <div className={`adm-course-icon tone-${course.tone}`}>
                          <i className={`bi ${course.icon}`}></i>
                        </div>
                        {count !== null && (
                          <span className={`adm-count-badge tone-${course.tone}`}>
                            {count} {count === 1 ? 'student' : 'students'}
                          </span>
                        )}
                      </div>
                      <h4>{course.label}</h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
