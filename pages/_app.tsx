import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const { initialUser, initialToken, ...otherProps } = pageProps;
  return (
    <AuthProvider initialUser={initialUser} initialToken={initialToken}>
      <Component {...otherProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}
