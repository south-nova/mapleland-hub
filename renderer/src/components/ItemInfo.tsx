import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import { itemOptionKor } from '@/constants/itemOption';
import { ItemOption } from '@/types/item';

interface ItemInfoProps {
  option: ItemOption;
  itemName: string;
  itemIconUrl: string;
  description?: string;
}

export const ItemInfo = ({ option, itemName, itemIconUrl, description }: ItemInfoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const requestOptions = useMemo(() => {
    const hasRequestOptions = Object.entries(option).some(
      ([key, value]) => value && key.startsWith('req'),
    );

    if (!hasRequestOptions) return null;

    return Object.entries(option)
      .filter(([key]) => key.startsWith('req'))
      .map(([key, value]) => [itemOptionKor[key as keyof typeof itemOptionKor] || key, value]);
  }, [option]);

  const increaseOptions = useMemo(() => {
    return Object.entries(option)
      .filter(([key, value]) => value && key.startsWith('inc'))
      .map(([key, value]) => [itemOptionKor[key as keyof typeof itemOptionKor] || key, value]);
  }, [option]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tooltipRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      const x = e.clientX - containerRect.left + 18;
      const y = e.clientY - containerRect.top;

      setPosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className="size-7 flex items-center justify-center bg-surface-accent rounded-sm cursor-pointer relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <Image src={itemIconUrl} alt={itemName} width={16} height={16} />

      {isHovering && (
        <div
          ref={tooltipRef}
          className="absolute z-50 bg-surface-accent/70 backdrop-blur-sm border border-border rounded-sm p-3 shadow-lg min-w-[200px]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <p className="text-title-18 text-center">
            {itemName}
            {option.upgrade > 0 && <span className="ml-1">(+{option.upgrade})</span>}
          </p>

          <div className="flex gap-3 items-center mt-2">
            {/* 아이템 이미지 */}
            <div className="flex items-center justify-center bg-background/40 border border-border/80 rounded-sm p-2 w-fit">
              <div className="relative size-16">
                <Image src={itemIconUrl} alt={itemName} fill className="object-contain" />
              </div>
            </div>

            {/* 필요 옵션 */}
            {requestOptions && (
              <div className="flex flex-col">
                {requestOptions.map(([key, value]) => (
                  <p key={key} className="text-body-12 flex-1 flex gap-2">
                    <p className="text-foreground-muted w-10">{key}:</p>
                    <p className="text-foreground font-bold">{value ?? 0}</p>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* 구분선 */}
          <div className="w-full h-px bg-border-accent mt-2" />

          {/* 아이템 옵션 */}
          <div className="flex flex-col items-center justify-center mt-3">
            {/* 아이템 설명 */}
            {description && <p className="text-body-14 text-foreground mb-2">{description}</p>}

            {/* 옵션 */}
            {increaseOptions.map(([key, value]) => (
              <p key={key} className="flex-1 flex gap-1">
                <p className="text-foreground-muted">{key}:</p>
                <p className="text-foreground font-bold">+{value}</p>
              </p>
            ))}

            {/* 업그레이드 가능 횟수 */}
            {!description && (
              <p className="flex-1 flex gap-1 mt-2">
                <p className="text-foreground-muted">업그레이드 가능 횟수:</p>
                <p className="text-foreground font-bold">{option.tuc ?? 0}</p>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
