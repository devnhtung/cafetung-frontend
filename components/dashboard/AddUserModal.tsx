// components/dashboard/AddUserModal.tsx
import { Dispatch, SetStateAction } from "react";
import { User } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Position } from "@/types";

interface AddUserModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  newUser: Omit<User, "id" | "position_name"> & { password: string };
  setNewUser: Dispatch<
    SetStateAction<Omit<User, "id" | "position_name"> & { password: string }>
  >;
  positions: Position[];
  loading: boolean;
  onAddUser: () => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  setIsOpen,
  newUser,
  setNewUser,
  positions,
  loading,
  onAddUser,
}) => {
  const validateUserForm = () => {
    if (!newUser.name || newUser.name.length < 2) {
      toast.error("Tên phải có ít nhất 2 ký tự!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    if (!newUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      toast.error("Email không hợp lệ!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    if (newUser.password && newUser.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    if (newUser.phone && !/^\d{10,11}$/.test(newUser.phone)) {
      toast.error("Số điện thoại phải có 10-11 chữ số!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    return true;
  };

  const handleAddUser = async () => {
    if (!validateUserForm()) return;
    await onAddUser();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thêm tài khoản nhân viên</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email ?? ""}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>
          <div className="py-2">
            <Label htmlFor="role">Vai trò</Label>
            <Select
              value={newUser.role ?? ""}
              onValueChange={(value) =>
                setNewUser({
                  ...newUser,
                  role: value as "staff" | "manage" | "admin",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">Nhân viên</SelectItem>
                <SelectItem value="manage">Quản lý</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              value={newUser.phone ?? ""}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value || null })
              }
            />
          </div>
          <div>
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              value={newUser.address ?? ""}
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value || null })
              }
            />
          </div>
          <div>
            <Label htmlFor="position">Vị trí</Label>
            <Select
              value={newUser.position_id?.toString() ?? ""}
              onValueChange={(value) =>
                setNewUser({ ...newUser, position_id: Number(value) })
              }
            >
              <SelectTrigger>
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
          <Button onClick={handleAddUser} disabled={loading}>
            Thêm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
