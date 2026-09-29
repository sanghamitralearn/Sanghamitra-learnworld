import { Link } from 'react-router-dom';
import ENGLISH_TRACKS from './english/englishTracks';
import './English.css';

const isLive = (module) => module.status !== 'soon';

// The very first live module is where a brand-new learner should begin.
const START = ENGLISH_TRACKS.flatMap((t) => t.modules).find(isLive);

const ONBOARDING = [
  { icon: 'bi-clipboard-check', title: 'Take the diagnostic', text: 'A short test finds your current level, so you never start too easy or too hard.' },
  { icon: 'bi-signpost-2', title: 'Follow the path', text: 'Work through the tracks below in order — or jump straight to the one you need.' },
  { icon: 'bi-graph-up-arrow', title: 'Watch your progress', text: 'Your dashboard shows what improved and what needs another pass.' },
];

function ModuleCard({ module, isStart }) {
  const live = isLive(module);
  const body = (
    <>
      <span className="ex-mod-icon" aria-hidden="true"><i className={`bi ${module.icon}`}></i></span>
      <span className="ex-mod-body">
        <span className="ex-mod-title">
          <b>{module.title}</b>
          {isStart && <span className="ex-badge start">Start here</span>}
          {!live && <span className="ex-badge soon">Coming soon</span>}
        </span>
        <span className="ex-mod-text">{module.text}</span>
        {live && module.needsLogin && (
          <span className="ex-mod-note"><i className="bi bi-lock"></i> Free account needed</span>
        )}
      </span>
      {live && <i className="bi bi-chevron-right ex-mod-go" aria-hidden="true"></i>}
    </>
  );

  if (!live) {
    return <div className="ex-mod is-soon" aria-disabled="true">{body}</div>;
  }
  return <Link to={module.to} className={`ex-mod${isStart ? ' is-start' : ''}`}>{body}</Link>;
}

export default function English() {
  const moduleCount = ENGLISH_TRACKS.reduce((n, t) => n + t.modules.filter(isLive).length, 0);

  return (
    <div className="englishx">
      <header className="ex-hero">
        <div className="ex-shell">
          <ol className="ex-crumbs">
            <li><Link to="/">Home</Link></li>
            <li className="sep" aria-hidden="true">/</li>
            <li aria-current="page">English</li>
          </ol>

          <div className="ex-hero-inner">
            <span className="ex-eyebrow">
              <span className="dot" aria-hidden="true"><i className="bi bi-check-lg"></i></span>
              English Learning Hub
            </span>
            <h1>Read, write and speak with <em>real confidence.</em></h1>
            <p className="ex-hero-lede">
              {ENGLISH_TRACKS.length} tracks, {moduleCount} ready-to-use modules. Start with a quick diagnostic and
              we&apos;ll show you exactly where to go next.
            </p>

            <div className="ex-hero-cta">
              {START && (
                <Link to={START.to} className="ex-btn primary">
                  Start with the {START.title} <i className="bi bi-arrow-right"></i>
                </Link>
              )}
              <a href="#ex-path" className="ex-btn ghost">See the learning path</a>
            </div>
          </div>
        </div>
      </header>

      <div className="ex-shell ex-onboard-wrap">
        <section className="ex-onboard" aria-labelledby="ex-onboard-title">
          <div className="ex-onboard-head">
            <span className="ex-tag-new"><i className="bi bi-stars"></i> New here?</span>
            <h2 id="ex-onboard-title">Three steps to get going</h2>
          </div>
          <ol className="ex-onboard-steps">
            {ONBOARDING.map((s, i) => (
              <li key={s.title}>
                <span className="n">{i + 1}</span>
                <span>
                  <b>{s.title}</b>
                  <span className="t">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <main className="ex-shell ex-body" id="ex-path">
        <div className="ex-section-head">
          <h2>Your learning path</h2>
          <p>Tracks are ordered the way skills build on each other — words first, then sentences, then full essays.</p>
        </div>

        <ol className="ex-path">
          {ENGLISH_TRACKS.map((track, i) => {
            const liveCount = track.modules.filter(isLive).length;
            return (
              <li key={track.id} className="ex-track" data-accent={track.accent}>
                <div className="ex-track-rail" aria-hidden="true">
                  <span className="ex-track-step">{i + 1}</span>
                </div>

                <div className="ex-track-card">
                  <div className="ex-track-head">
                    <span className="ex-icon" aria-hidden="true"><i className={`bi ${track.icon}`}></i></span>
                    <div className="ex-track-title">
                      <span className="ex-track-kicker">Step {i + 1}</span>
                      <h3>{track.title}</h3>
                      <p>{track.summary}</p>
                    </div>
                    <span className="ex-track-count">
                      {liveCount > 0
                        ? `${liveCount} module${liveCount === 1 ? '' : 's'}`
                        : 'In progress'}
                    </span>
                  </div>

                  <div className="ex-mods">
                    {track.modules.map((module) => (
                      <ModuleCard key={module.title} module={module} isStart={module === START} />
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="ex-footer-cta">
          <span><i className="bi bi-graph-up-arrow"></i> Already practising? Check what&apos;s improved.</span>
          <Link to="/dashboard" className="ex-btn outline">Open my dashboard</Link>
        </div>
      </main>
    </div>
  );
}
