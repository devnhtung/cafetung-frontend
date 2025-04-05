// pages/dashboard/employee-evaluations.tsx
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "@/context/AuthContext";
import EmployeeEvaluations from "@/components/dashboard/EmployeeEvaluations";
import { fetchEmployees, fetchEmployeeEvaluations } from "@/actions/api";
import { Employee, Evaluation } from "@/types";

const EmployeeEvaluationsPage = () => {
  const { user } = useAuth();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchData = async () => {
    try {
      const evaluationsData = await fetchEmployeeEvaluations();
      setEvaluations(evaluationsData);
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user?.role === "manage") {
      fetchData();
    }
  }, [user]);

  if (!user || user.role !== "manage") {
    return <p>Bạn không có quyền truy cập trang này!</p>;
  }

  return (
    <EmployeeEvaluations
      evaluations={evaluations}
      employees={employees}
      fetchData={fetchData}
    />
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
      title: "Đánh giá nhân viên",
    },
  };
}

export default EmployeeEvaluationsPage;
