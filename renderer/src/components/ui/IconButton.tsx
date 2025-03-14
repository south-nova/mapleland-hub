import { cn } from '@/lib/cn';
import * as icons from '@/components/icons';

interface IconButtonProps {
  icon: keyof typeof icons;
  className?: string;
  onClick?: () => void;
}

export const IconButton = ({ className, onClick, icon }: IconButtonProps) => {
  const Icon = icons[icon];

  return (
    <button
      className={cn(
        'size-7 rounded-sm flex items-center justify-center transition-colors duration-200 hover:bg-surface',
        className,
      )}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};
