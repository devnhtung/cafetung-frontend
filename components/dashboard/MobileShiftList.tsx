// components/dashboard/MobileShiftList.tsx
import { Shift, User, ShiftType } from "@/types";
import ShiftItem from "./ShiftItem";

interface MobileShiftListProps {
  dates: string[];
  shiftTypes: ShiftType[];
  filteredShifts: Shift[];
  user: User | null;
}

const MobileShiftList: React.FC<MobileShiftListProps> = ({
  dates,
  shiftTypes,
  filteredShifts,
  user,
}) => {
  return (
    <div className="block sm:hidden space-y-4">
      {dates.map((date) => (
        <div key={date} className="border rounded-lg p-3">
          <h3 className="text-sm font-semibold text-primary mb-2">
            {new Date(date).toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
            })}
          </h3>
          <div className="space-y-2">
            {shiftTypes.map((shiftType) => {
              const shift = filteredShifts.find(
                (s) => s.date === date && s.shiftType.name === shiftType.name
              );
              const isPastShift = new Date(date) < new Date();
              return (
                <div key={`${date}-${shiftType.id}`} className="border-t pt-2">
                  <h4
                    className={`text-xs font-medium ${
                      shiftType.name === "Sáng"
                        ? "text-green-700"
                        : shiftType.name === "Chiều"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }`}
                  >
                    Ca {shiftType.name}
                  </h4>
                  <ShiftItem
                    shift={shift}
                    user={user}
                    isPastShift={isPastShift}
                    date={date}
                    shiftType={shiftType}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileShiftList;
