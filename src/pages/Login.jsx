import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login() {
  const { login, loading, error: authError } = useAuth(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState(""); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLocalError(""); 
    
    if (!form.email || !form.password) {
      setLocalError("Todos los campos son obligatorios");
      return;
    }

    try {
      const success = await login(form.email, form.password);
      if (success) {
        navigate("/admin");
      }
    } catch (err) {
      setLocalError(err.message || "Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Helmet>
        <title>Smart Electronic - Iniciar Sesión</title>
        <meta 
          name="description" 
          content="Inicia sesión en Smart Electronic para acceder a tu cuenta y comprar los mejores celulares." 
        />
      </Helmet>
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        
        {localError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {localError}
          </div>
        )}
        
        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {authError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full mt-3 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Volver al inicio
        </button>
      </form>
    </div>
  );
}