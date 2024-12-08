import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';
import { CartItem } from './CartItem';

export function Cart() {
  const { cart, clearCart } = useCartStore();

  if (cart.items.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <FaShoppingCart className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-2" />
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Shopping Cart</h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Clear Cart
        </button>
      </div>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-gray-800 dark:text-white">Total:</span>
          <span className="text-gray-800 dark:text-white">${cart.total}</span>
        </div>
        <button
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}