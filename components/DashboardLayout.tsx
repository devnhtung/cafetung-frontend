// components/Layout.tsx
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

interface LayoutProps {
  children: React.ReactNode;
  title: string | null;
}

const Layout = ({ children, title }: LayoutProps) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen overflow-y-hidden bg-gray-100 font-sans">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarVisible ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} title={title} />
        <main
          id="main-content"
          className="flex-1 py-2 md:p-6 flex overflow-y-auto flex-col transition-all duration-300 w-full max-h-[100vh-300px]"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
