// pages/dashboard/shift-approvals.tsx
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "@/context/AuthContext";
import ShiftApprovals from "@/components/dashboard/ShiftApprovals";
import { fetchPendingRegistrations } from "@/actions/api";
import { Registration } from "@/types";

const ShiftApprovalsPage = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const fetchData = async () => {
    try {
      const data = await fetchPendingRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching pending registrations:", error);
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

  return <ShiftApprovals registrations={registrations} fetchData={fetchData} />;
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
      title: "Duyệt ca",
    },
  };
}

export default ShiftApprovalsPage;
