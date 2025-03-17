import { cn } from '@/lib/cn';
import * as icons from '@/components/icons';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: keyof typeof icons;
  className?: string;
  iconClassName?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, iconClassName, ...props }, ref) => {
    const Icon = icons[icon];

    return (
      <button
        ref={ref}
        className={cn(
          'size-7 rounded-sm flex items-center justify-center transition-colors duration-200 hover:bg-surface cursor-pointer',
          className,
        )}
        {...props}
      >
        <Icon className={cn('size-4', iconClassName)} />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
