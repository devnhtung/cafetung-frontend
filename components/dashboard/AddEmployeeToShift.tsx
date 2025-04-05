// components/dashboard/AddEmployeeToShift.tsx
import { useState } from "react";
import { Employee, Position } from "@/types";
import { useShift } from "@/context/ShiftContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

interface AddEmployeeToShiftProps {
  shiftId: number;
  employees: Employee[];
  positions: Position[];
  onSuccess: () => void;
  userRole: string; // Thêm prop để kiểm tra quyền
}

const AddEmployeeToShift: React.FC<AddEmployeeToShiftProps> = ({
  shiftId,
  employees,
  positions,
  onSuccess,
  userRole,
}) => {
  const { handleRegisterShift } = useShift();
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [addDefaultTasks, setAddDefaultTasks] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedPosition) {
      toast.error("Vui lòng chọn nhân viên và vị trí làm việc.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await handleRegisterShift(
        shiftId,
        selectedEmployee,
        selectedPosition,
        addDefaultTasks,
        onSuccess
      );
      setSelectedEmployee(null);
      setSelectedPosition(null);
      setAddDefaultTasks(false);
      setOpen(false); // Đóng modal sau khi thêm thành công
    } catch {
      toast.error("Không thể thêm nhân viên vào ca làm. Vui lòng thử lại.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Chỉ admin hoặc manage mới được mở modal
  const canAddEmployee = userRole === "admin" || userRole === "manage";

  if (!canAddEmployee) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-600 hover:bg-blue-50 text-xs sm:text-sm px-2 py-0.5 mt-1"
        >
          Thêm nhân viên
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm nhân viên vào ca làm</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="employee-select"
              className="text-xs sm:text-sm font-medium"
            >
              Chọn nhân viên:
            </Label>
            <Select
              value={selectedEmployee?.toString() || ""}
              onValueChange={(value: string) =>
                setSelectedEmployee(Number(value))
              }
            >
              <SelectTrigger
                id="employee-select"
                className="w-full text-xs sm:text-sm"
              >
                <SelectValue placeholder="Chọn nhân viên" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id.toString()}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="position-select"
              className="text-xs sm:text-sm font-medium"
            >
              Chọn vị trí làm việc:
            </Label>
            <Select
              value={selectedPosition?.toString() || ""}
              onValueChange={(value) => setSelectedPosition(Number(value))}
            >
              <SelectTrigger
                id="position-select"
                className="w-full text-xs sm:text-sm"
              >
                <SelectValue placeholder="Chọn vị trí" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position.id} value={position.id.toString()}>
                    {position.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="add-default-tasks"
              checked={addDefaultTasks}
              onCheckedChange={(checked) =>
                setAddDefaultTasks(checked as boolean)
              }
            />
            <Label htmlFor="add-default-tasks" className="text-xs sm:text-sm">
              Thêm danh sách công việc mặc định
            </Label>
          </div>

          <Button type="submit" className="w-full text-xs sm:text-sm">
            Thêm nhân viên vào ca
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeToShift;
