import { useEffect, useRef, useState } from 'react';

import { CaretDown } from '@/components/icons';
import { cn } from '@/lib/cn';
import { LabelValue } from '@/types/common';

interface SelectorProps<T extends string> {
  options: LabelValue<T>[];
  className?: string;
  onChange?: (value: T) => void;
}

export const Selector = <T extends string>({ options, onChange }: SelectorProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleTriggerClick = () => setOpen((prev) => !prev);

  const handleOptionClick = (option: LabelValue<T>) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option.value);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="flex items-center gap-1.5  justify-between px-2 py-1 text-body-14 text-foreground-muted hover:text-foreground hover:bg-surface rounded-md transition-colors duration-200"
        onClick={handleTriggerClick}
      >
        {selected.label}
        <CaretDown />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] min-w-24 right-0 bg-background/80 backdrop-blur-sm rounded-md border border-border p-1.5">
          {options.map((option) => (
            <button
              key={option.value}
              className={cn(
                'w-full px-2 py-1 text-left hover:bg-surface-accent rounded-md transition-colors duration-100 whitespace-nowrap',
                selected.value === option.value && 'font-semibold',
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
