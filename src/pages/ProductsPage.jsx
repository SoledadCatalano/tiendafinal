import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { Helmet } from "react-helmet";
import { ChevronLeft, ChevronRight, ShoppingCart, User, ArrowLeft, Search } from "lucide-react";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const { isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular productos para la página actual (usando los productos filtrados si hay búsqueda)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchTerm 
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Resetear a página 1 cuando se realiza una búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="lg:bg-gray-50 min-h-screen">
      <Helmet>
        <title>Smart Electronic - Todos los productos</title>
      </Helmet>

      {/* Botones flotantes */}
      <button 
        onClick={() => setIsCartOpen(true)} 
        className="fixed top-4 right-[80px] z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
      <button 
        onClick={() => navigate('/login')} 
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        <User className="w-5 h-5" />
      </button>
      
      <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors lg:hidden mt-6 ml-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al home</span>
          </Link>

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-10 text-center">
            Todos nuestros productos
          </h1>
          
          {/* Barra de búsqueda */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" 
              />
              <input
                type="text"
                placeholder="Busca tu producto"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 shadow-xl text-lg focus:ring-4 focus:ring-blue-500/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Mensaje cuando no hay resultados */}
          {searchTerm && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No encontramos productos que coincidan con "{searchTerm}"
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          )}

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Paginación - solo mostrar si hay productos */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-full ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                className={`p-2 rounded-full ${currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      <Link 
            to="/" 
            className="lg:inline-flex hidden items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors lg:ml-10 lg:mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al home</span>
          </Link>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}