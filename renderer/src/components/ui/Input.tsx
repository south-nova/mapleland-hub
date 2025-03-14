import { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import { IconButton } from '@/components/ui/IconButton';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: () => void;
}

export const Input = ({ className, onSearch, ...props }: InputProps) => {
  return (
    <label
      className={cn(
        'w-full h-11 pl-3 pr-2 bg-surface-accent flex items-center rounded-md border border-border outline-none transition-colors duration-200 focus-within:border-border-accent',
        className,
      )}
    >
      <input type="text" className="bg-transparent outline-none flex-1" {...props} />
      <IconButton icon="ArrowRight" onClick={onSearch} />
    </label>
  );
};
