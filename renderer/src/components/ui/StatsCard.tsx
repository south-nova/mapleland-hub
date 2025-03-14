import { cn } from '@/lib/cn';
import { Fragment } from 'react';

export interface Stats {
  title: string;
  value: string;
  description: string;
}

interface StatsCardProps {
  className?: string;
  stats: Stats[];
}

export const StatsCard = ({ className, stats }: StatsCardProps) => {
  return (
    <div className={cn('bg-surface rounded-md p-4 flex items-center gap-3', className)}>
      {stats.map((stat, index) => (
        <Fragment key={stat.title}>
          <div key={stat.title} className="flex-1 flex flex-col gap-1 items-center">
            <p className="text-body-14 text-foreground-muted">{stat.title}</p>
            <p className="text-title-16 text-foreground-default">{stat.value}</p>
          </div>

          {index !== stats.length - 1 && <div className="w-px h-6 bg-border" />}
        </Fragment>
      ))}
    </div>
  );
};
