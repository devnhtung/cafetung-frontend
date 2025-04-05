// components/Sidebar.tsx
import { useRef } from "react";
import { FaAlignLeft, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
interface SidebarProps {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isSidebarVisible, toggleSidebar }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, handleLogout } = useAuth();
  const base_storage_url = process.env.NEXT_PUBLIC_STORAGE_URL;
  if (!user) return null;

  // // đóng menu khi click chuột ra ngoài sidebar
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       sidebarRef.current &&
  //       !sidebarRef.current.contains(event.target as Node)
  //     ) {
  //       toggleSidebar();
  //     }
  //   };

  //   if (isSidebarVisible) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isSidebarVisible, toggleSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={`w-64 bg-primary text-white transform transition-all duration-300 fixed h-full z-100 ${
        isSidebarVisible ? "translate-x-0" : "-translate-x-full"
      } `}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            onClick={() => router.push("/")}
            width={8}
            height={8}
            src={`${base_storage_url}/logo.svg`}
            alt="Logo Café Tùng"
            className="w-6 h-6 md:w-8 md:h-8 -ml-0.5 object-contain"
          />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        {/* Nút toggle sidebar (chỉ hiển thị trên mobile) */}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-primary-dark rounded cursor-pointer"
        >
          {isSidebarVisible ? (
            <FaArrowLeft className="w-5 h-5" />
          ) : (
            <FaAlignLeft className="w-5 h-5" />
          )}
        </button>
      </div>
      <nav className="mt-2">
        {[
          // { name: "Shift Approvals", path: "/dashboard/shift-approvals" },
          // {
          //   name: "Employee Evaluations",
          //   path: "/dashboard/employee-evaluations",
          // },
          {
            name: "Nhân viên",
            path: "/dashboard/employees",
            roles: ["manage", "admin"],
          },
          {
            name: "Lịch làm việc",
            path: "/dashboard/schedule",
            roles: ["manage", "admin", "staff"],
          },
          // { name: "Shift Tasks", path: "/dashboard/shift-tasks" },
        ].map(
          (item) =>
            item.roles.some((r) => r === user.role) && (
              <Link
                key={item.name}
                href={item.path}
                className={`block py-2 px-4 hover:bg-primary-dark text-sm ${
                  router.pathname === item.path ? "bg-primary-dark" : ""
                }`}
              >
                {item.name}
              </Link>
            )
        )}
        <button
          onClick={() => handleLogout()}
          className="cursor-pointer block py-2 px-4 hover:bg-primary-dark text-sm w-full text-left"
        >
          Đăng xuất
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
