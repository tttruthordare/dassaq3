import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  question,
  answer,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  const [open, setOpen] = useState(isOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    onToggle?.();
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (open) {
      gsap.set(el, { height: 'auto' });
      const fullHeight = el.offsetHeight;
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: fullHeight, opacity: 1, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [open]);

  return (
    <div className="border-b border-warm-sand">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-muted-teal rounded-sm"
        aria-expanded={open}
      >
        <span className="font-inter text-base font-medium text-deep-indigo group-hover:text-muted-teal transition-colors duration-300 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-cool-grey flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="pb-6 text-cool-grey leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
