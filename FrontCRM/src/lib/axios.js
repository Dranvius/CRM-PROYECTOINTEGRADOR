import axios from 'axios';
import { useAuthStore } from '../storage/globalStorage.js';

// 📦 Usamos la variable de entorno definida en .env o en Render
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔐 Interceptor para agregar token de autenticación a cada request
authApi.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default authApi;
