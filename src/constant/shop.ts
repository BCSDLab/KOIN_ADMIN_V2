const SHOP_OPTION = [
  {
    name: '배달 가능',
    data: 'delivery',
  },
  {
    name: '계좌 이체',
    data: 'pay_bank',
  },
  {
    name: '카드 결제',
    data: 'pay_card',
  },
] as const;

export default SHOP_OPTION;
