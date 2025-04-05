// pages/dashboard/shift-tasks.tsx
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "@/context/AuthContext";
import ShiftTasks from "@/components/dashboard/ShiftTasks";
import { fetchPendingRegistrations, fetchTasks } from "@/actions/api";
import { Registration, Task } from "@/types";

const ShiftTasksPage = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    try {
      const registrationsData = await fetchPendingRegistrations();
      setRegistrations(registrationsData);
      const tasksData = await fetchTasks();
      setTasks(tasksData);
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
    <ShiftTasks
      registrations={registrations}
      tasks={tasks}
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
      title: "Quản lý công việc ca làm",
    },
  };
}

export default ShiftTasksPage;
