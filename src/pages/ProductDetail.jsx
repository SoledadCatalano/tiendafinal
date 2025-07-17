import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, Star, Heart, ArrowLeft, Shield, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Cart from "../components/Cart";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const { isCartOpen, setIsCartOpen, addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://632cf1980d7928c7d24306e5.mockapi.io/products/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el producto');
        }
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images?.[0] || data.image || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id]);

  const getProductColors = (product) => {
    // Definimos colores específicos por modelo exacto
    const modelColors = {
      'Apple iPhone G6 (128GB)': [
        { name: 'Arena', color: '#F2E9CD' },
        { name: 'Rosa', color: '#f4acd9' },
        { name: 'Rojo', color: '#e43c3c' }
      ],
      'Apple iPhone G8 Pro (256GB)': [
        { name: 'Negro mate', color: '#474644' },
        { name: 'Arena', color: '#F2E9CD' },
        { name: 'Naranja metalizada', color: ' #ecb271' },
      ],
      'Infinix X9 + Auriculares (Infinix model FreeBuds s7)': [
        { name: 'Gris Claro', color: ' #dcd5cf' },
        { name: 'Negro mate', color: ' #333c4d' },
        { name: 'Purpura suave', color: '#dcd0f9' },
      ],
      'Motorola K10 Power': [
        { name: 'Verde selvatico', color: '#ced7bf' },
        { name: 'Negro mate', color: '#333c4d' },
        { name: 'Rosa metalizado', color: ' #ddbedb' }
      ],
      'OPPO Terrain Edition': [
        { name: 'Marmol', color: ' #ebece8' },
        { name: 'Militar edition', color: ' #4e6d58' },
        { name: 'Rosa bebe', color: ' #f2e3e3' }
      ],
      'Ryzer T5 Gaming': [
        { name: 'Blanco mate', color: '#e4e7eb' },
        { name: 'Negro metalizado', color: ' #131419' }
      ],
      'Samsung Galaxy A54 5G': [
        { name: 'Blanco brillante', color: '#f5f5f5' },
        { name: 'Negro mate', color: ' #333c4d' },
        { name: 'Grape edition', color: '#918fd7' },
        { name: 'Lima edition', color: ' #e3f4c4' }
      ],
      'Samsung Galaxy S23 FE': [
        { name: 'Negro brillante', color: '#131419' },
      ],
      'Samsung Connect 8 Tablet': [
        { name: 'Negro brillante', color: '#131419' },
        { name: 'Verde azulado', color: '#8dadb9' },
        { name: 'Champagne', color: '#af9796' },
      ],
      'Xiaomi Redmi 3 Pro': [
        { name: 'Verde Naturaleza', color: '#98b88f' },
        { name: 'Azul Marino', color: '#9ac1c8' },
        { name: 'Purpura mate', color: '#8a9cbf' },
        { name: 'Blanco mate', color: '#d1d3e3' },
        { name: 'Verde azulado', color: '#8dadb9' }
      ],
      'PlegaByte Xcare': [
        { name: 'Rojo mate', color: '#852d2c' },
        { name: 'Negro mate', color: '#454545' },
      ],
    };

    return modelColors[product.title] || [
      { name: 'Negro', color: '#000000' },
      { name: 'Blanco', color: '#ffffff' },
      { name: 'Rojo', color: '#e43c3c' },
      { name: 'Verde', color: '#a0d6b4' }
    ];
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Error: {error}</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    );
  }

    const colors = getProductColors(product);
  const rating = (4.2 + Math.random() * 0.7).toFixed(1);
  const reviews = Math.floor(Math.random() * 2000) + 100;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Helmet>
          <title>{product.title} - Smart Electronic</title>
          <meta name="description" content={product.description} />
        </Helmet>
          <div className="mb-8 flex items-center justify-between">
          {/* Volver a productos */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a productos</span>
          </Link>
          <button 
          onClick={() => setIsCartOpen(true)} 
          className="relative inline-flex items-center0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition">
            <ShoppingCart className="w-5 h-5" />
          </button>
          </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/* Imagen del producto */}
            <div className="relative">
      <Swiper
        navigation
        modules={[Navigation]}
        className="w-full lg:h-[650px] rounded-2xl bg-gray-100"
      >
        {Array.isArray(product.images) && product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center h-full p-4">
              <img
                src={img}
                alt={`${product.title} ${index + 1}`}
                className="object-contain max-h-full max-w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
    </div>

            {/* Información del producto */}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              

              {/* Precio */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-gray-500 ml-2">ARS</span>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

             
              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                onClick={() => {
                  addToCart(product);
                  setIsCartOpen(true);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl">
                  <ShoppingCart className="w-6 h-6" />
                  <span>Agregar al carrito</span>
                </button>
                
              </div>

             
                 
                
              
            </div>
          </div>

          {/* Sección de especificaciones */}
          <div className="border-t border-gray-200 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificaciones técnicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Marca</span>
                  <span className="text-gray-900">{product.brand}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Modelo</span>
                  <span className="text-gray-900">{product.title}</span>
                </div>
                
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Precio</span>
                  <span className="text-gray-900 font-bold">ARS{product.price}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Disponibilidad</span>
                  <span className="text-green-600 font-medium">En stock</span>
                </div>
                
              </div>
            </div>
          </div>

         
          
        </div>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
    
  );
}