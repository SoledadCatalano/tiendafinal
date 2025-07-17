import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';  

export default function ProductCard({ product, className = "" }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  
  
 

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product);
      setIsCartOpen(true);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    } finally {
      setTimeout(() => setIsAdding(false), 500);
    }
  };

  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 ${className}`}>
      

      {/* Imagen del producto */}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 overflow-hidden cursor-pointer">
          <img 
            src={product.images} 
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
         
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-6">

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-blue-300 transition-colors cursor-pointer">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-700">
              ${product.price}
            </span>
          </div>
          
          <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`bg-gradient-to-r from-blue-200 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl ${
            isAdding ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          aria-label={`Agregar ${product.title} al carrito`}
        >
          {isAdding ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Comprar</span>
            </>
          )}
        </button>
        </div>
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl pointer-events-none transition-all duration-300"></div>
    </div>
  );
}