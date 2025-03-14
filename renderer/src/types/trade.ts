import { DiscordUserInfo, ItemOption } from '@/types/item';

export type TradeType = 'buy' | 'sell';
export type Offer = '0' | '1' | '2';
export type ListOrderBy = 'latest' | 'lowest' | 'highest' | 'upgrade';

export interface TradeItem {
  /** 고유 아이디 */
  id: string;

  /** 코멘트 */
  comment: string;
  /** 디스코드 유저 정보 */
  discordUser: DiscordUserInfo;

  /** 거래 상태 */
  tradeStatus: boolean;
  /** 거래 타입 */
  tradeType: TradeType;
  /** 흥정 가능 여부 0: 불가능, 1: 가능, 2: 없음 */
  offer: Offer;
  /** 거래 서버 */
  server: string;

  /** 아이템 이름 */
  itemName: string;
  /** 아이템 거래 가격 */
  itemPrice: number;
  /** 아이템 옵션 */
  itemOption: ItemOption;

  /** 생성일 */
  createdAt: string;
  /** 수정일 */
  updatedAt: string;
}
