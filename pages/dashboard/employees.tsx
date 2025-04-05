// pages/dashboard/employees.tsx
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "@/context/AuthContext";
import { EmployeeProvider } from "@/context/EmployeeContext";
import Employees from "@/components/dashboard/Employees";

const EmployeesPage = () => {
  const { user } = useAuth();

  if (!user || (user.role !== "manage" && user.role !== "admin")) {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <EmployeeProvider>
      <Employees />
    </EmployeeProvider>
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
      title: "Quản lý nhân viên",
    },
  };
}

export default EmployeesPage;
