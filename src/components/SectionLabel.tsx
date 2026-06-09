interface SectionLabelProps {
  text: string;
  isDark?: boolean;
  className?: string;
}

export function SectionLabel({ text, isDark = false, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-block px-5 py-2 rounded-pill text-xs font-medium uppercase tracking-[1.5px] ${className} ${
        isDark
          ? 'bg-white/10 text-white'
          : 'bg-muted-teal/10 text-muted-teal'
      }`}
    >
      {text}
    </span>
  );
}
