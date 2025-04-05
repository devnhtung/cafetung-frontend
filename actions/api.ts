// actions/api.ts
// import { User } from "@/context/AuthContext";

export const fetchWithAuth = async (
  url: string,
  method: string = "GET",
  body?: any,
  token?: string
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || localStorage.getItem("token")}`,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

// Đăng nhập
export const login = async (email: string, password: string) => {
  return fetchWithAuth("/api/login", "POST", { email, password });
};

// Đăng xuất
export const logout = async () => {
  return fetchWithAuth("/api/logout", "POST");
};

// Lấy danh sách ca làm
export const fetchShifts = async (startDate: string, endDate: string) => {
  console.log(`/api/shifts?start_date=${startDate}&end_date=${endDate}`);
  return fetchWithAuth(
    `/api/shifts?start_date=${startDate}&end_date=${endDate}`
  );
};

// Đăng ký ca
export const registerShift = async (
  shiftId: number,
  userId: number,
  positionId: number
) => {
  return fetchWithAuth("/api/shift-registrations", "POST", {
    shift_id: shiftId,
    user_id: userId,
    position_id: positionId,
  });
};

// Lấy danh sách ca chờ duyệt
export const fetchPendingRegistrations = async () => {
  return fetchWithAuth("/api/shift-registrations/pending");
};

// duyệt ca
export const approveShift = async (
  id: number,
  performanceRating?: number,
  managerComments?: string
) => {
  return fetchWithAuth(`/api/shift-registrations/${id}/approve`, "PATCH", {
    performance_rating: performanceRating,
    manager_comments: managerComments,
  });
};

// Từ chối ca
export const rejectShift = async (id: number) => {
  return fetchWithAuth(`/api/shift-registrations/${id}/reject`, "PATCH");
};

// Chấm công vào ca
export const checkInShift = async (id: number) => {
  return fetchWithAuth(`/api/shift-registrations/${id}/check-in`, "PATCH");
};

// Chấm công ra ca
export const checkOutShift = async (id: number) => {
  return fetchWithAuth(`/api/shift-registrations/${id}/check-out`, "PATCH");
};

// Lấy danh sách công việc của ca
export const fetchShiftTasks = async (registrationId: number) => {
  return fetchWithAuth(`/api/shift-registrations/${registrationId}/tasks`);
};

// Hoàn thành công việc
export const completeShiftTask = async (
  registrationId: number,
  taskId: number
) => {
  return fetchWithAuth(
    `/api/shift-registrations/${registrationId}/tasks/${taskId}/complete`,
    "PATCH"
  );
};

// Lấy danh sách nhân viên
export const fetchEmployees = async () => {
  return fetchWithAuth("/api/employees");
};

// Lấy thông tin chi tiết nhân viên
export const fetchEmployeeDetails = async () => {
  return fetchWithAuth("/api/employees/details");
};

// Lấy danh sách đánh giá nhân viên
export const fetchEmployeeEvaluations = async () => {
  return fetchWithAuth("/api/employee-evaluations");
};

// Thêm đánh giá nhân viên
export const addEmployeeEvaluation = async (
  userId: number,
  evaluationDate: string,
  rating: number,
  comments: string,
  evaluatedBy?: number
) => {
  return fetchWithAuth("/api/employee-evaluations", "POST", {
    user_id: userId,
    evaluation_date: evaluationDate,
    rating,
    comments,
    evaluated_by: evaluatedBy,
  });
};

// Lấy danh sách công việc
export const fetchTasks = async () => {
  return fetchWithAuth("/api/tasks");
};
