const NAVIGATION = [
  {
    id: 1,
    alias: '/',
    name: "Список товаров",
  },
  {
    id: 2,
    alias: '/cart',
    name: "Корзина",
    showCart: true
  },
]

export const NAVIGATION_ACTIVE_USER = [
  ...NAVIGATION,
  {
    id: 3,
    alias: '/create-product',
    name: "Создать продукт",
  },
  {
    id: 4,
    alias: '/authentication',
    name: "Выход",
    exit: true
  },
] as {
  id: number;
  alias: string;
  name: string;
  exit?: true;
  showCart?: true;
}[]

export const NAVIGATION_INACTIVE_USER = [
  ...NAVIGATION,
  {
    id: 3,
    alias: '/authentication',
    name: "Вход",
  },
] as {
  id: number;
  alias: string;
  name: string;
  exit?: true;
  showCart?: true;
}[]
