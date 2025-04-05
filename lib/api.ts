// lib/api.ts
"use client";
import API from "@/utils/api";
import { User, EmployeeDetail } from "@/types";

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
export const getOrders = () => API.get("/orders");
export const getPosts = () => API.get("/posts");
export const getUser = () => API.get("/user");

// Dashboard APIs
export const getShifts = (startDate: string, endDate: string) =>
  API.get(`/shifts?start_date=${startDate}&end_date=${endDate}`);

export const getEmployees = () => API.get("/employees");

export const getPositions = () => API.get("/positions");

export const fetchShiftTypes = () => API.get(`/shift-types`);

export const fetchShiftTasks = (registrationId: number) =>
  API.get(`/shift-registrations/${registrationId}/tasks`);

export const registerShift = (
  shiftId: number,
  userId: number,
  positionId: number
) =>
  API.post("/shift-registrations", {
    shift_id: shiftId,
    user_id: userId,
    position_id: positionId,
  });

export const addTaskToRegistration = (registrationId: number, taskId: number) =>
  API.post(`/shift-registrations/${registrationId}/tasks`, {
    task_id: taskId,
  });

export const deleteTaskOfRegistration = (
  registrationId: number,
  taskId: number
) => API.delete(`/shift-registrations/${registrationId}/tasks/${taskId}`);

// Bắt đầu ca làm
export const checkInShift = (id: number) =>
  API.patch(`/shift-registrations/${id}/check-in`);

// Chấm công ra ca
export const checkOutShift = (id: number) =>
  API.patch(`/shift-registrations/${id}/check-out`);

// Thêm công việc bổ sung
export const addShiftTask = (registrationId: number, taskId: number) =>
  API.post(`/shift-registrations/${registrationId}/tasks`, {
    task_id: taskId,
  });

// Hoàn thành công việc
export const completeShiftTask = (registrationId: number, taskId: number) =>
  API.patch(`/shift-registrations/${registrationId}/tasks/${taskId}/complete`);

// Duyệt ca
export const approveShift = (
  id: number,
  performanceRating?: number,
  managerComments?: string
) =>
  API.patch(`/shift-registrations/${id}/approve`, {
    performance_rating: performanceRating,
    manager_comments: managerComments,
  });

// Từ chối ca
export const rejectShift = (id: number) =>
  API.patch(`/shift-registrations/${id}/reject`);

export const addShift = (date: string, shift_type_id: number) =>
  API.post(`/shifts`, {
    date: date,
    shift_type_id: shift_type_id,
  });

export const getDefaultTasksByShiftType = async (shiftTypeId: number) => {
  try {
    const response = await API.get(`/shift-types/${shiftTypeId}/tasks`);
    return response.data; // Giả sử trả về danh sách công việc: [{ id, name, description }, ...]
  } catch (error) {
    console.error("Lỗi khi lấy công việc mặc định theo loại ca:", error);
    throw error;
  }
};

export const getDefaultTasksByPosition = async (shiftTypeId: number) => {
  try {
    const response = await API.get(`/positions/${shiftTypeId}/tasks`);
    return response.data; // Giả sử trả về danh sách công việc: [{ id, name, description }, ...]
  } catch (error) {
    console.error(
      "Lỗi khi lấy công việc mặc định theo vị trí công việc:",
      error
    );
    throw error;
  }
};

// xử lý employee
// getEmployeeDetails
export const addUser = async (
  user: Omit<User, "id" | "position_name"> & { password: string }
) => {
  try {
    const response = await API.post("/employees", {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      phone: user.phone,
      address: user.address,
      position_id: user.position_id,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi thêm user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  user: Omit<User, "id" | "position_name">
) => {
  try {
    const response = await API.put(`/employees/${id}`, {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      position_id: user.position_id,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error);
    throw error;
  }
};

export const addEmployeeDetail = async (
  detail: Omit<EmployeeDetail, "id" | "created_at" | "updated_at">
) => {
  try {
    const response = await API.post("/employee-details", {
      user_id: detail.user_id,
      full_name: detail.full_name,
      date_of_birth: detail.date_of_birth,
      gender: detail.gender,
      phone_number: detail.phone_number,
      address: detail.address,
      hire_date: detail.hire_date,
      national_id: detail.national_id,
      bank_account: detail.bank_account,
      emergency_contact_name: detail.emergency_contact_name,
      emergency_contact_phone: detail.emergency_contact_phone,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi thêm employee detail:", error);
    throw error;
  }
};

export const updateEmployeeDetail = async (
  id: number,
  detail: Omit<EmployeeDetail, "id" | "user_id" | "created_at" | "updated_at">
) => {
  try {
    const response = await API.put(`/employee-details/${id}`, {
      full_name: detail.full_name,
      date_of_birth: detail.date_of_birth,
      gender: detail.gender,
      phone_number: detail.phone_number,
      address: detail.address,
      hire_date: detail.hire_date,
      national_id: detail.national_id,
      bank_account: detail.bank_account,
      emergency_contact_name: detail.emergency_contact_name,
      emergency_contact_phone: detail.emergency_contact_phone,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật employee detail:", error);
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  return await API.delete(`/employees/${id}`);
};
export const getEmployeeDetails = () => API.get("/employee-details");

export default API;
