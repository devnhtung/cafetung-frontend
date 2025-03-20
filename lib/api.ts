// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials: { email: string; password: string }) =>
  api.post("/login", credentials);
export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => api.post("/register", data);
export const logout = () => api.post("/logout");
export const getProducts = () => api.get("/products");
export const getSliders = () => api.get("/sliders");
export const getCategories = () => api.get("/categories");
// export const createOrder = (data: any) => api.post("/orders", data);
export const getOrders = () => api.get("/orders");
export const getPosts = () => api.get("/posts");

export default api;
