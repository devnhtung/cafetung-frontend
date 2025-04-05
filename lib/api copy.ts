// utils/api.ts
"use client";
import API from "@/utils/api";
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return API.post("/login", credentials);
};
export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => API.post("/register", data);

export const logout = (token: string) => {
  API.defaults.headers.Authorization = `Bearer ${token}`;
  return API.post("/logout");
};
export const getProducts = () => API.get("/products");
export const getSliders = () => API.get("/sliders");
export const getCategories = () => API.get("/categories");
// export const createOrder = (data: any) => api.post("/orders", data);
export const getOrders = () => API.get("/orders");
export const getPosts = () => API.get("/posts");
export const getUser = () => API.get("/user");
// dashboard
export const getShifts = (startDate: string, endDate: string) =>
  API.get(`/shifts?start_date=${startDate}&end_date=${endDate}`);
export const getEmployees = () => API.get("/employees");

export const fetchShiftTasks = async (registrationId: number) => {
  return API.get(`/shift-registrations/${registrationId}/tasks`);
};
export const registerShift = async (
  shiftId: number,
  userId: number,
  positionId: number
) => {
  return API.post("/shift-registrations", {
    shift_id: shiftId,
    user_id: userId,
    position_id: positionId,
  });
};

// bat dau
export const checkInShift = async (id: number) => {
  return API.patch(`/shift-registrations/${id}/check-in`);
};

// Chấm công ra ca
export const checkOutShift = async (id: number) => {
  return API.patch(`/shift-registrations/${id}/check-out`, "PATCH");
};

// Thêm công việc bổ sung
export const addShiftTask = async (registrationId: number, taskId: number) => {
  return API.post(`/shift-registrations/${registrationId}/tasks`, {
    task_id: taskId,
  });
};

// Hoàn thành công việc
export const completeShiftTask = async (
  registrationId: number,
  taskId: number
) => {
  return API.patch(
    `/shift-registrations/${registrationId}/tasks/${taskId}/complete`
  );
};

// duyệt ca
export const approveShift = async (
  id: number,
  performanceRating?: number,
  managerComments?: string
) => {
  return API.patch(`/shift-registrations/${id}/approve`, {
    performance_rating: performanceRating,
    manager_comments: managerComments,
  });
};
// Từ chối ca
export const rejectShift = async (id: number) => {
  return API.patch(`/shift-registrations/${id}/reject`);
};
export const addShift = async (date: string, shift_type_id: number) => {
  return API.post(`/shifts`, {
    date: date,
    shift_type_id: shift_type_id,
  });
};

export const fetchShiftTypes = async () => {
  return API.get(`/shift-types`);
};

export default API;
