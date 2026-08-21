import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api/client';

export default function MathPage() {
  const [catalog, setCatalog] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [openGrades, setOpenGrades] = useState(new Set());

  useEffect(() => {
    let cancelled = false;
    apiFetch('/math/catalog')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (cancelled) return;
        setCatalog(data);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, []);

  // Group chapters by grade, then by chapter, listing available levels.
  const byGrade = catalog.reduce((acc, chapter) => {
    const gradeKey = chapter.grade;
    if (!acc[gradeKey]) acc[gradeKey] = { gradeLabel: chapter.gradeLabel, chapters: {} };
    const chapterKey = chapter.chapterSlug;
    if (!acc[gradeKey].chapters[chapterKey]) {
      acc[gradeKey].chapters[chapterKey] = { chapterName: chapter.chapterName, description: chapter.description, levels: [] };
    }
    acc[gradeKey].chapters[chapterKey].levels.push(chapter.level);
    return acc;
  }, {});

  return (
    <>
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Mathematics</h1>
                <p className="mb-0">Welcome to our Mathematics Hub, where numbers come alive and logic reigns supreme. Pick a chapter and level below to start a bootcamp: an untimed warm-up and diagnostic, or a timed speed &amp; strategy simulation.</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Courses</li>
            </ol>
          </div>
        </nav>
      </div>{/* End Page Title */}

      <section id="courses-list" className="section courses-list">
        <div className="container">
          {status === 'loading' && <p className="text-center">Loading chapters&hellip;</p>}
          {status === 'error' && <p className="text-center">Couldn&apos;t load the math catalog right now. Please try again later.</p>}
          {status === 'ready' && Object.keys(byGrade).length === 0 && (
            <p className="text-center">No bootcamp chapters are published yet.</p>
          )}

          <div className="row">
            {Object.entries(byGrade).map(([gradeKey, gradeData]) => {
              const chapterCount = Object.keys(gradeData.chapters).length;
              const isOpen = openGrades.has(gradeKey);
              return (
                <div key={gradeKey} className="col-lg-6 d-flex align-items-stretch mb-4" data-aos="zoom-in">
                  <div className="course-item w-100">
                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <button className="category">{gradeData.gradeLabel}</button>
                      </div>
                      <p className="description">
                        {chapterCount} chapter{chapterCount === 1 ? '' : 's'} available &mdash; place value, fractions, geometry and more.
                      </p>
                      {!isOpen && (
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => setOpenGrades((current) => new Set(current).add(gradeKey))}
                        >
                          View Chapters
                        </button>
                      )}

                      {isOpen && (
                        <div className="row mt-4">
                          {Object.entries(gradeData.chapters).map(([chapterSlug, chapterData]) => (
                            <div key={chapterSlug} className="col-md-6 d-flex align-items-stretch mb-3">
                              <div className="course-item w-100">
                                <div className="course-content">
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <button className="category">{chapterData.chapterName}</button>
                                  </div>
                                  <p className="description">{chapterData.description}</p>
                                  <div className="d-flex flex-wrap gap-2">
                                    {chapterData.levels.sort((a, b) => a - b).map((level) => (
                                      <Link
                                        key={level}
                                        to={`/math/${gradeKey}/${chapterSlug}/${level}`}
                                        className="btn btn-sm btn-outline-primary"
                                      >
                                        Level {level}{level === 4 ? ' (Timed)' : ''}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
