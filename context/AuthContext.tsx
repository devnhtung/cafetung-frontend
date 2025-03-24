// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { deleteCookie } from "cookies-next";
import axios from "axios";
import API from "@/utils/api";
import { logout } from "@/lib/api";
import { User } from "@/types";
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  handleLogout: () => void;
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
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
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

  const handleLogout = async () => {
    try {
      if (token) {
        await logout(token).then(() => {
          setUser(null);
          setIsAuthenticated(false);
          deleteCookie("user");
          deleteCookie("auth_token");
          axios.get("/api/auth/clear-cookies");
          // window.location.reload();
        });

        console.log("Đăng xuất thành công!");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setUser(null);
      setIsAuthenticated(false);
      // window.location.reload();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        handleLogout,
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
