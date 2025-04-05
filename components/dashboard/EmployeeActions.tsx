// components/dashboard/EmployeeActions.tsx
import { Registration } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaTasks } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmployeeActionsProps {
  registration: Registration;
  isPastShift: boolean;
  canCheckIn: boolean;
  handleCheckIn: (id: number, onSuccess: () => void) => void;
  handleCheckOut: (id: number, onSuccess: () => void) => void;
  handleFetchTasks: (id: number) => void;
  fetchData: () => void;
  children: React.ReactNode; // Để truyền tên nhân viên làm trigger
}

const EmployeeActions: React.FC<EmployeeActionsProps> = ({
  registration,
  isPastShift,
  canCheckIn,
  handleCheckIn,
  handleCheckOut,
  handleFetchTasks,
  fetchData,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="flex space-x-2">
          {!registration.check_in_time && !isPastShift && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <FaArrowRightFromBracket
                      onClick={() => {
                        if (canCheckIn)
                          handleCheckIn(registration.id, fetchData);
                      }}
                      className={`text-green-600 border-green-600 hover:bg-green-50 w-5 h-5 ${
                        !canCheckIn ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </span>
                </TooltipTrigger>
                {!canCheckIn && (
                  <TooltipContent>
                    <p className="text-xs">
                      Chỉ được chấm công vào từ 30 phút trước ca đến trước khi
                      ca kết thúc.
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          )}
          {registration.check_in_time &&
            !registration.check_out_time &&
            !isPastShift && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCheckOut(registration.id, fetchData)}
                className="text-red-600 border-red-600 hover:bg-red-50 text-xs px-2 py-0.5"
              >
                Ra
              </Button>
            )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <FaTasks
                  onClick={() => handleFetchTasks(registration.id)}
                  className="w-5 h-5"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Xem công việc</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmployeeActions;
