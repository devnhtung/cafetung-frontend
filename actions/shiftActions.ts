// actions/shiftActions.ts
import { useState } from "react";
import {
  registerShift,
  checkInShift,
  checkOutShift,
  completeShiftTask,
  approveShift,
  rejectShift,
} from "./api";
import { fetchShiftTasks, addShiftTask } from "@/lib/api";

export const useShiftActions = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState<
    number | null
  >(null);

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

  return {
    tasks,
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
  };
};
