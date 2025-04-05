// components/dashboard/DeleteUserModal.tsx
import { Dispatch, SetStateAction } from "react";
import { User, EmployeeDetail } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteUserModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedEmployee: (User & { employee_detail: EmployeeDetail | null }) | null;
  loading: boolean;
  onDeleteEmployee: () => Promise<void>;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  setIsOpen,
  selectedEmployee,
  loading,
  onDeleteEmployee,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa</DialogTitle>
        </DialogHeader>
        <p>Bạn có chắc chắn muốn xóa nhân viên {selectedEmployee?.name}?</p>
        <div className="flex space-x-2 mt-4">
          <Button
            variant="destructive"
            onClick={onDeleteEmployee}
            disabled={loading}
          >
            Xóa
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
