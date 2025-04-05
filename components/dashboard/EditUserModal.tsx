// components/dashboard/EditUserModal.tsx
import { Dispatch, SetStateAction } from "react";
import { User, EmployeeDetail } from "@/types";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Position } from "@/types";

interface EditUserModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedEmployee: (User & { employee_detail: EmployeeDetail | null }) | null;
  newUser: Omit<User, "id" | "position_name"> & { password: string };
  setNewUser: Dispatch<
    SetStateAction<Omit<User, "id" | "position_name"> & { password: string }>
  >;
  newDetail: Omit<EmployeeDetail, "id" | "created_at" | "updated_at">;
  setNewDetail: Dispatch<
    SetStateAction<Omit<EmployeeDetail, "id" | "created_at" | "updated_at">>
  >;
  positions: Position[];
  loading: boolean;
  onUpdateUser: () => Promise<void>;
  onAddDetail: () => Promise<void>;
  onUpdateDetail: () => Promise<void>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  setIsOpen,
  selectedEmployee,
  newUser,
  setNewUser,
  newDetail,
  setNewDetail,
  positions,
  loading,
  onUpdateUser,
  onAddDetail,
  onUpdateDetail,
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
    if (newUser.phone && !/^\d{10,11}$/.test(newUser.phone)) {
      toast.error("Số điện thoại phải có 10-11 chữ số!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    return true;
  };

  const validateDetailForm = () => {
    if (!newDetail.full_name || newDetail.full_name.length < 2) {
      toast.error("Họ và tên phải có ít nhất 2 ký tự!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    if (newDetail.phone_number && !/^\d{10,11}$/.test(newDetail.phone_number)) {
      toast.error("Số điện thoại phải có 10-11 chữ số!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    if (
      newDetail.emergency_contact_phone &&
      !/^\d{10,11}$/.test(newDetail.emergency_contact_phone)
    ) {
      toast.error("Số điện thoại liên hệ khẩn cấp phải có 10-11 chữ số!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    if (newDetail.national_id && !/^\d{9,12}$/.test(newDetail.national_id)) {
      toast.error("Số CMND/CCCD phải có 9-12 chữ số!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    return true;
  };

  const handleUpdateUser = async () => {
    if (!selectedEmployee || !validateUserForm()) return;
    await onUpdateUser();
  };

  const handleAddDetail = async () => {
    if (!selectedEmployee || !validateDetailForm()) return;
    await onAddDetail();
  };

  const handleUpdateDetail = async () => {
    if (!selectedEmployee?.employee_detail || !validateDetailForm()) return;
    await onUpdateDetail();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sửa thông tin nhân viên</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login-info" className="w-full ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login-info">Thông tin đăng nhập</TabsTrigger>
            <TabsTrigger value="detail-info">Thông tin chi tiết</TabsTrigger>
          </TabsList>

          {/* Tab Thông tin đăng nhập */}
          <TabsContent value="login-info">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
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
                  value={newUser.position_id?.toString()}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, position_id: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vị trí" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem
                        key={position.id}
                        value={position.id.toString()}
                      >
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdateUser} disabled={loading}>
                Cập nhật
              </Button>
            </div>
          </TabsContent>

          {/* Tab Thông tin chi tiết */}
          <TabsContent value="detail-info">
            <div className="space-y-4 ">
              <div>
                <Label htmlFor="full_name">Họ và tên</Label>
                <Input
                  id="full_name"
                  value={newDetail.full_name ?? ""}
                  onChange={(e) =>
                    setNewDetail({ ...newDetail, full_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="date_of_birth">Ngày sinh</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={newDetail.date_of_birth ?? ""}
                  onChange={(e) =>
                    setNewDetail({
                      ...newDetail,
                      date_of_birth: e.target.value || null,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  value={newDetail.gender ?? " "}
                  onValueChange={(value) =>
                    setNewDetail({
                      ...newDetail,
                      gender:
                        value === " "
                          ? null
                          : (value as "male" | "female" | "other"),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" ">Không chọn</SelectItem>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone_number">Số điện thoại</Label>
                <Input
                  id="phone_number"
                  value={newDetail.phone_number ?? ""}
                  onChange={(e) =>
                    setNewDetail({
                      ...newDetail,
                      phone_number: e.target.value || null,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={newDetail.address ?? ""}
                  onChange={(e) =>
                    setNewDetail({
                      ...newDetail,
                      address: e.target.value || null,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="hire_date">Ngày vào làm</Label>
                <Input
                  id="hire_date"
                  type="date"
                  value={newDetail.hire_date ?? ""}
                  onChange={(e) =>
                    setNewDetail({
                      ...newDetail,
                      hire_date: e.target.value || null,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="national_id">Số CMND/CCCD</Label>
                <Input
                  id="national_id"
                  value={newDetail.national_id ?? ""}
                  onChange={(e) =>
                    setNewDetail({
                      ...newDetail,
                      national_id: e.target.value || null,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="bank_account">Tài khoản ngân hàng</Label>
                <Input
                  id="bank_account"
                  value={newDetail.bank_account ?? ""}
                  onChange={(e) =>
                    setNewDetail({
                      ...newDetail,
                      bank_account: e.target.value || null,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="emergency_contact_name">
                  Tên liên hệ khẩn cấp
                </Label>
                <Input
                  id="emergency_contact_name"
                  value={newDetail.emergency_contact_name ?? ""}
                  onChange={(e) =>
                    setNewDetail({
                      ...newDetail,
                      emergency_contact_name: e.target.value || null,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="emergency_contact_phone">
                  Số điện thoại liên hệ khẩn cấp
                </Label>
                <Input
                  id="emergency_contact_phone"
                  value={newDetail.emergency_contact_phone ?? ""}
                  onChange={(e) =>
                    setNewDetail({
                      ...newDetail,
                      emergency_contact_phone: e.target.value || null,
                    })
                  }
                />
              </div>
              {selectedEmployee?.employee_detail ? (
                <Button onClick={handleUpdateDetail} disabled={loading}>
                  Cập nhật
                </Button>
              ) : (
                <Button onClick={handleAddDetail} disabled={loading}>
                  Thêm
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
