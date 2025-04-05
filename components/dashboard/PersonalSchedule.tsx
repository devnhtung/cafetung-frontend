// components/dashboard/PersonalSchedule.tsx
import { useMemo } from "react";
import ShiftItem from "./ShiftItem";
import MobileShiftList from "./MobileShiftList";
import TaskListModal from "./TaskListModal";
import { formatDate, getWeekNumber } from "@/lib/utils";
import { useShift } from "@/context/ShiftContext";
import { useAuth } from "@/context/AuthContext";

const PersonalSchedule: React.FC = () => {
  const {
    shifts,
    startDate,
    endDate,
    handleNextWeek,
    handlePreviousWeek,
    tasks,
    shiftTypes,
    setIsPastWeek,
    isTasksModalOpen,
    setIsTasksModalOpen,
  } = useShift();

  const { user } = useAuth();

  const dates: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split("T")[0]);
  }

  // Lọc các ca làm của nhân viên hiện tại
  const filteredShifts = useMemo(() => {
    if (!user || !shifts.length) return [];

    return shifts
      .map((shift) => ({
        ...shift,
        registrations: shift.registrations.filter(
          (reg) => reg.user_id === user.id
        ),
      }))
      .filter((shift) => shift.registrations.length > 0); // Chỉ giữ lại shift có registrations phù hợp
  }, [shifts, user]);
  setIsPastWeek(getWeekNumber(new Date(start)) <= getWeekNumber(new Date()));

  return (
    <div className="p-4 sm:p-5 bg-white rounded-lg shadow">
      {/* Header: Nút điều hướng */}
      <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4 sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousWeek}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm sm:text-base"
          >
            Tuần trước
          </button>
          <button
            onClick={handleNextWeek}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm sm:text-base"
          >
            Tuần sau
          </button>
        </div>
        <div className="text-base sm:text-lg font-semibold text-primary text-center sm:text-left">
          Tuần {getWeekNumber(new Date(startDate))} ({formatDate(startDate)} -{" "}
          {formatDate(endDate)})
        </div>
      </div>

      {/* Giao diện danh sách cho mobile */}
      <MobileShiftList
        dates={dates}
        shiftTypes={shiftTypes}
        filteredShifts={filteredShifts}
        user={user}
      />

      {/* Giao diện bảng cho desktop */}
      <div className="hidden sm:block overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-1 sm:p-2 text-xs sm:text-sm text-primary border sticky top-0 left-0 bg-gray-50 z-20">
                Ca
              </th>
              {dates.map((date) => (
                <th
                  key={date}
                  className="p-2 sm:p-3 text-xs sm:text-sm text-primary border sticky top-0 bg-gray-50 z-10"
                  aria-label={`Ngày ${new Date(date).toLocaleDateString(
                    "vi-VN"
                  )}`}
                >
                  {new Date(date).toLocaleDateString("vi-VN", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shiftTypes.map((shiftType) => (
              <tr key={shiftType.id} className="border-t">
                <td className="p-2 sm:p-3 text-xs sm:text-sm text-primary border font-medium sticky left-0 bg-white z-10">
                  {shiftType.name}
                </td>
                {dates.map((date) => {
                  const shift = filteredShifts.find(
                    (s) =>
                      s.date === date && s.shiftType.name === shiftType.name
                  );
                  const isPastShift = new Date(date) < new Date();
                  return (
                    <td
                      key={`${date}-${shiftType.id}`}
                      className={`${
                        shift?.registrations && "bg-amber-100"
                      } p-1 sm:p-2 text-xs sm:text-sm text-primary border`}
                    >
                      <ShiftItem
                        shift={shift}
                        user={user}
                        isPastShift={isPastShift}
                        date={date}
                        shiftType={shiftType}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal danh sách công việc */}
      <TaskListModal
        tasks={tasks}
        isOpen={isTasksModalOpen}
        onClose={() => setIsTasksModalOpen(false)}
      />
    </div>
  );
};

export default PersonalSchedule;
