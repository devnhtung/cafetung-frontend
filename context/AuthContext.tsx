// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { deleteCookie, setCookie } from "cookies-next";
import axios from "axios";
import API from "@/utils/api";
import { logout, login } from "@/lib/api";
import { User } from "@/types";
interface AuthContextType {
  user: User | null;
  isStaff: boolean;
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  handleLogout: () => void;
  handleLogin: (email: string, password: string) => void;
}
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser,
  initialToken,
}: {
  children: ReactNode;
  initialUser: User | null;
  initialToken: string | null;
}) => {
  const [user, setUser] = useState(initialUser || null);
  const [token, setToken] = useState(initialToken || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isStaff = user?.role === "staff";
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          if (router.query.logout) {
            router.replace("/", undefined, { shallow: true });
            toast.success("Đăng xuất thành công!", {
              position: "top-right",
              autoClose: 3000,
            });
          }
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }

        try {
          API.defaults.headers.Authorization = `Bearer ${token}`;
          await API.get("/user").then((res) => {
            setUser(res.data.user);
            setIsAuthenticated(true);
            if (router.query.login) {
              router.replace("/", undefined, { shallow: true });
              toast.success("Đăng nhập thành công!", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          });
        } catch (error) {
          setUser(null);
          setIsAuthenticated(false);
          deleteCookie("user");
          deleteCookie("auth_token");
          axios.get("/api/auth/clear-cookies");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
        setIsAuthenticated(false);
        axios.get("/api/auth/clear-cookies");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  const handleLogin = async (email: string, password: string) => {
    // await axios.get("sanctum/csrf-cookie");
    const response = await login({ email, password });
    const authToken = response.data.token;
    const authUser = response.data.user;
    setCookie("auth_token", authToken);
    setCookie("user", authUser);

    API.defaults.headers.Authorization = `Bearer ${authToken}`;
    setToken(authToken);
    setUser(response.data.user);
    toast.success("Đăng nhập thành công!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleLogout = async () => {
    try {
      if (token) {
        router.push("/");
        await logout(token);
        toast.success("Đăng xuất thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
        // await axios.get("/api/auth/logout");
        await axios.get("/api/auth/clear-cookies");
        setUser(null);
        setIsAuthenticated(false);
        deleteCookie("user");
        deleteCookie("XSRF-TOKEN");
        deleteCookie("cafe_tung_session");
        deleteCookie("auth_token");
        console.log("Đăng xuất thành công!");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isStaff,
        setToken,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        handleLogout,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
