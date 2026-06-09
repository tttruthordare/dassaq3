import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Train, Palette, Briefcase } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Home,
    title: 'Yataqxanalar',
    description: 'Əksər universitetlər yataqxana imkanı təklif edir. Qiymətlər 150-400 AZN/ay arasında dəyişir.',
  },
  {
    icon: Train,
    title: 'Nəqliyyat',
    description: 'Bakı Metrosu və avtobus şəbəkəsi ilə kampuslara asanlıqla çatmaq olar. Tələbə kartı ilə endirimli səyahət.',
  },
  {
    icon: Palette,
    title: 'Mədəniyyət və Əyləncə',
    description: 'Muzeylər, teatrlar, konsert zalları və İçəri Şəhər — Bakı tələbələrə zəngin mədəni həyat təklif edir.',
  },
  {
    icon: Briefcase,
    title: 'Təcrübə və Karyera',
    description: 'Universitetlər SOCAR, Kapital Bank, Pasha Holding və digər şirkətlərlə təcrübə proqramları təşkil edir.',
  },
];

export function StudentLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Image reveal + parallax
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: imageRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(imageRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });

        gsap.to(imageRef.current.querySelector('img'), {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

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

      // Feature list stagger
      const items = listRef.current?.children;
      if (items) {
        gsap.set(items, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: listRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.7,
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
    <section ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left - Image */}
          <div className="lg:flex-1">
            <div
              ref={imageRef}
              className="relative rounded-image overflow-hidden h-[400px] lg:h-[520px]"
            >
              <img
                src="/images/student-life.jpg"
                alt="Students studying outdoors on campus"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 lg:p-10 max-w-[360px]">
                <p className="font-playfair text-xl italic text-white leading-relaxed">
                  "Tələbəlik illəri həyatın ən gözəl dövrüdür"
                </p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:flex-1">
            <div ref={headerRef} className="mb-8">
              <SectionLabel text="TƏLƏBƏ HƏYATI" className="mb-4" />
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-indigo mb-5 leading-tight">
                Bakıda Tələbə
                <br />
                Həyatı
              </h2>
              <p className="text-base text-cool-grey leading-relaxed">
                Bakı — Xəzər dənizi sahilində yerləşən, zəngin mədəniyyətə və dinamik tələbə həyatına malik bir şəhər. Azərbaycanın paytaxtında təhsil almaq unudulmaz bir təcrübədir.
              </p>
            </div>

            <div ref={listRef} className="space-y-0">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-5 py-5 ${
                    index < features.length - 1 ? 'border-b border-warm-sand' : ''
                  }`}
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-muted-teal/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-muted-teal" />
                  </div>
                  <div>
                    <h4 className="font-inter text-base font-semibold text-deep-indigo mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-cool-grey leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
