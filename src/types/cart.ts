export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}