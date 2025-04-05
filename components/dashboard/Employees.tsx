// components/dashboard/Employees.tsx
import { useState, useMemo } from "react";
import { User, EmployeeDetail } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployee } from "@/context/EmployeeContext";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

const Employees: React.FC = () => {
  const {
    employees,
    positions,
    loading,
    error,
    addUser,
    updateUser,
    addEmployeeDetail,
    updateEmployeeDetail,
    deleteEmployee,
  } = useEmployee();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    (User & { employee_detail: EmployeeDetail | null }) | null
  >(null);
  const [newUser, setNewUser] = useState<
    Omit<User, "id" | "position_name"> & { password: string }
  >({
    name: "",
    email: "",
    password: "",
    role: "staff",
    phone: null,
    address: null,
    position_id: 1,
  });
  const [newDetail, setNewDetail] = useState<
    Omit<EmployeeDetail, "id" | "created_at" | "updated_at">
  >({
    user_id: 0,
    full_name: "",
    date_of_birth: null,
    gender: null,
    phone_number: null,
    address: null,
    hire_date: null,
    national_id: null,
    bank_account: null,
    emergency_contact_name: null,
    emergency_contact_phone: null,
  });

  // Tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<string>("all"); // New state for position filter

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  // Lọc và tìm kiếm nhân viên
  const filteredEmployees = useMemo(() => {
    // Ensure employees is an array; if not, return an empty array
    const employeesArray = Array.isArray(employees) ? employees : [];
    return employeesArray.filter((employee) => {
      const matchesSearch = employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || employee.role === roleFilter;
      const matchesPosition =
        positionFilter === "all" ||
        employee.position_id === Number(positionFilter); // New position filter logic
      return matchesSearch && matchesRole && matchesPosition;
    });
  }, [employees, searchTerm, roleFilter, positionFilter]);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handleAddUser = async () => {
    await addUser(newUser);
    setIsAddUserModalOpen(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "staff",
      phone: null,
      address: null,
      position_id: 1,
    });
  };

  const handleUpdateUser = async () => {
    if (!selectedEmployee) return;
    await updateUser(selectedEmployee.id, newUser);
    setIsEditUserModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddDetail = async () => {
    if (!selectedEmployee) return;
    await addEmployeeDetail(newDetail);
    setIsEditUserModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleUpdateDetail = async () => {
    if (!selectedEmployee?.employee_detail) return;
    await updateEmployeeDetail(selectedEmployee.employee_detail.id, newDetail);
    setIsEditUserModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;
    await deleteEmployee(selectedEmployee.id);
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-4 sm:p-5 bg-white rounded-lg shadow">
      {/* Tìm kiếm và lọc */}
      <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        <Input
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3"
        />
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-1/4">
            <SelectValue placeholder="Lọc theo vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            <SelectItem value="staff">Nhân viên</SelectItem>
            <SelectItem value="manage">Quản lý</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger className="w-full sm:w-1/4">
            <SelectValue placeholder="Lọc theo vị trí" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vị trí</SelectItem>
            {positions.map((position) => (
              <SelectItem key={position.id} value={position.id.toString()}>
                {position.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Nút thêm tài khoản */}
      <div className="mb-4">
        <Button onClick={() => setIsAddUserModalOpen(true)}>
          Thêm tài khoản nhân viên
        </Button>
      </div>

      {/* Thông báo lỗi */}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Trạng thái loading */}
      {loading && <div className="mb-4">Đang tải...</div>}

      {/* Danh sách nhân viên (chỉ hiển thị thông tin đăng nhập) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-sm text-primary border">Tên</th>
              <th className="p-2 text-sm text-primary border">Email</th>
              <th className="p-2 text-sm text-primary border">Số điện thoại</th>
              <th className="p-2 text-sm text-primary border">Vai trò</th>
              <th className="p-2 text-sm text-primary border">Vị trí</th>
              <th className="p-2 text-sm text-primary border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => (
              <tr key={employee.id} className="border-t">
                <td className="p-2 text-sm text-primary border">
                  {employee.name}
                </td>
                <td className="p-2 text-sm text-primary border">
                  {employee.email}
                </td>
                <td className="p-2 text-sm text-primary border">
                  {employee.phone || "Chưa có"}
                </td>
                <td className="p-2 text-sm text-primary border">
                  {employee.role}
                </td>
                <td className="p-2 text-sm text-primary border">
                  {employee.position_name || "Chưa có"}
                </td>
                <td className="p-2 text-sm text-primary border">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setNewUser({
                          name: employee.name,
                          email: employee.email,
                          password: "",
                          role: employee.role,
                          phone: employee.phone,
                          address: employee.address,
                          position_id: employee.position_id,
                        });
                        setNewDetail({
                          user_id: employee.id,
                          full_name: employee.employee_detail?.full_name || "",
                          date_of_birth:
                            employee.employee_detail?.date_of_birth || null,
                          gender: employee.employee_detail?.gender || null,
                          phone_number:
                            employee.employee_detail?.phone_number || null,
                          address: employee.employee_detail?.address || null,
                          hire_date:
                            employee.employee_detail?.hire_date || null,
                          national_id:
                            employee.employee_detail?.national_id || null,
                          bank_account:
                            employee.employee_detail?.bank_account || null,
                          emergency_contact_name:
                            employee.employee_detail?.emergency_contact_name ||
                            null,
                          emergency_contact_phone:
                            employee.employee_detail?.emergency_contact_phone ||
                            null,
                        });
                        setIsEditUserModalOpen(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trang trước
          </Button>
          <span className="self-center">
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Trang sau
          </Button>
        </div>
      )}

      {/* Modal thêm tài khoản nhân viên */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        setIsOpen={setIsAddUserModalOpen}
        newUser={newUser}
        setNewUser={setNewUser}
        positions={positions}
        loading={loading}
        onAddUser={handleAddUser}
      />

      {/* Modal sửa thông tin nhân viên */}
      <EditUserModal
        isOpen={isEditUserModalOpen}
        setIsOpen={setIsEditUserModalOpen}
        selectedEmployee={selectedEmployee}
        newUser={newUser}
        setNewUser={setNewUser}
        newDetail={newDetail}
        setNewDetail={setNewDetail}
        positions={positions}
        loading={loading}
        onUpdateUser={handleUpdateUser}
        onAddDetail={handleAddDetail}
        onUpdateDetail={handleUpdateDetail}
      />

      {/* Modal xác nhận xóa */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        selectedEmployee={selectedEmployee}
        loading={loading}
        onDeleteEmployee={handleDeleteEmployee}
      />
    </div>
  );
};

export default Employees;
