// components/dashboard/ShiftItem.tsx
import { useShift } from "@/context/ShiftContext";
import { Shift, User, Registration, ShiftType, positionStyles } from "@/types";
import { Button } from "@/components/ui/button";
import AddShiftForm from "./AddShiftForm";
import AddEmployeeToShift from "./AddEmployeeToShift";
import EmployeeManagementModal from "./EmployeeManagementModal";

// Ánh xạ màu nền và màu chữ cho các vị trí

interface ShiftItemProps {
  shift: Shift | undefined;
  user: User | null;
  isPastShift: boolean;
  date: string;
  shiftType: ShiftType;
}

const ShiftItem: React.FC<ShiftItemProps> = ({
  shift,
  user,
  isPastShift,
  date,
  shiftType,
}) => {
  const {
    handleFetchTasks,
    handleRegisterShift,
    employees,
    positions,
    fetchData,
    isPastWeek,
  } = useShift();

  const isRegistedInShift = (
    user_id: number,
    registrations: Registration[]
  ) => {
    return registrations.findIndex((item) => item.user_id === user_id) !== -1;
  };

  // const isCheckInAllowed = (
  //   shiftDate: string,
  //   shiftType: ShiftType
  // ): boolean => {
  //   const now = new Date();
  //   const [startHour, startMinute] = shiftType.start_time
  //     .split(":")
  //     .map(Number);
  //   const [endHour, endMinute] = shiftType.end_time.split(":").map(Number);

  //   const shiftStart = new Date(shiftDate);
  //   shiftStart.setHours(startHour, startMinute, 0, 0);

  //   const shiftEnd = new Date(shiftDate);
  //   shiftEnd.setHours(endHour, endMinute, 0, 0);

  //   const allowedStart = new Date(shiftStart);
  //   allowedStart.setMinutes(shiftStart.getMinutes() - 30);

  //   return now >= allowedStart && now < shiftEnd;
  // };

  if (!shift) {
    return (
      <div>
        {user?.role === "manage" || user?.role === "admin" ? (
          <AddShiftForm date={date} shiftType={shiftType} />
        ) : (
          <p className="text-muted-foreground text-xs sm:text-sm">
            Chưa có ca làm
          </p>
        )}
      </div>
    );
  }

  const registrations = shift.registrations || [];

  return (
    <div>
      {registrations.length > 0 ? (
        registrations.map((regular, index) => {
          const style = positionStyles[regular.position_name] || {
            background: "bg-gray-100",
            text: "text-gray-900",
          };

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-1 space-y-1 sm:space-y-0"
            >
              <div className="flex-1">
                <EmployeeManagementModal registration={regular}>
                  <p
                    onClick={() => handleFetchTasks(regular.id)}
                    className="text-xs sm:text-sm font-medium cursor-pointer"
                  >
                    <span
                      className={`${style.background} ${style.text} px-2 py-0.5 rounded-sm`}
                    >
                      {regular.employee_name} ({regular.position_name})
                    </span>
                  </p>
                </EmployeeManagementModal>
                <p className="text-xs text-muted-foreground">
                  {regular.status}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Chưa có nhân viên
          </p>
          <AddEmployeeToShift
            shiftId={shift.id}
            employees={employees}
            positions={positions}
            onSuccess={fetchData}
            userRole={user?.role || ""}
          />
        </div>
      )}
      {user?.role === "staff" &&
        !isRegistedInShift(user?.id, shift.registrations) &&
        !isPastShift &&
        !isPastWeek && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleRegisterShift(
                shift.id,
                user.id,
                employees.find((emp) => emp.id === user.id)?.position_id || 1,
                true,
                fetchData
              )
            }
            className="text-blue-600 border-blue-600 hover:bg-blue-50 text-xs sm:text-sm px-2 py-0.5 mt-1"
          >
            Đăng ký
          </Button>
        )}
      {(user?.role === "manage" || user?.role === "admin") &&
        registrations.length > 0 &&
        !isPastWeek && (
          <AddEmployeeToShift
            shiftId={shift.id}
            employees={employees}
            positions={positions}
            onSuccess={fetchData}
            userRole={user?.role || ""}
          />
        )}
    </div>
  );
};

export default ShiftItem;
