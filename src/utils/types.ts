export type IngredientType = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: string;
};

export type wsConnect = {
  wsUrl: string;
  withTokenRefresh: boolean;
};

export type OrderType = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  id?: string;
};

export type OrderListType = {
  success: boolean;
  orders: OrderType[];
  total: number;
  totalToday: number;
};
