import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AOS from 'aos';
import Header from './Header';
import Footer from './Footer';
import { useTemplateEffects } from '../hooks/useTemplateEffects';

export default function Layout() {
  useTemplateEffects();
  const location = useLocation();

  useEffect(() => {
    AOS.refreshHard();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="main">
        {/* Pages are code-split; keep the header and footer while a page's code downloads. */}
        <Suspense fallback={<div className="page-loading" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Loading&hellip;</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <a href="#top" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}
