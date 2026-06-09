import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatBlockProps {
  number: string;
  label: string;
}

export function StatBlock({ number, label }: StatBlockProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.textContent = number;
      return;
    }

    // Extract numeric part and suffix
    const numericMatch = number.match(/[\d,]+/);
    const suffix = number.replace(/[\d,]+/, '');
    const targetValue = numericMatch ? parseInt(numericMatch[0].replace(/,/g, ''), 10) : 0;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: 1.5,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate: () => {
            if (targetValue >= 1000) {
              el.textContent = (obj.val / 1000).toFixed(0) + 'K' + suffix.replace(/K/, '');
            } else {
              el.textContent = obj.val + suffix;
            }
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [number]);

  return (
    <div className="text-center">
      <span
        ref={numberRef}
        className="block font-playfair text-5xl font-bold text-accent-gold mb-3"
      >
        0
      </span>
      <div className="w-10 h-0.5 bg-accent-gold mx-auto mb-3" />
      <span className="text-xs font-medium uppercase tracking-[1.5px] text-white">
        {label}
      </span>
    </div>
  );
}
