import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.3
        )
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.5
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.6
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0.7
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.2
        );

      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] bg-white overflow-hidden flex"
    >
      {/* Left Panel */}
      <div className="flex-[0.55] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-20 z-10 relative">
        <SectionLabel text="AZƏRBAYCANIN TƏHSİL PORTALI" className="mb-6" />

        <h1
          ref={headlineRef}
          className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-deep-indigo leading-[1.1] mb-6 opacity-0"
        >
          Yüksək Təhsilin
          <br />
          <span className="text-[1.1em]">Qapısını Açın</span>
        </h1>

        <p
          ref={subheadRef}
          className="font-playfair text-lg sm:text-xl italic text-cool-grey max-w-[480px] leading-relaxed mb-5 opacity-0"
        >
          Azərbaycanın ən yaxşı universitetləri, qəbul tələbləri və təhsil proqramları haqqında ətraflı məlumat
        </p>

        <p
          ref={descRef}
          className="font-inter text-base text-cool-grey max-w-[440px] leading-relaxed mb-8 opacity-0"
        >
          Azərbaycannın ali təhsil müəssisələrinin tam siyahısı, reytinqlər, ixtisaslar, təhsil haqları və tələbə həyatı haqqında bilməyiniz lazım olan hər şey — bir ünvanda.
        </p>

        <a
          ref={ctaRef}
          href="#universities"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#universities')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-block self-start px-8 py-3.5 bg-muted-teal text-white text-sm font-medium rounded-pill hover:bg-deep-teal hover:scale-[1.03] hover:shadow-card-hover transition-all duration-300 opacity-0"
        >
          Universitetləri Kəşf Et
        </a>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className={`absolute left-8 sm:left-12 lg:left-16 bottom-10 flex items-center gap-2 transition-opacity duration-300 ${
            scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <ChevronDown className="w-5 h-5 text-cool-grey animate-bounce-gentle" />
          <span className="text-sm text-cool-grey">Aşağı sürüşdürün</span>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden md:block flex-[0.45] relative">
        <div
          ref={imageRef}
          className="absolute inset-0 rounded-l-image overflow-hidden opacity-0"
        >
          <img
            src="/images/hero-bg.jpg"
            alt="Baku Flame Towers and Caspian Sea skyline at golden hour"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile Hero Image */}
      <div className="md:hidden absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Baku skyline"
          className="w-full h-full object-cover opacity-15"
        />
      </div>
    </section>
  );
}
