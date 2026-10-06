import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import {
  courseStudents, findCourse, formatDate, isExamCourse, latestWhere, loadSections, percentOf, scoreTone
} from './adminCourses';
import './admin.css';

export function ScoreText({ correct, total }) {
  if (total === undefined || total === null) return <span className="adm-score tone-muted">—</span>;
  return <span className={`adm-score tone-${scoreTone(percentOf(correct, total))}`}>{correct}/{total}</span>;
}

const SUBTITLES = {
  maths: 'Monitor warmup, diagnostic & recheck performance'
};

export default function AdminCourseDashboard() {
  const { course: key } = useParams();
  const course = findCourse(key);
  const exam = isExamCourse(key);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiFetch('/admin/scores');
      if (!response.ok) throw new Error('Failed to load admin data');
      const rows = courseStudents({ math: [], exams: [], ...(await response.json()) }, key);
      setStudents(rows);
      setSections(exam ? await loadSections(key, rows.flatMap((r) => r.entries)) : []);
      setError(null);
    } catch (err) {
      console.error('Error loading course dashboard:', err);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [key, exam]);

  useEffect(() => {
    if (course) load();
  }, [course, load]);

  if (!course) {
    return (
      <section className="adm-page">
        <div className="container py-5">
          <p>Unknown course.</p>
          <Link to="/admin" className="adm-btn adm-btn-dark">&larr; Admin</Link>
        </div>
      </section>
    );
  }

  const allEntries = students.flatMap((s) => s.entries);
  const avg = allEntries.length ? Math.round(allEntries.reduce((sum, a) => sum + a.percent, 0) / allEntries.length) : 0;
  const openStudent = (email) => navigate(`/admin/user-detail?course=${key}&email=${encodeURIComponent(email)}`);

  return (
    <section className="adm-page">
      <div className="container-fluid adm-wrap">
        <div className="adm-page-head">
          <div>
            <h1 className="adm-page-title">{course.label} Dashboard</h1>
            <p className="adm-page-subtitle">
              {SUBTITLES[key] || `Monitor Full ${course.label} Test & module practice performance`}
            </p>
          </div>
          <div className="adm-head-actions">
            <Link to="/admin" className="adm-btn adm-btn-dark">&larr; Admin</Link>
            <button type="button" className="adm-btn adm-btn-blue" onClick={load} disabled={loading}>
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
          </div>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="adm-stat-row">
          <div className="adm-stat-card">
            <div className="adm-stat-icon tone-blue"><i className="bi bi-people-fill"></i></div>
            <div>
              <div className="adm-stat-value">{students.length}</div>
              <div className="adm-stat-label">Total Students</div>
            </div>
          </div>
          <div className="adm-stat-card">
            <div className="adm-stat-icon tone-green"><i className="bi bi-bar-chart-fill"></i></div>
            <div>
              <div className="adm-stat-value">{avg}%</div>
              <div className="adm-stat-label">Average Score</div>
            </div>
          </div>
          <div className="adm-stat-card">
            <div className="adm-stat-icon tone-orange"><i className="bi bi-journals"></i></div>
            <div>
              <div className="adm-stat-value">{allEntries.length}</div>
              <div className="adm-stat-label">Total Submissions</div>
            </div>
          </div>
        </div>

        <div className="adm-panel">
          <div className="adm-panel-head">
            <span>Recent Exam Activity</span>
            <span className="adm-pill-blue">{students.length} {students.length === 1 ? 'student' : 'students'}</span>
          </div>
          <div className="table-responsive">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Student</th>
                  {exam ? (
                    <>
                      <th>Full Test</th>
                      {sections.map((s) => <th key={s.code}>{s.name} Module</th>)}
                    </>
                  ) : (
                    <>
                      <th>Warmup</th>
                      <th>Diagnostic</th>
                      <th>Recheck</th>
                    </>
                  )}
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const latest = s.entries[s.entries.length - 1];
                  const full = exam ? latestWhere(s.entries, (a) => a.scope === 'full') : null;
                  return (
                    <tr key={s.email}>
                      <td>
                        <div className="adm-student-name">{s.username}</div>
                        <div className="adm-student-email">{s.email}</div>
                      </td>
                      {exam ? (
                        <>
                          <td>{full ? <ScoreText correct={full.correct} total={full.total} /> : <ScoreText />}</td>
                          {sections.map((sec) => {
                            const mod = latestWhere(s.entries, (a) => a.scope === 'module' && a.section === sec.code);
                            return <td key={sec.code}>{mod ? <ScoreText correct={mod.correct} total={mod.total} /> : <ScoreText />}</td>;
                          })}
                        </>
                      ) : (
                        <>
                          <td><ScoreText correct={latest.warmup_correct} total={latest.warmup_total} /></td>
                          <td><ScoreText correct={latest.diagnostic_correct} total={latest.diagnostic_total} /></td>
                          <td>
                            {latest.recheck_total === 0 && percentOf(latest.diagnostic_correct, latest.diagnostic_total) >= 90
                              ? <span className="adm-score tone-high">Not needed</span>
                              : <ScoreText correct={latest.recheck_correct} total={latest.recheck_total} />}
                          </td>
                        </>
                      )}
                      <td className="adm-muted-cell">{formatDate(latest.date)}</td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-blue adm-btn-sm" onClick={() => openStudent(s.email)}>
                          View &rarr;
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {!loading && students.length === 0 && (
                  <tr>
                    <td colSpan={20} className="adm-empty">
                      <i className="bi bi-inbox"></i>
                      No attempts recorded yet.
                    </td>
                  </tr>
                )}
                {loading && students.length === 0 && (
                  <tr><td colSpan={20} className="adm-empty">Loading&hellip;</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
