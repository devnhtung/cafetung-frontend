"use client";
// utils/api.ts
import API from "@/utils/api";
export const login = (credentials: { email: string; password: string }) =>
  API.post("/login", credentials);
export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => API.post("/register", data);

export const logout = (token: string) => {
  API.defaults.headers.Authorization = `Bearer ${token}`;
  return API.get("/logout");
};
export const getProducts = () => API.get("/products");
export const getSliders = () => API.get("/sliders");
export const getCategories = () => API.get("/categories");
// export const createOrder = (data: any) => api.post("/orders", data);
export const getOrders = () => API.get("/orders");
export const getPosts = () => API.get("/posts");
export const getUser = () => API.get("/user");

export default API;
