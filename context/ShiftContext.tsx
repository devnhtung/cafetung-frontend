// context/ShiftContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Shift, Task, ShiftType, Employee, Position } from "@/types";
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
  getPositions,
  addTaskToRegistration,
  getDefaultTasksByShiftType,
  getDefaultTasksByPosition,
  deleteTaskOfRegistration,
} from "@/lib/api";
import { toast } from "react-toastify";

interface ShiftContextType {
  shifts: Shift[];
  employees: Employee[];
  positions: Position[];
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
    addDefaultTasks?: boolean,
    onSuccess?: () => void
  ) => Promise<void>;
  handleCheckIn: (id: number, onSuccess: () => void) => Promise<void>;
  handleCheckOut: (id: number, onSuccess: () => void) => Promise<void>;
  handleFetchTasks: (registrationId: number) => Promise<void>;
  handleDeleteTaskOfRegistration: (
    registrationId: number,
    taskId: number
  ) => Promise<void>;
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
  const [positions, setPositions] = useState<Position[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPastWeek, setIsPastWeek] = useState(false);
  const [shiftTypes, setShiftTypes] = useState<ShiftType[]>([]);
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
      const employeesData = await getEmployees();
      console.log(employeesData);
      setEmployees(employeesData.data);
      const positionsData = await getPositions();
      setPositions(positionsData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Không thể lấy dữ liệu lịch làm việc.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    const getShiftTypes = async () => {
      try {
        const resp = await fetchShiftTypes();
        setShiftTypes(resp.data);
      } catch (error) {
        console.error("Error getShiftTypes", error);
      }
    };
    getShiftTypes();
  }, []);

  // Xử lý điều hướng tuần trước
  const handlePreviousWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() - 7);
    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 6);
    setStartDate(newStart.toISOString().split("T")[0]);
    setEndDate(newEnd.toISOString().split("T")[0]);
  };

  // Xử lý điều hướng tuần sau
  const handleNextWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() + 7);
    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 6);
    setStartDate(newStart.toISOString().split("T")[0]);
    setEndDate(newEnd.toISOString().split("T")[0]);
  };

  const handleRegisterShift = async (
    shiftId: number,
    userId: number,
    positionId: number,
    addDefaultTasks: boolean = false,
    onSuccess?: () => void
  ) => {
    try {
      // 1. Kiểm tra xem nhân viên đã đăng ký ca làm này chưa
      const shift = shifts.find((s) => s.id === shiftId);
      if (!shift) {
        throw new Error("Không tìm thấy ca làm!");
      }
      const isAlreadyRegistered = shift.registrations.some(
        (reg) => reg.user_id === userId
      );
      if (isAlreadyRegistered) {
        toast.error("Bạn đã đăng ký ca làm này rồi!", {
          position: "top-right",
          autoClose: 3000,
        });
        return; // Dừng lại nếu đã đăng ký
      }

      const registrationResponse = await registerShift(
        shiftId,
        userId,
        positionId
      );
      const registrationId = registrationResponse.data.id;
      // Nếu chọn thêm công việc mặc định

      // 3. Nếu chọn thêm công việc mặc định
      if (addDefaultTasks) {
        const shiftType = shift.shiftType.name;
        const shiftTypeId = shift.shiftType.id;

        // Lấy danh sách công việc mặc định dựa trên shift_type và position
        const [shiftTypeTasksResponse, positionTasksResponse] =
          await Promise.all([
            getDefaultTasksByShiftType(shiftTypeId), // Lấy công việc mặc định theo shift_type
            getDefaultTasksByPosition(positionId), // Lấy công việc mặc định theo position
          ]);

        const shiftTypeTasks = shiftTypeTasksResponse.data || [];
        const positionTasks = positionTasksResponse.data || [];

        // Kết hợp danh sách công việc (loại bỏ trùng lặp nếu cần)
        const defaultTasks = [...shiftTypeTasks, ...positionTasks].filter(
          (task, index, self) =>
            index === self.findIndex((t) => t.id === task.id)
        );

        // Thêm các công việc mặc định vào đăng ký ca làm
        if (defaultTasks.length > 0) {
          for (const task of defaultTasks) {
            await addTaskToRegistration(registrationId, task.id);
          }
        } else {
          console.log(
            "Không có công việc mặc định nào cho ca làm và vị trí này."
          );
        }
      }

      toast.success("Đăng ký ca thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Đăng ký ca thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCheckIn = async (id: number, onSuccess: () => void) => {
    try {
      await checkInShift(id);
      toast.success("Chấm công vào ca thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Chấm công thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCheckOut = async (id: number, onSuccess: () => void) => {
    try {
      await checkOutShift(id);
      toast.success("Chấm công ra ca thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Chấm công thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleFetchTasks = async (registrationId: number) => {
    try {
      const data = await fetchShiftTasks(registrationId);
      setTasks(data.data);
      setSelectedRegistrationId(registrationId);
      // setIsTasksModalOpen(true);
    } catch (error: any) {
      toast.error(error.message || "Lấy danh sách công việc thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleAddTask = async (
    registrationId: number,
    taskId: number,
    onSuccess: () => void
  ) => {
    try {
      await addShiftTask(registrationId, taskId);
      toast.success("Thêm công việc thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Thêm công việc thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCompleteTask = async (taskId: number, onSuccess: () => void) => {
    if (!selectedRegistrationId) return;
    try {
      await completeShiftTask(selectedRegistrationId, taskId);
      toast.success("Hoàn thành công việc thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Hoàn thành công việc thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
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
      toast.success("Duyệt ca thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Duyệt ca thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleRejectShift = async (id: number, onSuccess: () => void) => {
    try {
      await rejectShift(id);
      toast.success("Từ chối ca thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Từ chối ca thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // delete tastk
  const handleDeleteTaskOfRegistration = async (
    registrationId: number,
    taskId: number
  ) => {
    try {
      await deleteTaskOfRegistration(registrationId, taskId); // API giả định để xóa công việc
      await handleFetchTasks(registrationId); // Làm mới danh sách công việc
      toast.success("Xóa công việc thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Xóa công việc thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const createShift = async (date: string, shift_type_id: number) => {
    try {
      await addShift(date, shift_type_id);
      fetchData();
    } catch (error) {
      throw new Error("Failed to add shift");
    }
  };

  return (
    <ShiftContext.Provider
      value={{
        shifts,
        employees,
        positions,
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
        handleDeleteTaskOfRegistration,
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
    throw new Error("useShift must be used within a ShiftProvider");
  }
  return context;
};
