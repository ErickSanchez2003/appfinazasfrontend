import axios from "axios"

// URL base de la API (backend)
const API_URL = import.meta.env.VITE_API_URL || "https://finanzas-appbackend.vercel.app/api"

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL, // ✅ SOLO esto, Vercel ya maneja el dominio
})

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api
