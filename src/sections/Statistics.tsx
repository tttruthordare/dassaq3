import { StatBlock } from '@/components/StatBlock';

const stats = [
  { number: '50+', label: 'Ali Təhsil Müəssisəsi' },
  { number: '200K+', label: 'Tələbə' },
  { number: '1,500+', label: 'Təhsil Proqramı' },
  { number: '8K+', label: 'Xarici Tələbə' },
];

export function Statistics() {
  return (
    <section className="bg-deep-indigo py-20 lg:py-24">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {stats.map((stat) => (
            <StatBlock key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
