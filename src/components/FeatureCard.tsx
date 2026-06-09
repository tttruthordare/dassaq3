import { type LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-light-grey rounded-card p-10 text-center transition-all duration-300 hover:bg-[#EFECE7]">
      <div className="w-16 h-16 mx-auto rounded-full bg-muted-teal/10 flex items-center justify-center mb-5 transition-transform duration-300 hover:scale-105">
        <Icon className="w-7 h-7 text-muted-teal" />
      </div>
      <h4 className="font-inter text-lg font-semibold text-deep-indigo mb-3">
        {title}
      </h4>
      <p className="text-sm text-cool-grey leading-relaxed">
        {description}
      </p>
    </div>
  );
}
