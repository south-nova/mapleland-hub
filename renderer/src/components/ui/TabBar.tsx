import { cn } from '@/lib/cn';
import { LabelValue } from '@/types/common';

interface TabBarProps<T extends string> {
  tabs: LabelValue<T>[];
  name?: string;
  className?: string;
  onChange?: (value: T) => void;
}

export const TabBar = <T extends string>({ tabs, className, name, onChange }: TabBarProps<T>) => {
  return (
    <fieldset className={cn('flex overflow-hidden rounded-md', className)}>
      {tabs.map((tab, index) => (
        <label
          key={tab.value}
          className={cn(
            'text-body-14 select-none transition-colors duration-200 px-3 py-1 bg-surface text-foreground-muted has-checked:text-foreground has-checked:bg-surface-accent',
          )}
        >
          <input
            type="radio"
            name={name}
            defaultChecked={index === 0}
            className="hidden"
            value={tab.value}
            onChange={() => onChange?.(tab.value)}
          />
          {tab.label}
        </label>
      ))}
    </fieldset>
  );
};
