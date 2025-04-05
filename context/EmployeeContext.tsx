// context/EmployeeContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Position, EmployeeDetail } from "@/types";
import {
  getEmployeeDetails,
  getPositions,
  addUser,
  updateUser,
  addEmployeeDetail,
  updateEmployeeDetail,
  deleteEmployee,
} from "@/lib/api";
import { toast } from "react-toastify";

interface EmployeeContextType {
  employees: (User & { employee_detail: EmployeeDetail | null })[];
  positions: Position[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  fetchPositions: () => Promise<void>;
  addUser: (
    user: Omit<User, "id" | "position_name"> & { password: string }
  ) => Promise<void>;
  updateUser: (
    id: number,
    user: Omit<User, "id" | "position_name">
  ) => Promise<void>;
  addEmployeeDetail: (
    detail: Omit<EmployeeDetail, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateEmployeeDetail: (
    id: number,
    detail: Omit<EmployeeDetail, "id" | "user_id" | "created_at" | "updated_at">
  ) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<
    (User & { employee_detail: EmployeeDetail | null })[]
  >([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEmployeeDetails();
      console.log(response.data);
      setEmployees(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Lỗi khi lấy danh sách nhân viên."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPositions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPositions();
      setPositions(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Lỗi khi lấy danh sách vị trí.");
    } finally {
      setLoading(false);
    }
  };

  const addUserHandler = async (
    user: Omit<User, "id" | "position_name"> & { password: string }
  ) => {
    try {
      setLoading(true);
      setError(null);
      await addUser(user);
      toast.success("Thêm tài khoản nhân viên thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      await fetchEmployees();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Thêm tài khoản nhân viên thất bại!"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserHandler = async (
    id: number,
    user: Omit<User, "id" | "position_name">
  ) => {
    try {
      setLoading(true);
      setError(null);
      await updateUser(id, user);
      toast.success("Cập nhật thông tin đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      await fetchEmployees();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Cập nhật thông tin đăng nhập thất bại!"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addEmployeeDetailHandler = async (
    detail: Omit<EmployeeDetail, "id" | "created_at" | "updated_at">
  ) => {
    try {
      setLoading(true);
      setError(null);
      await addEmployeeDetail(detail);
      toast.success("Thêm thông tin chi tiết nhân viên thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      await fetchEmployees();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Thêm thông tin chi tiết nhân viên thất bại!"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployeeDetailHandler = async (
    id: number,
    detail: Omit<EmployeeDetail, "id" | "user_id" | "created_at" | "updated_at">
  ) => {
    try {
      setLoading(true);
      setError(null);
      await updateEmployeeDetail(id, detail);
      toast.success("Cập nhật thông tin chi tiết nhân viên thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      await fetchEmployees();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Cập nhật thông tin chi tiết nhân viên thất bại!"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployeeHandler = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteEmployee(id);
      toast.success("Xóa nhân viên thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      await fetchEmployees();
    } catch (err: any) {
      setError(err.response?.data?.message || "Xóa nhân viên thất bại!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        positions,
        loading,
        error,
        fetchEmployees,
        fetchPositions,
        addUser: addUserHandler,
        updateUser: updateUserHandler,
        addEmployeeDetail: addEmployeeDetailHandler,
        updateEmployeeDetail: updateEmployeeDetailHandler,
        deleteEmployee: deleteEmployeeHandler,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
