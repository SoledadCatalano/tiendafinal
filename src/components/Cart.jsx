import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Cart() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity,
    clearCart 
  } = useCart();

  const [showThankYou, setShowThankYou] = useState(false);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setShowThankYou(true);
     
    setTimeout(() => {
      clearCart();
      setShowThankYou(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div className={`fixed inset-0 z-40 flex justify-end ${isCartOpen ? 'visible' : 'invisible'}`}>
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer del carrito */}
      <div className={`relative bg-white w-full sm:w-[400px] h-full shadow-xl p-6 z-50 transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {showThankYou ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Muchas gracias por su compra!</h2>
            <p className="text-gray-600">Su pedido ha sido procesado con éxito.</p>
            <button 
              onClick={() => {
                setShowThankYou(false);
                setIsCartOpen(false);
              }}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tu Carrito ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="relative  bottom-1 text-gray-500 hover:text-black z-50 mr-[120px] lg:mr-[55px]">
                <X className="w-6 h-6 text-gray-500 hover:text-black" />
              </button>
            </div>
            
            {/* Lista de productos */}
            <div className="h-[calc(100%-180px)] overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-12">Tu carrito está vacío</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img 
                      src={item.images?.[0]} 
                      alt={item.title} 
                      className="w-20 h-20 object-contain"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">${item.price} x {item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>
            
            {/* Total y checkout */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={cart.length === 0}
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}