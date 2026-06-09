import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax on decorative image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Content stagger animation
      const contentEls = contentRef.current?.children;
      if (contentEls) {
        gsap.set(contentEls, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(contentEls, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-deep-indigo py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative background image */}
      <div className="absolute right-0 top-0 w-[45%] h-full hidden lg:block">
        <img
          ref={imageRef}
          src="/images/cta-bg.jpg"
          alt="Graduation celebration"
          loading="lazy"
          className="w-full h-[120%] object-cover opacity-15"
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[700px] mx-auto px-6 text-center"
      >
        <SectionLabel
          text="TƏHSİLƏ İLK ADDIM"
          isDark
          className="mb-6"
        />
        <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-white leading-tight mb-6">
          Gələcəyinizi
          <br />
          Bugündən Qurun
        </h2>
        <p className="text-base text-white/75 max-w-[520px] mx-auto mb-8 leading-relaxed">
          Azərbaycanın ən yaxşı universitetlərini kəşf edin, sizə uyğun proqramı tapın və təhsil yolculuğunuza başlayın. Bütün lazımi məlumat bir klik uzağınızda.
        </p>
        <a
          href="#universities"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#universities')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-block px-10 py-4 bg-accent-gold text-deep-indigo font-inter text-base font-semibold rounded-pill hover:bg-[#D4B87A] hover:scale-[1.04] transition-all duration-300"
        >
          İndi Başla
        </a>
        <p className="text-sm text-white/50 mt-4">
          və ya universitetlərlə birbaşa əlaqə saxlayın
        </p>
      </div>
    </section>
  );
}
