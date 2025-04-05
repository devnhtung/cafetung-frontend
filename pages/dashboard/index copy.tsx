import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import WorkSchedule from "@/components/dashboard/ManagerSchedule";
export default function DashboardPage() {
  return <WorkSchedule />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const userCookie = await getCookie("user", { req, res });
  const user = userCookie ? JSON.parse(userCookie) : null;
  const tokenCookie = await getCookie("auth_token", { req, res });
  const token = userCookie ? tokenCookie : null;

  return {
    props: {
      initialUser: user,
      initialToken: token,
      title: "Lịch làm",
    },
  };
}
