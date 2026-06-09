import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, Building2, Cpu, HeartPulse, Globe, GraduationCap } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';
import { FeatureCard } from '@/components/FeatureCard';

gsap.registerPlugin(ScrollTrigger);

const types = [
  {
    icon: Landmark,
    title: 'Dövlət Universitetləri',
    description:
      'Dövlət büdcəsi hesabına və ödənişli əsaslarla fəaliyyət göstərən ən böyük universitetlər. BDU, ATU, ADNSU və digərləri. Geniş ixtisas seçimi və dövlət diplomu.',
  },
  {
    icon: Building2,
    title: 'Özəl Universitetlər',
    description:
      'Xəzər, Odlar Yurdu, Qafqaz və digər özəl universitetlər. Müasir infrastruktur, ingilis dilində təhsil proqramları və beynəlxalq əməkdaşlıq.',
  },
  {
    icon: Cpu,
    title: 'Texniki Universitetlər',
    description:
      'Mühəndislik, informasiya texnologiyaları, neft-qaz sahəsində ixtisaslaşan texniki universitetlər. ASOIU, BEU və digərləri.',
  },
  {
    icon: HeartPulse,
    title: 'Tibb Universitetləri',
    description:
      'Azərbaycan Tibb Universiteti və digər tibb məktəbləri. Həkim, stomatoloq, farmasevt və digər səhiyyə ixtisaslarının hazırlanması.',
  },
  {
    icon: Globe,
    title: 'Beynəlxalq Universitetlər',
    description:
      'ADA University və digər beynəlxalq standartlara cavab verən universitetlər. Bologna prosesi, ikiqat diplom və ERASMUS proqramları.',
  },
  {
    icon: GraduationCap,
    title: 'Peşə Təhsili Mərkəzləri',
    description:
      'Kolleclər və peşə təhsili müəssisələri. Praktiki bacarıqlar, qısa müddətli proqramlar və işə yönümlü təhsil imkanları.',
  },
];

export function UniversityTypes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="bg-light-grey py-24 lg:py-32">
      <div className="max-w-container mx-auto px-6">
        <div ref={headerRef} className="text-center max-w-[700px] mx-auto mb-16">
          <SectionLabel text="UNIVERSITET NÖVLƏRİ" className="mb-4" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-indigo mb-5">
            Azərbaycanda Universitet Tipləri
          </h2>
          <p className="text-base text-cool-grey">
            Ölkədə fəaliyyət göstərən müxtəlif tipli ali təhsil müəssisələri haqqında geniş məlumat.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {types.map((t) => (
            <FeatureCard key={t.title} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
