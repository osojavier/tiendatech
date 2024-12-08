import { create } from 'zustand';
import { Cart, CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartState {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: {
    items: [],
    total: 0,
  },
  addToCart: (product: Product) => {
    const { cart } = get();
    const existingItem = cart.items.find(item => item.productId === product.id);

    if (existingItem) {
      const updatedItems = cart.items.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({
        cart: {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        },
      });
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        productId: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        image: product.image,
      };
      set({
        cart: {
          items: [...cart.items, newItem],
          total: calculateTotal([...cart.items, newItem]),
        },
      });
    }
  },
  removeFromCart: (productId: number) => {
    const { cart } = get();
    const updatedItems = cart.items.filter(item => item.productId !== productId);
    set({
      cart: {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      },
    });
  },
  updateQuantity: (productId: number, quantity: number) => {
    const { cart } = get();
    if (quantity < 1) return;
    
    const updatedItems = cart.items.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    set({
      cart: {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      },
    });
  },
  clearCart: () => {
    set({
      cart: {
        items: [],
        total: 0,
      },
    });
  },
  getItemQuantity: (productId: number) => {
    const { cart } = get();
    const item = cart.items.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  },
}));

const calculateTotal = (items: CartItem[]): number => {
  return Number(items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));
};