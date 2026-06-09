import { Star, Users, ArrowRight } from 'lucide-react';

interface UniversityCardProps {
  image: string;
  name: string;
  city: string;
  description: string;
  rating: string;
  students: string;
}

export function UniversityCard({
  image,
  name,
  city,
  description,
  rating,
  students,
}: UniversityCardProps) {
  return (
    <div className="group bg-white rounded-card shadow-card overflow-hidden transition-all duration-400 hover:shadow-card-hover hover:-translate-y-1">
      <div className="overflow-hidden h-[200px]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
      </div>
      <div className="p-7">
        <h3 className="font-playfair text-xl font-bold text-deep-indigo mb-2">
          {name}
        </h3>
        <span className="inline-block px-3 py-1 bg-light-grey text-cool-grey text-xs rounded-pill mb-3">
          {city}
        </span>
        <p className="text-sm text-cool-grey leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4 mb-4 text-sm text-cool-grey">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
            {rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {students}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-muted-teal text-sm font-medium group/link cursor-pointer">
          Ətraflı
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </span>
      </div>
    </div>
  );
}
