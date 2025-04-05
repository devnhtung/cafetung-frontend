// components/dashboard/EmployeeManagementModal.tsx
import { useState } from "react";
import { Registration } from "@/types";
import { useShift } from "@/context/ShiftContext";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa"; // Sử dụng biểu tượng ngôi sao từ react-icons

interface EmployeeManagementModalProps {
  registration: Registration;
  children: React.ReactNode;
}

const EmployeeManagementModal: React.FC<EmployeeManagementModalProps> = ({
  registration,
  children,
}) => {
  const {
    tasks,
    fetchData,
    handleFetchTasks,
    handleCompleteTask,
    handleApproveShift,
    handleRejectShift,
    handleDeleteTaskOfRegistration,
  } = useShift();
  const { isStaff } = useAuth();
  const [open, setOpen] = useState(false);
  const [performanceRating, setPerformanceRating] = useState<number>(0); // Đánh giá từ 1-5
  const [managerComments, setManagerComments] = useState<string>("");
  const [reminder, setReminder] = useState<string>("");

  const fetchTasks = async () => {
    await handleFetchTasks(registration.id);
  };

  const handleComplete = async (taskId: number) => {
    try {
      await handleCompleteTask(taskId, fetchTasks);
      toast.success("Hoàn thành công việc thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch {
      toast.error("Hoàn thành công việc thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleApprove = async () => {
    try {
      await handleApproveShift(
        registration.id,
        performanceRating,
        managerComments,
        fetchData
      );
      setOpen(false);
      toast.success("Duyệt ca thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch {
      toast.error("Duyệt ca thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleReject = async () => {
    try {
      await handleRejectShift(registration.id, fetchData);
      setOpen(false);
      toast.success("Từ chối ca thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch {
      toast.error("Từ chối ca thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleAddReminder = () => {
    // Giả lập chức năng nhắc việc (có thể tích hợp API sau)
    toast.success(`Đã thêm nhắc việc: ${reminder}`, {
      position: "top-right",
      autoClose: 3000,
    });
    setReminder("");
  };
  console.log(tasks);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Quản lý nhân viên: {registration.employee_name} (
            {registration.position_name})
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Công việc</TabsTrigger>
            {!isStaff && <TabsTrigger value="reminders">Nhắc việc</TabsTrigger>}
            <TabsTrigger value="status">Tình trạng</TabsTrigger>
          </TabsList>

          {/* Tab: Danh sách công việc */}
          <TabsContent value="tasks">
            <div className="space-y-2">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-medium">
                        {task.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleComplete(task.id)}
                        disabled={task.completed_at ? true : false}
                        className="text-xs sm:text-sm"
                      >
                        {task.completed_at ? "Đã hoàn thành" : "Hoàn thành"}
                      </Button>
                      {!task.completed_at && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDeleteTaskOfRegistration(
                              task.shift_registration_id,
                              task.task_id
                            )
                          }
                          className="text-xs sm:text-sm"
                        >
                          Xóa
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Chưa có công việc
                </p>
              )}
              {!isStaff && (
                <div className="mt-4 flex space-x-2">
                  <Button
                    onClick={handleApprove}
                    className="w-full text-xs sm:text-sm"
                  >
                    Duyệt ca
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    className="w-full text-xs sm:text-sm"
                  >
                    Từ chối ca
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab: Nhắc việc */}
          <TabsContent value="reminders">
            <div className="space-y-4">
              <div>
                <Label htmlFor="reminder" className="text-xs sm:text-sm">
                  Nội dung nhắc việc:
                </Label>
                <Input
                  id="reminder"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="text-xs sm:text-sm"
                />
              </div>
              <Button
                onClick={handleAddReminder}
                className="w-full text-xs sm:text-sm"
              >
                Thêm nhắc việc
              </Button>
            </div>
          </TabsContent>

          {/* Tab: Tình trạng và Đánh giá */}
          <TabsContent value="status">
            <div className="space-y-4">
              {/* Thông tin tình trạng ca làm */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm">
                  <strong>Trạng thái:</strong> {registration.status}
                </p>
                <p className="text-xs sm:text-sm">
                  <strong>Thời gian vào ca:</strong>{" "}
                  {registration.check_in_time || "Chưa chấm công"}
                </p>
                <p className="text-xs sm:text-sm">
                  <strong>Thời gian ra ca:</strong>{" "}
                  {registration.check_out_time || "Chưa chấm công"}
                </p>
              </div>

              {/* Phần đánh giá (chỉ hiển thị cho quản lý) */}
              {!isStaff && (
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm">Đánh giá:</Label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={24}
                        className={`cursor-pointer ${
                          star <= performanceRating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => setPerformanceRating(star)}
                      />
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="comments" className="text-xs sm:text-sm">
                      Nhận xét của quản lý:
                    </Label>
                    <Input
                      id="comments"
                      value={managerComments}
                      onChange={(e) => setManagerComments(e.target.value)}
                      className="text-xs sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeManagementModal;
