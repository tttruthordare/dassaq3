import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { AccordionItem } from '@/components/AccordionItem';
import { CTAButton } from '@/components/CTAButton';

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    question: 'Azərbaycanda təhsil almaq üçün hansı dili bilmək lazımdır?',
    answer:
      'Azərbaycan universitetlərində tədris əsasən Azərbaycan dilində aparılır. Bununla belə, bir çox universitet — xüsusilə ADA Universiteti, Xəzər Universiteti və Qafqaz Universiteti — ingilis dilində təhsil proqramları təklif edir. Bəzi universitetlər rus dilində də qrup saxlayır. Dil biliyi tələbləri proqrama görə dəyişir: azərbaycan dilində proqramlar üçün B2 səviyyəsi, ingilis dilində proqramlar üçün IELTS 5.5+ və ya ekvivalent tələb olunur.',
  },
  {
    question: 'Xarici tələbələr üçün yataqxana imkanı varmı?',
    answer:
      'Bəli, əksər Azərbaycan universitetləri xarici tələbələr üçün yataqxana yerləri ayırır. Yataqxana haqqı ayda 150-400 AZN arasında dəyişir. Alternativ olaraq, Bakıda kirayə mənzil tapmaq da mümkündür — 1 otaqlı mənzilin kirayə haqqı orta hesabla 300-600 AZN arasındadır. Universitetlərin beynəlxalq əlaqələr şöbələri yataqxana ilə bağlı kömək təklif edir.',
  },
  {
    question: 'Təhsil müddətində işləmək mümkündürmü?',
    answer:
      'Bəli, tələbələr təhsil müddətində işləyə bilərlər. Azərbaycan qanunvericiliyi tələbələrə yarımştat iş imkanı yaradır. Bir çox universitet kampusda iş imkanları — kitabxana, laboratoriya köməkçisi, tərcüməçi və s. — təklif edir. Həmçinin, bakalavrın 3-4-cü kurslarında təcrübə proqramları vasitəsilə şirkətlərdə işləmək mümkündür.',
  },
  {
    question: 'Azərbaycan diplomu dünyada tanınırmı?',
    answer:
      'Bəli, Azərbaycan diplomları bir çox ölkədə tanınır. Azərbaycan Bologna prosesinə qoşulub və Avropa Kredit Transfer Sistemi (ECTS) tətbiq edir. ADA Universiteti və Xəzər Universiteti ABŞ və Avropa akkreditasiyasına malikdir. Xaricdə təhsil və ya iş üçün apostil (Apostille) sənəd təsdiqi tələb oluna bilər.',
  },
  {
    question: 'Təqaüd almaq üçün nə etmək lazımdır?',
    answer:
      'Dövlət sifarişi üzrə (büdcə) təhsil alan tələbələr və ödənişli şöbələrdə oxuyan amma yüksək akademik göstəricilərə malik tələbələr təqaüd ala bilər. Təqaüd məbləği akademik performansa görə 100-300 AZN/ay arasında dəyişir. Xarici tələbələr üçün də bəzi universitetlər xüsusi təqaüd proqramları təklif edir.',
  },
  {
    question: 'Qəbul prosesi nə vaxt başlayır?',
    answer:
      'TQDK imtahanları adətən may-iyun aylarında keçirilir. Sənəd qəbulu mart-aprel aylarında başlayır. Magistratura imtahanları iyul-avqust aylarında keçirilir. Xarici tələbələr üçün ərizə müddəti adətən iyul-sentyabr arasıdır. Hər universitetin öz təqvimi olduğu üçün dəqiq tarixlər üçün universitetin rəsmi saytını yoxlamaq tövsiyə olunur.',
  },
  {
    question: 'Azərbaycanda hansı ixtisaslar daha populyardır?',
    answer:
      'Ən populyar ixtisaslar arasında: hüquqşünaslıq, biznes idarəetməsi, neft-qaz mühəndisliyi, kompyuter elmləri, tibb, beynəlxalq münasibətlər və iqtisadiyyat yer alır. Bu ixtisaslar həm tələbə müraciətlərinin sayına, həm də məzunların iş tapma şansına görə öndədir.',
  },
  {
    question: 'Xarici tələbələr üçün viza prosesi necədir?',
    answer:
      'Xarici tələbələr Azərbaycan Respublikasının konsulluq şöbələrindən tələbə vizası (D kateqoriyalı viza) almalıdır. Qəbul təsdiqi olan tələbələrə adətən 90 günlük viza verilir, sonra isə ölkəyə gəldikdən sonra Dövlət Miqrasiya Xidmətində müvəqqəti yaşamaq icazəsi alınır. Universitetlərin beynəlxalq şöbələri bu prosesdə kömək edir.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      const items = accordionRef.current?.children;
      if (items) {
        gsap.set(items, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: accordionRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(ctaRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="bg-light-grey py-24 lg:py-32">
      <div className="max-w-[800px] mx-auto px-6">
        <div ref={headerRef} className="text-center mb-12">
          <SectionLabel text="TEZ-TEZ VERİLƏN SUALLAR" className="mb-4" />
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-indigo leading-tight">
            Suallarınız Cavabsız
            <br />
            Qalmayaacaq
          </h2>
        </div>

        <div ref={accordionRef}>
          {faqItems.map((item) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <div ref={ctaRef} className="text-center mt-12">
          <h4 className="font-inter text-lg font-semibold text-deep-indigo mb-2">
            Hələ də sualınız var?
          </h4>
          <p className="text-sm text-cool-grey mb-6">
            Universitetlərin rəsmi saytlarını yoxlayın və ya birbaşa əlaqə saxlayın
          </p>
          <CTAButton
            text="Universitetlərlə Əlaqə"
            href="#universities"
          />
        </div>
      </div>
    </section>
  );
}
