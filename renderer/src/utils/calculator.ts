import { TradeItem } from '@/types/trade';

export const calculateAveragePrice = (items: TradeItem[]) => {
  const totalPrice =
    items.reduce((acc, current) => {
      return acc + current.itemPrice;
    }, 0) / items.length;

  const rounded = Math.round(totalPrice);
  return rounded >= 10000 ? Math.floor(rounded / 1000) * 1000 : rounded;
};
