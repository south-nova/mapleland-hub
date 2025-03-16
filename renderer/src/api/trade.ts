import { mapResponseToTradeItem } from '@/utils/mappers';

export const fetchStoreItems = async (itemCode: string) => {
  const response = await fetch(
    `https://api.mapleland.gg/trade?itemCode=${itemCode}&lowPrice=0&highPrice=999999999`,
  );
  const data = await response.json();
  return mapResponseToTradeItem(data);
};
