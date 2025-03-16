import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';

import { cn } from '@/lib/cn';
import { Item, searchItems } from '@/lib/itemSearch';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (itemCode: string, itemName: string, description: string) => void;
}

export const SearchInput = ({ className, onSearch, ...props }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (query.trim()) {
      const items = await searchItems(query);
      setSearchResults(items);
      setSelectedIndex(0);
    } else {
      setSearchResults([]);
      setSelectedIndex(0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (searchResults.length === 0 || e.nativeEvent.isComposing) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      const selectedItem = searchResults[selectedIndex];
      if (selectedItem) {
        onSearch?.(selectedItem.code, selectedItem.name, selectedItem.description);
      }
    }
  };

  useEffect(() => {
    if (popupRef.current && searchResults.length > 0) {
      const container = popupRef.current;

      const selectedItem = container.querySelector(
        `li:nth-child(${selectedIndex + 1})`,
      ) as HTMLElement;

      if (selectedItem) {
        const itemTop = selectedItem.offsetTop;
        const itemBottom = itemTop + selectedItem.offsetHeight;

        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;

        if (itemTop < containerTop) {
          container.scrollTop = itemTop;
        } else if (itemBottom > containerBottom) {
          container.scrollTop = itemBottom - container.clientHeight;
        }
      }
    }
  }, [selectedIndex, searchResults]);

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <div className="relative">
      <label
        className={cn(
          'w-full h-11 pl-3 pr-2 bg-surface-accent flex items-center rounded-md border border-border outline-none transition-colors duration-200 focus-within:border-border-accent',
          className,
        )}
      >
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent outline-none flex-1"
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </label>

      <div
        className={cn(
          'absolute top-[calc(100%+4px)] w-full p-2 bg-surface/80 z-10 backdrop-blur-sm rounded-md border border-border',
          searchResults.length === 0 && 'hidden',
        )}
      >
        <div className="max-h-[30rem] overflow-y-auto" ref={popupRef}>
          <ul className="flex flex-col">
            {searchResults.map((item, index) => {
              const itemIconUrl = `https://maplestory.io/api/gms/62/item/${item.code}/icon`;
              return (
                <li
                  key={item.code}
                  className={cn(
                    'rounded-md hover:bg-surface-accent/70 px-2 py-2.5 cursor-pointer',
                    selectedIndex === index && 'bg-surface-accent/70 border border-border-accent',
                  )}
                  onClick={() => {
                    onSearch?.(item.code, item.name, item.description);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative size-6">
                      <Image src={itemIconUrl} alt="item" fill className="object-contain" />
                    </div>
                    <span className="text-body-14">{item.name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
