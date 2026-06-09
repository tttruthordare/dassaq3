interface CTAButtonProps {
  text: string;
  href?: string;
  variant?: 'filled' | 'outline';
  onClick?: () => void;
  className?: string;
  isDark?: boolean;
}

export function CTAButton({
  text,
  href,
  variant = 'filled',
  onClick,
  className = '',
  isDark = false,
}: CTAButtonProps) {
  const baseClasses =
    'inline-block px-8 py-3.5 rounded-pill font-inter text-sm font-medium transition-all duration-300 ease-out cursor-pointer';

  const variantClasses =
    variant === 'filled'
      ? isDark
        ? 'bg-accent-gold text-deep-indigo hover:bg-[#D4B87A] hover:scale-[1.04]'
        : 'bg-muted-teal text-white hover:bg-deep-teal hover:scale-[1.03] hover:shadow-card-hover'
      : 'border border-muted-teal text-muted-teal hover:bg-muted-teal hover:text-white';

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {text}
    </Tag>
  );
}
