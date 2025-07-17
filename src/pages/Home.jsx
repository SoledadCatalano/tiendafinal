import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ShoppingCart, User, ArrowRight } from 'lucide-react';
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Footer from "../components/Footer";



export default function Home() {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [searchTerm] = useState('');
  const { isCartOpen, setIsCartOpen } = useCart();



  useEffect(() => {
    if (products.length > 0) {
      setfeaturedProducts(products.slice(0, 6));
    }
  }, [products]);


  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  

  return (
    <>
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Smart Electronics</title>
        <meta name="description" content="Tienda de producto relacionados con Alexa" />
      </Helmet>
      <button 
        onClick={() => setIsCartOpen(true)} 
        className="fixed top-4 right-[80px] z-50 bg-blue-200 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-400 transition"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
      <button 
        onClick={() => navigate('/login')} 
        className="fixed top-4 right-4 z-50 bg-blue-200 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-400 transition"
      >
        <User className="w-5 h-5" />
      </button>
      <div className="relative bg-gradient-to-br from-gray-400  to-gray-200 overflow-hidden">
        <div className="absolute inset-0">
         
        </div>

            <section className="principalIndex">
            <h1 className="marca">Smart Electronics</h1>
            <div className="contenedorTextoPrincipalIndex">
                 <p>
                     La mas alta calidad y cantidad de artículos para tu casa inteligente
                 </p>
                 
             </div>
         </section>
            </div>
         
      

      

      {/* Productos */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Productos 
            </h2>
            
          </div>

          
          

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchTerm ? filteredProducts : featuredProducts).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        
          
          <button 
            onClick={() => navigate('/products')} 
            className="bg-blue-400 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors mt-10 flex items-center justify-center"
          >
            Ver más <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </section>


    

     


      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
    <Footer />
    </>
  );
  
}