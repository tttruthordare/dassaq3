import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ProgramCard } from '@/components/ProgramCard';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    image: '/images/programs-eng.jpg',
    name: 'Mühəndislik',
    universities: 'ATU, ASOIU, BEU, BDU',
    duration: '4 il',
    degree: 'Bakalavr',
  },
  {
    image: '/images/programs-med.jpg',
    name: 'Tibb',
    universities: 'ATU, BDUMT',
    duration: '6 il',
    degree: 'Bakalavr',
  },
  {
    image: '/images/programs-biz.jpg',
    name: 'Biznes və İdarəetmə',
    universities: 'UNEC, ADA, Xəzər',
    duration: '4 il',
    degree: 'Bakalavr',
  },
  {
    image: '/images/programs-art.jpg',
    name: 'İncəsənət və Dizayn',
    universities: 'Azİİ, Xəzər',
    duration: '4 il',
    degree: 'Bakalavr',
  },
  {
    image: '/images/programs-it.jpg',
    name: 'İT və Kompyuter Elmləri',
    universities: 'ATU, ASOIU, ADA',
    duration: '4 il',
    degree: 'Bakalavr',
  },
  {
    image: '/images/programs-law.jpg',
    name: 'Hüquqşünaslıq',
    universities: 'BDU, ADA, Xəzər',
    duration: '4 il',
    degree: 'Bakalavr',
  },
];

export function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const headerEls = headerRef.current?.children;
      if (headerEls) {
        gsap.set(headerEls, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(headerEls, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });
      }

      if (scrollContainerRef.current) {
        gsap.set(scrollContainerRef.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: scrollContainerRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(scrollContainerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="max-w-container mx-auto px-6">
        <div ref={headerRef} className="text-center max-w-[700px] mx-auto mb-12">
          <SectionLabel text="TƏHSİL PROQRAMLARI" className="mb-4" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-indigo mb-5">
            Populyar Təhsil İstiqamətləri
          </h2>
          <p className="text-base text-cool-grey">
            Azərbaycan universitetlərində təklif olunan ən populyar və tələbatlı təhsil proqramları.
          </p>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-7 overflow-x-auto px-6 lg:px-10 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {programs.map((prog) => (
            <ProgramCard key={prog.name} {...prog} />
          ))}
          {/* Spacer for scroll */}
          <div className="flex-shrink-0 w-4" />
        </div>

        {/* Right edge fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none hidden lg:block" />
      </div>

      <p className="text-center text-sm text-cool-grey mt-6 lg:hidden">
        Sürüşdürün →
      </p>
    </section>
  );
}
