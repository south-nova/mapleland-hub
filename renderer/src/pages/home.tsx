import React from 'react';

import { SearchInput } from '@/components/ui/SearchInput';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Title } from '@/components/Title';
import { useSearchItemStore } from '@/store/searchItem';

export default function HomePage() {
  const router = useRouter();
  const setSearchItem = useSearchItemStore((state) => state.setSearchItem);

  const handleSearch = (itemCode: string, itemName: string, description: string) => {
    const itemIconUrl = `https://maplestory.io/api/gms/62/item/${itemCode}/icon`;
    setSearchItem({ itemCode, itemName, itemIconUrl, description });

    router.push(`/shop`);
  };

  return (
    <>
      <Title update />

      <div className="flex-1 overflow-hidden">
        <div className="p-4 flex flex-col h-full pt-12">
          <h1 className="text-title-24 text-center">MAPLELAND.GG</h1>

          {/* 검색 입력 필드 */}
          <SearchInput className="mt-4" placeholder="아이템 이름 검색" onSearch={handleSearch} />

          {/* 최근 검색 목록 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-[20rem] aspect-square mt-12">
              <Image src="/images/shop.png" alt="shop" fill className="object-contain" />
            </div>

            <div className="flex gap-2 items-center justify-center mt-3 select-none">
              <div className="flex gap-1 items-center justify-center">
                <div className="text-body-12 text-foreground-muted border bg-surface border-border rounded-sm px-1 py-0.5">
                  Command / Alt
                </div>
                +
                <div className="text-body-12 text-foreground-muted border bg-surface border-border rounded-sm px-1 py-0.5">
                  O
                </div>
              </div>
              <div className="text-body-14 text-foreground-muted">숨기기/보이기</div>
            </div>
          </div>

          <p className="text-center text-foreground-muted text-body-12 mt-3">@south-nova</p>
        </div>
      </div>
    </>
  );
}
