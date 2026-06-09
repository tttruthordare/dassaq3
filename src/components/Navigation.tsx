import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Universitetlər', href: '#universities' },
  { label: 'Qəbul', href: '#admission' },
  { label: 'Proqramlar', href: '#programs' },
  { label: 'Xərclər', href: '#fees' },
  { label: 'FAQ', href: '#faq' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        '.mobile-nav-overlay',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.4, ease: 'power3.out', transformOrigin: 'top' }
      );
      gsap.fromTo(
        '.mobile-nav-link',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 h-[60px] px-6 rounded-nav flex items-center justify-between gap-8 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-nav border border-warm-sand/50'
            : 'bg-white/85 backdrop-blur-xl border border-warm-sand/50 shadow-nav'
        }`}
        style={{ maxWidth: '1100px', width: '92vw' }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-inter text-base font-bold text-deep-indigo tracking-wide whitespace-nowrap"
        >
          UNIVERSITETLER.az
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-inter text-sm font-medium text-cool-grey hover:text-muted-teal transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#universities"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#universities');
            }}
            className="inline-block px-6 py-2.5 bg-muted-teal text-white text-sm font-medium rounded-pill hover:bg-deep-teal transition-all duration-300"
          >
            Ətraflı
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-deep-indigo"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay fixed inset-0 z-[100] bg-deep-indigo flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 p-2 text-white"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="mobile-nav-link font-inter text-2xl font-medium text-white hover:text-accent-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
