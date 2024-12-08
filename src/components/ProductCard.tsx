import { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity } = useCartStore();
  const quantity = getItemQuantity(product.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800 dark:text-white">${product.price}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors relative"
          >
            Add to Cart
            {quantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                {quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}