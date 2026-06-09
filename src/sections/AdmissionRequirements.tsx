import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { AccordionItem } from '@/components/AccordionItem';

gsap.registerPlugin(ScrollTrigger);

const requirements = [
  {
    question: 'Ümumi qabiliyyət imtahanı (TQDK)',
    answer:
      'Azərbaycan universitetlərinin əksəriyyətinə daxil olmaq üçün TQDK (Test üsulu ilə qabiliyyətin qiymətləndirilməsi) imtahanından keçmək lazımdır. İmtahan 3 qrup üzrə keçirilir: I qrup (texniki), II qrup (humanitar), III qrup (ünvanlı). Hər qrup özünə uyğun fənləri əhatə edir. 2024/2025 tədris ili üçün keçid balı ümumiyyətlə 200-350 arasında dəyişir.',
  },
  {
    question: 'Sənədlər toplusu',
    answer:
      'Qəbul üçün tələb olunan sənədlər: 11 illik orta təhsil haqqında attestat, şəxsiyyət vəsiqəsinin surəti, 3×4 ölçüdə 6 ədəd fotoşəkil, tibb arayışı (086 forması), hərbi biletin surəti (oğlanlar üçün), əlavə ballar üçün sertifikatlar (varsa). Xarici tələbələr üçün pasport, təhsil sənədlərinin notarial təsdiqli tərcüməsi və diplomların nostrifikasiyası tələb olunur.',
  },
  {
    question: 'Xarici tələbələr üçün xüsusi tələblər',
    answer:
      'Xarici vətəndaşlar Azərbaycan universitetlərinə bir neçə yolla daxil ola bilər: dövlət sifarişi üzrə (büdcə), ödənişli əsaslarla, və ya ikiqat diplom proqramları çərçivəsində. Dil biliyi tələbləri: azərbaycan dilində təhsil proqramları üçün B2 səviyyəsi, ingilis dilində proqramlar üçün IELTS 5.5+ və ya ekvivalent. Bəzi universitetlər öz hazırlıq kurslarını təklif edir.',
  },
  {
    question: 'Qəbul müsabiqəsi və ballar',
    answer:
      'Qəbul müsabiqəsi ümumi bal əsasında aparılır. 2025-ci il üçün dövlət sifarişi üzrə (büdcə) ən yüksək keçid balı tibb və hüquq ixtisaslarında (350+), ən aşağı isə bəzi humanitar və texniki ixtisaslarda (200-250) müşahidə olunur. Ödənişli əsaslarla keçid balları orta hesabla 50-100 bal aşağıdır.',
  },
  {
    question: 'Magistratura və doktorantura',
    answer:
      'Magistraturaya qəbul üçün bakalavr diplomu və magistratura imtahanından keçmək tələb olunur. Doktoranturaya isə magistr diplomu, elmi tədqiqat planı və müsahibə mərhələsi tələb olunur. Xarici tələbələr üçün magistratura proqramları ingilis və rus dillərində də mövcuddur.',
  },
];

export function AdmissionRequirements() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      // Accordion stagger
      const items = accordionRef.current?.children;
      if (items) {
        gsap.set(items, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: accordionRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });
      }

      // Image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="admission"
      ref={sectionRef}
      className="bg-white py-24 lg:py-32"
    >
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - 60% */}
          <div className="lg:flex-[0.6]">
            <div ref={headerRef} className="mb-10">
              <SectionLabel text="QƏBUL TƏLƏBLƏRİ" className="mb-4" />
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-indigo mb-5 leading-tight">
                Universitetə Qəbul
                <br />
                Tələbləri Nələrdir?
              </h2>
              <p className="text-base text-cool-grey max-w-[520px]">
                Azərbaycan universitetlərinə daxil olmaq üçün bilməniz lazım olan bütün tələblər və sənədlər — sadə və aydın şəkildə.
              </p>
            </div>

            <div ref={accordionRef}>
              {requirements.map((req) => (
                <AccordionItem
                  key={req.question}
                  question={req.question}
                  answer={req.answer}
                />
              ))}
            </div>
          </div>

          {/* Right Column - 40% Sticky Image */}
          <div className="lg:flex-[0.4] hidden lg:block">
            <div className="sticky top-[120px]">
              <div className="relative rounded-image overflow-hidden h-[500px]">
                <div ref={imageRef} className="absolute inset-0">
                  <img
                    src="/images/about-campus.jpg"
                    alt="University campus aerial view"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-xs font-medium uppercase tracking-[1.5px] text-white/80 mb-2 block">
                    CAMPUS LIFE
                  </span>
                  <h3 className="font-playfair text-2xl font-bold text-white">
                    Bakı — Təhsilin Mərkəzi
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
