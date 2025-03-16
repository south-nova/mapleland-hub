'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';

import { StatsCard, Stats } from '@/components/ui/StatsCard';
import { TradeList } from '@/components/TradeList';
import { FilterBar } from '@/components/FilterBar';
import { useMapleMarket } from '@/hooks/useMapleMarket';
import { ListOrderBy, TradeType } from '@/types/trade';
import { useRouter } from 'next/router';
import { Empty } from '@/components/Empty';
import { Title } from '@/components/Title';
import { useSearchItemStore } from '@/store/searchItem';
import { SearchItem } from '@/types/item';

export default function ShopPage() {
  const router = useRouter();

  const searchItem = useSearchItemStore((state) => state.searchItem);

  useEffect(() => {
    if (!searchItem) router.push('/home');
  }, [searchItem, router]);

  if (!searchItem) return null;
  return (
    <>
      <Title back />
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<ShopContentSkeleton />}>
          <ShopContent {...searchItem} />
        </Suspense>
      </div>
    </>
  );
}

const ShopContent = ({ itemName, itemCode, itemIconUrl, description }: SearchItem) => {
  const [tradeType, setTradeType] = useState<TradeType>('sell');
  const [orderBy, setOrderBy] = useState<ListOrderBy>('latest');

  const { trades, marketPrice } = useMapleMarket({
    itemCode,
    tradeType,
    orderBy,
  });

  const stats: Stats[] = [
    {
      title: '전체',
      value: marketPrice.total.toLocaleString(),
      description: '전체 평균 가격',
    },
    {
      title: '판매',
      value: marketPrice.sell.toLocaleString(),
      description: '판매 평균 가격',
    },
    {
      title: '구매',
      value: marketPrice.buy.toLocaleString(),
      description: '구매 평균 가격',
    },
  ];

  if (trades.length === 0) return <Empty />;
  return (
    <div className="w-full h-full flex-col flex p-4">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-4">
        <div className="size-9 bg-surface rounded-md flex items-center justify-center">
          <Image src={itemIconUrl} alt="item icon" width={24} height={24} />
        </div>
        <p className="text-title-18">{itemName}</p>
      </div>

      {/* 시세 통계 */}
      <StatsCard className="mt-3" stats={stats} />

      {/* 아이템 필터 */}
      <FilterBar className="mt-8" onTradeTypeChange={setTradeType} onSortChange={setOrderBy} />

      {/* 아이템 리스트 */}
      <TradeList
        items={trades}
        itemName={itemName}
        itemIconUrl={itemIconUrl}
        description={description}
        className="mt-2"
      />
    </div>
  );
};

const ShopContentSkeleton = () => {
  return (
    <div className="w-full h-full flex-col flex p-4">
      <div className="flex items-center gap-4">
        <div className="size-9 bg-surface rounded-md animate-pulse"></div>
        <p className="h-5 flex-1 bg-surface rounded-sm animate-pulse"></p>
      </div>

      <div className="mt-4 bg-surface rounded-md h-20 animate-pulse" />

      <div className="flex justify-between mt-7 ">
        <div className="bg-surface rounded-md h-7 w-28 animate-pulse" />
        <div className="bg-surface rounded-md h-7 w-18 animate-pulse" />
      </div>

      <div className="mt-2 bg-surface rounded-md flex-1 animate-pulse" />
    </div>
  );
};
