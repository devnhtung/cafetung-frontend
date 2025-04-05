// types/index.ts

// Định nghĩa kiểu cho user
export interface User {
  id: number;
  name: string;
  email: string | null;
  role: string | null;
  phone: string | null;
  address: string | null;
  position_id: number | null;
  position_name?: string;
  avatar?: string | null; // Add avatar field
}
export interface Shift {
  id: number;
  date: string;
  shiftType: ShiftType;
  registrations: Registration[];
}
export interface ShiftType {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}

export interface Registration {
  id: number;
  user_id: number;
  shift_id?: number;
  shift_date?: string;
  shift_type?: string;
  employee_name: string;
  position_id: number;
  position_name: string;
  status: string;
  check_in_time?: string;
  check_out_time?: string;
}

// employee don gian cho select
export interface Employee {
  id: number;
  name: string;
  position_id: number;
}
// types/employee.ts
export interface EmployeeDetail {
  id: number;
  user_id: number;
  full_name: string | null;
  date_of_birth: string | null;
  gender: "male" | "female" | "other" | null;
  phone_number: string | null;
  address: string | null;
  hire_date: string | null;
  national_id: string | null;
  bank_account: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  created_at: string | null;
  updated_at: string | null;
}
export interface Position {
  id: number;
  name: string;
  description: string;
}
export interface Task {
  id: number;
  name: string;
  description: string;
  completed_at: Date;
  status: string;
  shift_registration_id: number;
  task_id: number;
}
export interface Evaluation {
  id: number;
  user_id: User;
  employee_name?: string;
  evaluation_date?: Date;
  rating?: number | null;
  comments?: string | null;
  evaluated_by?: User | null;
}
// Định nghĩa kiểu cho props của Home
export interface HomeProps {
  initialUser: User | null;
  initialToken: string | null;
}

export const positionStyles: {
  [key: string]: { background: string; text: string };
} = {
  "Phục vụ": { background: "bg-green-800", text: "text-green-100" },
  "Thu ngân": { background: "bg-orange-800", text: "text-orange-100" },
  "Thử việc": { background: "bg-purple-800", text: "text-purple-100" },
  "Pha chế": { background: "bg-blue-800", text: "text-blue-100" },
};
