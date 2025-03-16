import { DiscordTag } from '@/components/DiscordTag';
import { ItemInfo } from '@/components/ItemInfo';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/ToolTip';
import { cn } from '@/lib/cn';
import { TradeItem } from '@/types/trade';
import { formatRelativeTime } from '@/utils/date';
import Image from 'next/image';

interface TradeListProps {
  items: TradeItem[];
  itemName: string;
  itemIconUrl: string;
  className?: string;
  description?: string;
}

export const TradeList = ({
  items,
  itemName,
  itemIconUrl,
  className,
  description,
}: TradeListProps) => {
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
                description={description}
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
  description?: string;
}

const TradeListItem = ({ item, itemName, itemIconUrl, description }: TradeListItemProps) => {
  return (
    <li key={item.createdAt} className="p-2 w-full rounded-md ">
      <div className="flex justify-between items-center border-b border-border/60 pb-0.5">
        {/* 디스코드 정보 */}
        <DiscordTag user={item.discordUser} />

        {/* 등록 시간 */}
        <span className="text-body-12 text-foreground-muted">
          {formatRelativeTime(item.createdAt)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-2">
        {/* 아이템 정보 */}
        <div className="flex items-center gap-2">
          <ItemInfo
            option={item.itemOption}
            itemName={itemName}
            itemIconUrl={itemIconUrl}
            description={description}
          />

          <p className="text-title-16">
            {itemName}
            {item.itemOption.upgrade > 0 && (
              <span className="ml-1">(+{item.itemOption.upgrade})</span>
            )}
          </p>
        </div>

        {/* 가격 */}
        <div className="flex gap-1 items-end shrink-0">
          <Image src="/images/meso.png" alt="메소 이미지" width={12} height={12} />
          <span className="text-title-16">{item.itemPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="justify-between mt-2 h-8 bg-background/60 border border-border/60 rounded-sm pl-2 pr-1 flex items-center">
        {/* 코멘트 */}
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="flex-1 text-body-14 truncate ">{item.comment}</p>
          </TooltipTrigger>
          <TooltipContent align="start" className="max-w-[24rem] overflow-hidden">
            {item.comment}
          </TooltipContent>
        </Tooltip>

        {/* 태그 */}
        {item.itemOption.optionSummarize && item.itemOption.optionSummarize.length > 0 && (
          <div className="flex gap-1 ml-4">
            {item.itemOption.optionSummarize.map((option) => (
              <span
                key={option}
                className="text-body-12 bg-surface-accent text-foreground-muted rounded-sm px-1.5 py-0.5"
              >
                {option}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};
