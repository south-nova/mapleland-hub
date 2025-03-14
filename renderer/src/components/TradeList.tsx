import { Discord } from '@/components/icons';
import { cn } from '@/lib/cn';
import { TradeItem } from '@/types/trade';
import { formatRelativeTime } from '@/utils/date';
import Image from 'next/image';

interface TradeListProps {
  items: TradeItem[];
  itemName: string;
  itemIconUrl: string;
  className?: string;
}

export const TradeList = ({ items, itemName, itemIconUrl, className }: TradeListProps) => {
  return (
    <div className={cn('flex-1 overflow-hidden bg-surface rounded-md', className)}>
      <div className="h-full w-full p-2 overflow-y-auto">
        <ul className="flex flex-col gap-3 flex-1">
          {items.map((item) => {
            return (
              <TradeListItem
                key={item.id}
                item={item}
                itemName={itemName}
                itemIconUrl={itemIconUrl}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

interface TradeListItemProps {
  item: TradeItem;
  itemName: string;
  itemIconUrl: string;
}

const TradeListItem = ({ item, itemName, itemIconUrl }: TradeListItemProps) => {
  return (
    <li key={item.createdAt} className="p-2 w-full rounded-md ">
      <div className="flex justify-between items-center border-b border-border/60 pb-0.5">
        {/* 디스코드 정보 */}
        <div className="flex gap-2 items-center px-1 py-0.5 hover:bg-surface-accent transition-colors duration-150 select-none rounded-sm">
          <Discord />
          <span className="text-body-14">{item.discordUser.nickName}</span>
        </div>

        {/* 등록 시간 */}
        <span className="text-body-12 text-foreground-muted">
          {formatRelativeTime(item.createdAt)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-2">
        {/* 아이템 정보 */}
        <div className="flex items-center gap-2">
          <div className="size-7 flex items-center justify-center bg-surface-accent rounded-sm">
            <Image src={itemIconUrl} alt={itemName} width={16} height={16} />
          </div>
          <p className="text-title-16">{itemName}</p>
        </div>

        {/* 가격 */}
        <div className="flex gap-1 items-end shrink-0">
          <Image src="/images/meso.png" alt="메소 이미지" width={12} height={12} />
          <span className="text-title-16">{item.itemPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between mt-1 gap-4 items-center">
        {/* 코멘트 */}
        <p className="flex-1 text-body-14 truncate">{item.comment}</p>

        {/* 태그 */}
        <div className="flex gap-1">
          {item.itemOption.optionSummarize.map((option) => (
            <span
              key={option}
              className="border border-border text-body-12 text-foreground-muted rounded-sm px-1.5 py-0.5"
            >
              {option}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
};
