// context/ShiftContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Shift, Task, ShiftType, Employee } from "@/types";
import { getWeekRange } from "@/lib/utils";
import {
  fetchShiftTasks,
  registerShift,
  checkInShift,
  checkOutShift,
  addShiftTask,
  completeShiftTask,
  approveShift,
  rejectShift,
  fetchShiftTypes,
  addShift,
  getShifts,
  getEmployees,
} from "@/lib/api";
import { toast } from "react-toastify";

interface ShiftContextType {
  shifts: Shift[];
  employees: Employee[];
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleNextWeek: () => void;
  handlePreviousWeek: () => void;
  fetchData: () => Promise<void>;
  tasks: Task[];
  isPastWeek: boolean;
  setIsPastWeek: (open: boolean) => void;
  shiftTypes: ShiftType[];
  setTasks: (tasks: Task[]) => void;
  isTasksModalOpen: boolean;
  setIsTasksModalOpen: (open: boolean) => void;
  handleRegisterShift: (
    shiftId: number,
    userId: number,
    positionId: number,
    onSuccess: () => void
  ) => Promise<void>;
  handleCheckIn: (id: number, onSuccess: () => void) => Promise<void>;
  handleCheckOut: (id: number, onSuccess: () => void) => Promise<void>;
  handleFetchTasks: (registrationId: number) => Promise<void>;
  handleAddTask: (
    registrationId: number,
    taskId: number,
    onSuccess: () => void
  ) => Promise<void>;
  handleCompleteTask: (taskId: number, onSuccess: () => void) => Promise<void>;
  handleApproveShift: (
    id: number,
    performanceRating: number,
    managerComments: string,
    onSuccess: () => void
  ) => Promise<void>;
  handleRejectShift: (id: number, onSuccess: () => void) => Promise<void>;
  createShift: (date: string, shift_type_id: number) => Promise<void>;
}

const ShiftContext = createContext<ShiftContextType | undefined>(undefined);

export const ShiftProvider = ({ children }: { children: ReactNode }) => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPastWeek, setIsPastWeek] = useState(false);
  const [shiftTypes, setshiftTypes] = useState<ShiftType[]>([]);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState<
    number | null
  >(null);

  // Khởi tạo startDate và endDate khi context được tạo
  useEffect(() => {
    const today = new Date();
    const { startDate, endDate } = getWeekRange(today);
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  // Lấy dữ liệu khi startDate hoặc endDate thay đổi
  const fetchData = async () => {
    if (!startDate || !endDate) return;
    try {
      const shiftsData = await getShifts(startDate, endDate);
      setShifts(shiftsData.data);
      console.log("shiftsData.data");
      const employeesData = await getEmployees();
      setEmployees(employeesData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Không thể lấy dữ liệu lịch làm việc.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    console.log("lay shifts");
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    const getShiftTypes = async () => {
      try {
        const resp = await fetchShiftTypes();
        setshiftTypes(resp.data);
      } catch (error) {
        console.error("Error getShiftTypes", error);
      }
    };
    getShiftTypes();
  }, []);

  // Xử lý điều hướng tuần trước
  const handlePreviousWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() - 7); // Giảm 7 ngày
    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 6); // Cộng 6 ngày để lấy ngày cuối tuần
    setStartDate(newStart.toISOString().split("T")[0]);
    setEndDate(newEnd.toISOString().split("T")[0]);
    fetchData();
  };

  // Xử lý điều hướng tuần sau
  const handleNextWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() + 7); // Cộng 7 ngày
    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 6); // Cộng 6 ngày để lấy ngày cuối tuần
    setStartDate(newStart.toISOString().split("T")[0]);
    setEndDate(newEnd.toISOString().split("T")[0]);
    fetchData();
  };

  const handleRegisterShift = async (
    shiftId: number,
    userId: number,
    positionId: number,
    onSuccess: () => void
  ) => {
    try {
      await registerShift(shiftId, userId, positionId);
      alert("Đăng ký ca thành công!");
      onSuccess();
    } catch (error: any) {
      alert(error.message || "Đăng ký ca thất bại!");
    }
  };

  const handleCheckIn = async (id: number, onSuccess: () => void) => {
    try {
      await checkInShift(id);
      alert("Chấm công vào ca thành công!");
      onSuccess();
    } catch (error: any) {
      alert(error.message || "Chấm công thất bại!");
    }
  };

  const handleCheckOut = async (id: number, onSuccess: () => void) => {
    try {
      await checkOutShift(id);
      alert("Chấm công ra ca thành công!");
      onSuccess();
    } catch (error: any) {
      alert(error.message || "Chấm công thất bại!");
    }
  };

  const handleFetchTasks = async (registrationId: number) => {
    try {
      const data = await fetchShiftTasks(registrationId);
      console.log(data.data);
      setTasks(data.data);
      setSelectedRegistrationId(registrationId);
      setIsTasksModalOpen(true);
    } catch (error: any) {
      alert(error.message || "Lấy danh sách công việc thất bại!");
    }
  };

  const handleAddTask = async (
    registrationId: number,
    taskId: number,
    onSuccess: () => void
  ) => {
    try {
      await addShiftTask(registrationId, taskId);
      alert("Thêm công việc thành công!");
      onSuccess();
    } catch (error: any) {
      alert(error.message || "Thêm công việc thất bại!");
    }
  };

  const handleCompleteTask = async (taskId: number, onSuccess: () => void) => {
    if (!selectedRegistrationId) return;
    try {
      await completeShiftTask(selectedRegistrationId, taskId);
      alert("Hoàn thành công việc thành công!");
      onSuccess();
    } catch (error: any) {
      alert(error.message || "Hoàn thành công việc thất bại!");
    }
  };

  const handleApproveShift = async (
    id: number,
    performanceRating: number,
    managerComments: string,
    onSuccess: () => void
  ) => {
    try {
      await approveShift(id, performanceRating, managerComments);
      alert("Duyệt ca thành công!");
      onSuccess();
    } catch (error: any) {
      alert(error.message || "Duyệt ca thất bại!");
    }
  };

  const handleRejectShift = async (id: number, onSuccess: () => void) => {
    try {
      await rejectShift(id);
      alert("Từ chối ca thành công!");
      onSuccess();
    } catch (error: any) {
      alert(error.message || "Từ chối ca thất bại!");
    }
  };

  const createShift = async (date: string, shift_type_id: number) => {
    try {
      const response = await addShift(date, shift_type_id);
      console.log(response);
      // if (!response.ok) throw new Error("Failed to add shift");
    } catch (error) {
      throw new Error("Failed to add shift");
    }
  };

  return (
    <ShiftContext.Provider
      value={{
        shifts,
        employees,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        handleNextWeek,
        handlePreviousWeek,
        fetchData,
        tasks,
        isPastWeek,
        setTasks,
        setIsPastWeek,
        isTasksModalOpen,
        setIsTasksModalOpen,
        handleRegisterShift,
        handleCheckIn,
        handleCheckOut,
        handleFetchTasks,
        handleAddTask,
        handleCompleteTask,
        handleApproveShift,
        handleRejectShift,
        createShift,
        shiftTypes,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
};

export const useShift = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error("useShift must be used within an ShiftProvider");
  }
  return context;
};
