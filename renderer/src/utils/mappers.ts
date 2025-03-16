/* eslint-disable @typescript-eslint/no-explicit-any */

import { DiscordUserInfo, ItemOption } from '@/types/item';
import { TradeItem } from '@/types/trade';

const mapResponseToDiscordUser = (data: any): DiscordUserInfo => {
  const nickName = data.global_name.trim() === '' ? data.full_name : data.global_name;
  return {
    nickName,
    account: data.full_name,
    avatarUrl: data.avatar,
    providerId: data.provider_id,
  };
};

const mapResponseToItemOption = (data: any): ItemOption => {
  return {
    itemCode: data.itemCode,
    optionSummarize: data.optionSummarize,
    gender: data.gender,
    price: data.price,
    upgrade: data.upgrade,
    tuc: data.tuc,

    reqLEV: data.reqLevel,
    reqSTR: data.reqSTR,
    reqDEX: data.reqDEX,
    reqINT: data.reqINT,
    reqLUK: data.reqLUK,

    incSTR: data.incSTR,
    incDEX: data.incDEX,
    incINT: data.incINT,
    incLUK: data.incLUK,
    incPAD: data.incPAD,
    incMAD: data.incMAD,
    incPDD: data.incPDD,
    incMDD: data.incMDD,
    incEVA: data.incEVA,
    incACC: data.incACC,
    incMHP: data.incMHP,
    incSpeed: data.incSpeed,
    incJump: data.incJump,

    hapma: data.hapma,
  };
};

export const mapResponseToTradeItem = (data: any): TradeItem[] => {
  return data.map((item: any) => ({
    id: item.url,
    comment: item.comment,
    tradeStatus: item.tradeStatus,
    tradeType: item.tradeType,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    offer: item.tradeOption.offer,
    server: item.tradeOption.server,
    discordUser: mapResponseToDiscordUser(item.traderDiscordInfo),
    itemOption: mapResponseToItemOption(item.itemOption),
  }));
};
