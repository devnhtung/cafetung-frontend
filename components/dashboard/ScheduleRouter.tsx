// components/dashboard/ScheduleRouter.tsx
import PersonalSchedule from "./PersonalSchedule";
import ManagerSchedule from "./ManagerSchedule";
import { useAuth } from "@/context/AuthContext";
const ScheduleRouter: React.FC = () => {
  const { user } = useAuth();
  if (user?.role === "manage" || user?.role === "admin") {
    return <ManagerSchedule />;
  }
  return <PersonalSchedule />;
};

export default ScheduleRouter;
