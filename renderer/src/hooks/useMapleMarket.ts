import { fetchStoreItems } from '@/api/trade';
import { ListOrderBy, TradeType } from '@/types/trade';
import { calculateAveragePrice } from '@/utils/calculator';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface MapleStoreOptions {
  itemCode: string;
  tradeType: TradeType;
  orderBy: ListOrderBy;
}

export const useMapleMarket = ({ itemCode, tradeType, orderBy }: MapleStoreOptions) => {
  const { data } = useSuspenseQuery({
    queryKey: ['items', itemCode],
    queryFn: () => fetchStoreItems(itemCode),
  });

  const trades = useMemo(() => {
    const filtered = data.filter((item) => item.tradeType === tradeType);
    const sortedItems = filtered.sort((a, b) => {
      switch (orderBy) {
        case 'latest':
          return b.createdAt.localeCompare(a.createdAt);
        case 'lowest':
          return a.itemPrice - b.itemPrice;
        case 'highest':
          return b.itemPrice - a.itemPrice;
        case 'upgrade':
          return b.itemOption.upgrade - a.itemOption.upgrade;
      }
    });

    return sortedItems;
  }, [data, tradeType, orderBy]);

  const marketPrice = useMemo(() => {
    const total = calculateAveragePrice(data);
    const buy = calculateAveragePrice(data.filter((item) => item.tradeType === 'buy'));
    const sell = calculateAveragePrice(data.filter((item) => item.tradeType === 'sell'));

    return { total, buy, sell };
  }, [data]);

  return { trades, marketPrice };
};
