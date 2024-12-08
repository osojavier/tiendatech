import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { CartItem as CartItemType } from '../types/cart';
import { useCartStore } from '../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h3 className="text-gray-800 dark:text-white font-medium">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        >
          <FaMinus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center text-gray-800 dark:text-white">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        >
          <FaPlus className="w-4 h-4" />
        </button>
        <button
          onClick={() => removeFromCart(item.productId)}
          className="p-1 text-red-600 hover:text-red-700 ml-2"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}