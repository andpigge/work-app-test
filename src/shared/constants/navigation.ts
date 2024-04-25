const NAVIGATION = [
  {
    id: 1,
    alias: '/',
    name: "Список товаров",
  },
]

export const NAVIGATION_ACTIVE_USER = [
  ...NAVIGATION,
  {
    id: 2,
    alias: '/create-product',
    name: "Создать продукт",
  },
  {
    id: 3,
    alias: '/cart',
    name: "Корзина",
  },
  {
    id: 4,
    alias: '/authentication',
    name: "Выход",
  },
]

export const NAVIGATION_INACTIVE_USER = [
  ...NAVIGATION,
  {
    id: 4,
    alias: '/authentication',
    name: "Вход",
  },
]
