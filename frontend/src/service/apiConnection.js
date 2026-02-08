// service/apiConnection.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5208",
});

// Interceptor para adicionar o token em cada requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;