import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL del endpoint en MockAPI
  const API_URL = "https://632cf1980d7928c7d24306e5.mockapi.io/users";

  // Función para login
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}?email=${email}`);
      
      if (!response.ok) throw new Error("Error en la petición");
      
      const users = await response.json();
      
      if (users.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      
      const userFound = users[0];
      
      if (userFound.password !== password) {
        throw new Error("Contraseña incorrecta");
      }
      
      // Crear objeto de usuario sin la contraseña
      const userData = {
        id: userFound.id,
        email: userFound.email,
        name: userFound.name
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
      
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para registro
  const register = useCallback(async (email, password, name) => {
    setLoading(true);
    setError(null);
    
    try {
      // Verificar si el usuario ya existe
      const checkResponse = await fetch(`${API_URL}?email=${email}`);
      const existingUsers = await checkResponse.json();
      
      if (existingUsers.length > 0) {
        throw new Error("El email ya está registrado");
      }
      
      // Crear nuevo usuario
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      });
      
      if (!response.ok) throw new Error("Error al registrar");
      
      const newUser = await response.json();
      
      // Hacer login automático después del registro
      await login(email, password);
      return true;
      
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [login]);

  // Función para logout
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  // Cargar usuario al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout,
      register,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};