import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { UniversityCard } from '@/components/UniversityCard';

gsap.registerPlugin(ScrollTrigger);

const universities = [
  {
    image: '/images/uni-bsu.jpg',
    name: 'Bakı Dövlət Universiteti',
    city: 'Bakı',
    description: 'Azərbaycanın ən qədim və ən prestijli universiteti. 1919-cu ildən fəaliyyət göstərir.',
    rating: '4.8',
    students: '25,000+',
  },
  {
    image: '/images/uni-ada.jpg',
    name: 'ADA Universiteti',
    city: 'Bakı',
    description: 'Beynəlxalq standartlarda təhsil və aparıcı araşdırma mərkəzi.',
    rating: '4.9',
    students: '3,500+',
  },
  {
    image: '/images/uni-aztu.jpg',
    name: 'Azərbaycan Texniki Universiteti',
    city: 'Bakı',
    description: 'Texniki sahələrdə ixtisaslaşan aparıcı dövlət universiteti.',
    rating: '4.6',
    students: '18,000+',
  },
  {
    image: '/images/uni-khazar.jpg',
    name: 'Xəzər Universiteti',
    city: 'Bakı',
    description: 'Azərbaycanın ilk özəl universiteti. İngilis dilində təhsil imkanı.',
    rating: '4.7',
    students: '4,000+',
  },
  {
    image: '/images/uni-asoiu.jpg',
    name: 'Azərbaycan Dövlət Neft və Sənaye Universiteti',
    city: 'Bakı',
    description: 'Neft-qaz və sənaye mühəndisliyi sahəsində lider.',
    rating: '4.7',
    students: '12,000+',
  },
  {
    image: '/images/uni-bdu.jpg',
    name: 'Bakı Mühəndislik Universiteti',
    city: 'Bakı',
    description: 'Mühəndislik təhsilində yenilikçi yanaşma və müasir laboratoriyalar.',
    rating: '4.5',
    students: '6,000+',
  },
];

export function TopUniversities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Grid stagger
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
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
      id="universities"
      ref={sectionRef}
      className="bg-light-grey py-24 lg:py-32"
    >
      <div className="max-w-container mx-auto px-6">
        <div ref={headerRef} className="text-center max-w-[700px] mx-auto mb-16">
          <SectionLabel text="ƏN YAXŞI UNIVERSITETLƏR" className="mb-4" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-indigo mb-5">
            Azərbaycanın Ən Yaxşı Universitetləri
          </h2>
          <p className="text-base text-cool-grey">
            Ölkənin aparıcı ali təhsil müəssisələri — yüksək keyfiyyətli təhsil, beynəlxalq akkreditasiya və müasir infrastruktur.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {universities.map((uni) => (
            <UniversityCard key={uni.name} {...uni} />
          ))}
        </div>
      </div>
    </section>
  );
}
