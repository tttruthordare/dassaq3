import { Check } from 'lucide-react';
import { CTAButton } from './CTAButton';

interface FeeCardProps {
  badge: string;
  badgeColor: 'teal' | 'gold' | 'indigo';
  title: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
}

const badgeStyles = {
  teal: 'bg-muted-teal',
  gold: 'bg-accent-gold',
  indigo: 'bg-deep-indigo',
};

const borderStyles = {
  teal: 'border-t-4 border-t-muted-teal',
  gold: 'border-t-4 border-t-accent-gold',
  indigo: 'border-t-4 border-t-deep-indigo',
};

export function FeeCard({
  badge,
  badgeColor,
  title,
  subtitle,
  price,
  description,
  features,
}: FeeCardProps) {
  return (
    <div
      className={`bg-white rounded-card shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${borderStyles[badgeColor]}`}
    >
      <div className={`${badgeStyles[badgeColor]} px-6 py-3 text-center`}>
        <span className="text-xs font-medium uppercase tracking-[1.5px] text-white">
          {badge}
        </span>
      </div>
      <div className="p-8 pt-6">
        <h3 className="font-playfair text-2xl font-bold text-deep-indigo mb-1">
          {title}
        </h3>
        <p className="text-sm text-cool-grey italic mb-4">{subtitle}</p>
        <p className="font-playfair text-4xl font-bold text-accent-gold mb-4">
          {price}
        </p>
        <div className="border-t border-warm-sand my-6" />
        <p className="text-sm text-cool-grey leading-relaxed mb-6">
          {description}
        </p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-cool-grey">
              <Check className="w-4 h-4 text-muted-teal flex-shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>
        <CTAButton text="Daha Ətraflı" variant="outline" className="w-full text-center" />
      </div>
    </div>
  );
}
