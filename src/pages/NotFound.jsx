import { Link } from 'react-router-dom';
import error from './../../public/images/404-image.jpeg';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={error} alt="error" className="lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]" />
      <Link 
        to="/" 
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}