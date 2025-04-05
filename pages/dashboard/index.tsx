// pages/dashboard/index.tsx
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-5 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Chào mừng, {user.name}!
      </h1>
      <p>Đây là trang tổng quan của bạn.</p>
      {user.role === "manage" ? (
        <div className="mt-4">
          <p>Quản lý có thể:</p>
          <ul className="list-disc list-inside">
            <li>Duyệt ca làm</li>
            <li>Quản lý công việc ca làm</li>
            <li>Đánh giá nhân viên</li>
            <li>Xem thông tin nhân viên</li>
          </ul>
        </div>
      ) : (
        <div className="mt-4">
          <p>Nhân viên có thể:</p>
          <ul className="list-disc list-inside">
            <li>Xem lịch làm việc</li>
            <li>Đăng ký ca làm</li>
            <li>Chấm công</li>
            <li>Xem công việc cần làm</li>
          </ul>
        </div>
      )}
    </div>
  );
}

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
      title: "Dashboard", // Điều chỉnh tiêu đề cho phù hợp
    },
  };
}
