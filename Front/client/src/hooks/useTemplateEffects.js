import { useEffect } from 'react';
import AOS from 'aos';

// Ports assets/js/main.js (Mentor template) behavior into a React effect.
export function useTemplateEffects() {
  useEffect(() => {
    const body = document.body;
    const header = document.querySelector('#header');
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const scrollTopEl = document.querySelector('.scroll-top');

    function toggleScrolled() {
      if (!header) return;
      if (
        !header.classList.contains('scroll-up-sticky') &&
        !header.classList.contains('sticky-top') &&
        !header.classList.contains('fixed-top')
      ) {
        return;
      }
      window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
    }

    function mobileNavToggle() {
      body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn?.classList.toggle('bi-list');
      mobileNavToggleBtn?.classList.toggle('bi-x');
    }

    function toggleScrollTop() {
      if (!scrollTopEl) return;
      window.scrollY > 100 ? scrollTopEl.classList.add('active') : scrollTopEl.classList.remove('active');
    }

    function onScrollTopClick(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function hideMobileNavOnLinkClick() {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    }

    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });

    document.addEventListener('scroll', toggleScrolled);
    document.addEventListener('scroll', toggleScrollTop);
    toggleScrolled();
    toggleScrollTop();

    mobileNavToggleBtn?.addEventListener('click', mobileNavToggle);
    scrollTopEl?.addEventListener('click', onScrollTopClick);

    const navLinks = document.querySelectorAll('#navmenu a');
    navLinks.forEach((link) => link.addEventListener('click', hideMobileNavOnLinkClick));

    const preloader = document.querySelector('#preloader');
    preloader?.remove();

    return () => {
      document.removeEventListener('scroll', toggleScrolled);
      document.removeEventListener('scroll', toggleScrollTop);
      mobileNavToggleBtn?.removeEventListener('click', mobileNavToggle);
      scrollTopEl?.removeEventListener('click', onScrollTopClick);
      navLinks.forEach((link) => link.removeEventListener('click', hideMobileNavOnLinkClick));
    };
  }, []);
}
