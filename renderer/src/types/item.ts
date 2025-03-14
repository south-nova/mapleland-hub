export type Gender = '0' | '1' | '2';

export interface ItemOption {
  /** 아이템 코드 */
  itemCode: number;
  /** 옵션 태그 */
  optionSummarize: null | string[];

  /** 성별 코드 0: 남자, 1: 여자, 2: 공용 */
  gender: Gender;
  /** 상점 판매 가격 */
  price: number;
  /** 업그레이드 횟수 */
  upgrade: number;
  /** 남은 업그레이드 횟수 */
  tuc?: number;

  /** 마력 */
  incMAD?: number;
  /** 공격력 */
  incPAD?: number;

  /** 회피율 */
  incEVA?: number;
  /** 명중률 */
  incACC?: number;

  /** 물리방어력 */
  incPDD?: number;
  /** 마법방어력 */
  incMDD?: number;
  /** 최대 체력 */
  incMHP?: number;

  /** STR */
  incSTR?: number;
  /** DEX */
  incDEX?: number;
  /** INT */
  incINT?: number;
  /** LUK */
  incLUK?: number;

  /** 합마 */
  hapma: number;
}

export interface DiscordUserInfo {
  /** 닉네임 */
  nickName: string;
  /** 계정 */
  account: string;
  /** 아바타 이미지 URL*/
  avatarUrl: string;
}
