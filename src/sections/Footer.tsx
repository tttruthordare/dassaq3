import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const linkGroups = [
  {
    heading: 'Universitetlər',
    links: [
      'Bakı Dövlət Universiteti',
      'ADA Universiteti',
      'Xəzər Universiteti',
      'Azərbaycan Texniki Universiteti',
      'ASOIU',
    ],
  },
  {
    heading: 'Məlumat',
    links: [
      'Qəbul Tələbləri',
      'Təhsil Proqramları',
      'Təhsil Haqqı',
      'Tələbə Həyatı',
      'Tez-tez Verilən Suallar',
    ],
  },
  {
    heading: 'Xarici Tələbələr',
    links: [
      'Viza Prosesi',
      'Dil Tələbləri',
      'Yataqxana',
      'Xarici Tələbə Təlimatı',
    ],
  },
  {
    heading: 'Əlaqə',
    links: [
      'info@universitetler.az',
      '+994 12 123 45 67',
      'Bakı, Azərbaycan',
    ],
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cols = columnsRef.current?.children;
      if (cols) {
        gsap.set(cols, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: columnsRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(cols, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });
      }

      if (bottomRef.current) {
        gsap.set(bottomRef.current, { opacity: 0 });
        ScrollTrigger.create({
          trigger: bottomRef.current,
          start: 'top 95%',
          once: true,
          onEnter: () => {
            gsap.to(bottomRef.current, {
              opacity: 1,
              duration: 0.6,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-white border-t border-warm-sand py-16 pb-10">
      <div className="max-w-container mx-auto px-6">
        {/* Link columns */}
        <div
          ref={columnsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {linkGroups.map((group) => (
            <div key={group.heading}>
              <h4 className="font-inter text-sm font-semibold text-deep-indigo uppercase tracking-[1px] mb-5">
                {group.heading}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-cool-grey hover:text-muted-teal transition-colors duration-300 cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          ref={bottomRef}
          className="border-t border-warm-sand pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cool-grey"
        >
          <p>
            &copy; 2025 Universitetler.az — Azərbaycan Universitetləri Portalı
          </p>
          <div className="flex gap-4">
            <span className="hover:text-muted-teal transition-colors cursor-pointer">
              Məxfilik Siyasəti
            </span>
            <span>|</span>
            <span className="hover:text-muted-teal transition-colors cursor-pointer">
              İstifadə Şərtləri
            </span>
          </div>
          <p>Azərbaycana xoş gəlmisiniz 🇦🇿</p>
        </div>
      </div>
    </footer>
  );
}
