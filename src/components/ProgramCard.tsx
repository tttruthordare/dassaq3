interface ProgramCardProps {
  image: string;
  name: string;
  universities: string;
  duration: string;
  degree: string;
}

export function ProgramCard({
  image,
  name,
  universities,
  duration,
  degree,
}: ProgramCardProps) {
  return (
    <div className="group flex-shrink-0 w-[340px] bg-white rounded-card shadow-card overflow-hidden transition-all duration-400 hover:shadow-card-hover snap-start">
      <div className="overflow-hidden h-[180px]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h4 className="font-inter text-lg font-semibold text-deep-indigo mb-2">
          {name}
        </h4>
        <p className="text-sm text-cool-grey mb-4">{universities}</p>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-warm-sand text-cool-grey text-xs rounded-pill">
            {duration}
          </span>
          <span className="px-3 py-1 bg-muted-teal text-white text-xs rounded-pill">
            {degree}
          </span>
        </div>
      </div>
    </div>
  );
}
