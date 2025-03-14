import { TabBar } from '@/components/ui/TabBar';
import { cn } from '@/lib/cn';
import { Selector } from '@/components/ui/Selector';
import { LabelValue } from '@/types/common';
import { ListOrderBy, TradeType } from '@/types/trade';

interface FilterBarProps {
  className?: string;
  onTradeTypeChange?: (type: TradeType) => void;
  onSortChange?: (type: ListOrderBy) => void;
}

export const FilterBar = ({ className, onTradeTypeChange, onSortChange }: FilterBarProps) => {
  const tabItems: LabelValue<TradeType>[] = [
    { label: '팝니다', value: 'sell' },
    { label: '삽니다', value: 'buy' },
  ];

  const sortOptions: LabelValue<ListOrderBy>[] = [
    { label: '최신순', value: 'latest' },
    { label: '낮은가격순', value: 'lowest' },
    { label: '높은가격순', value: 'highest' },
    { label: '강화순', value: 'upgrade' },
  ];

  return (
    <div className={cn('flex gap-2 items-center justify-between w-full', className)}>
      <TabBar tabs={tabItems} name="tradeType" onChange={(value) => onTradeTypeChange?.(value)} />
      <Selector options={sortOptions} onChange={(value) => onSortChange?.(value as ListOrderBy)} />
    </div>
  );
};
