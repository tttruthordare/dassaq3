import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { FeeCard } from '@/components/FeeCard';

gsap.registerPlugin(ScrollTrigger);

const feePlans = [
  {
    badge: 'PULSUZ',
    badgeColor: 'teal' as const,
    title: 'Dövlət Sifarişi',
    subtitle: '(Büdcə yerləri)',
    price: '0 AZN',
    description:
      'İllik təhsil haqqı ödənilmir. TQDK imtahanında kifayət qədər bal toplayan tələbələrə dövlət tərəfindən təhsil haqqı ödənilir. Yer sayı müəyyən edilmiş kvota ilə məhdudlaşır.',
    features: [
      'TQDK üzrə yüksək bal tələbi',
      'Sosial müavinət və təqaüd imkanı',
      'Yataqxana prioriteti',
    ],
  },
  {
    badge: 'ƏN POPULYAR',
    badgeColor: 'gold' as const,
    title: 'Ödənişli — Dövlət',
    subtitle: '(Dövlət universitetləri)',
    price: '1,500 — 4,000 AZN/il',
    description:
      'Dövlət universitetlərinin ödənişli şöbələrində təhsil haqqı ixtisasdan asılı olaraq dəyişir. Humanitar ixtisaslar daha ucuz, tibb və texniki ixtisaslar daha bahadır.',
    features: [
      'Dövlət diplomu',
      'Geniş ixtisas seçimi',
      'Yataqxana imkanı',
      'Təqaüd keçid imkanı',
    ],
  },
  {
    badge: 'PREMIUM',
    badgeColor: 'indigo' as const,
    title: 'Özəl Universitetlər',
    subtitle: '(ADA, Xəzər, Qafqaz və s.)',
    price: '5,000 — 18,000 AZN/il',
    description:
      'Özəl universitetlər ingilis dilində təhsil və beynəlxalq akkreditasiya təklif edir. Qiymətlər universitetdən və proqramdan asılıdır. ADA və Xəzər universitetləri daha yüksək təhsil haqqına malikdir.',
    features: [
      'İngilis dilində təhsil',
      'Beynəlxalq akkreditasiya',
      'Müasir kampus və infrastruktur',
      'Beynəlxalq mübadilə proqramları',
    ],
  },
];

export function TuitionFees() {
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
    <section id="fees" ref={sectionRef} className="bg-light-grey py-24 lg:py-32">
      <div className="max-w-[1000px] mx-auto px-6">
        <div ref={headerRef} className="text-center max-w-[700px] mx-auto mb-16">
          <SectionLabel text="TƏHSİL HAQQI" className="mb-4" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-indigo mb-5">
            Təhsil Haqqı və Xərclər
          </h2>
          <p className="text-base text-cool-grey">
            Azərbaycan universitetlərində təhsil haqlarının orta göstəriciləri — dövlət sifarişi və ödənişli əsaslarla.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {feePlans.map((plan) => (
            <FeeCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
