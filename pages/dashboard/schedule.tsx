// pages/dashboard/schedule.tsx
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "@/context/AuthContext";
import ScheduleRouter from "@/components/dashboard/ScheduleRouter";
import { ShiftProvider } from "@/context/ShiftContext";

const SchedulePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <ShiftProvider>
      <ScheduleRouter />
    </ShiftProvider>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const userCookie = await getCookie("user", { req, res });
  const user = userCookie ? JSON.parse(userCookie as string) : null;
  const tokenCookie = await getCookie("auth_token", { req, res });
  const token = tokenCookie ? tokenCookie : null;

  return {
    props: {
      initialUser: user,
      initialToken: token,
      title: "Lịch làm việc",
    },
  };
}

export default SchedulePage;
