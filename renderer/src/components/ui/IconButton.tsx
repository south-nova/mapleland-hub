import { cn } from '@/lib/cn';
import * as icons from '@/components/icons';
import { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: keyof typeof icons;
  className?: string;
}

export const IconButton = ({ className, icon, ...props }: IconButtonProps) => {
  const Icon = icons[icon];

  return (
    <button
      className={cn(
        'size-7 rounded-sm flex items-center justify-center transition-colors duration-200 hover:bg-surface cursor-pointer',
        className,
      )}
      {...props}
    >
      <Icon />
    </button>
  );
};
