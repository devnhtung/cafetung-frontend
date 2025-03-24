// pages/api/auth/clear-cookies.ts
import { setCookie, deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  try {
    deleteCookie("user");
    deleteCookie("auth_token");
    // Xóa cookie bằng cách đặt thời gian hết hạn trong quá khứ
    setCookie("user", "", {
      req,
      res,
      path: "/",
      httpOnly: true, // Phải khớp với lúc thiết lập
      sameSite: "strict",
      expires: new Date(0), // Thời gian hết hạn trong quá khứ
    });

    setCookie("auth_token", "", {
      req,
      res,
      path: "/",
      httpOnly: true, // Phải khớp với lúc thiết lập
      sameSite: "strict",
      expires: new Date(0), // Thời gian hết hạn trong quá khứ
    });

    res.status(200).json({ message: "Cookies cleared successfully" });
  } catch (error) {
    console.error("Error clearing cookies:", error);
    res.status(500).json({ error: "Failed to clear cookies" });
  }
}
