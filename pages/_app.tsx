//pages/_app.tsx
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "@/components/DashboardLayout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { initialUser, initialToken, title, ...otherProps } = pageProps;
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard");
  useEffect(() => {
    const checkAuthorization = async () => {
      if (!isDashboard) return;

      if (
        !initialToken ||
        (initialUser?.role !== "staff" &&
          initialUser?.role !== "manage" &&
          initialUser?.role !== "admin")
      ) {
        toast.warn("Bạn không có quyền vào trang này!", {
          position: "top-right",
          autoClose: 2000,
        });
        await router.push("/"); // Assuming router.push returns a Promise
      }
    };
    // Call the async functiongout
    checkAuthorization();
  }, [isDashboard, initialToken, initialUser, router]);

  return (
    <AuthProvider initialUser={initialUser} initialToken={initialToken}>
      {isDashboard && initialToken ? (
        <DashboardLayout title={title}>
          <Component {...otherProps} />
        </DashboardLayout>
      ) : (
        <Component {...otherProps} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}
