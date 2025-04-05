// pages/api/auth/check.js
import { getCookie } from "cookies-next";
import axios from "axios";

export default async function handler(req, res) {
  const token = getCookie("auth_token", { req, res });
  const baseApiURL = process.env.NEXT_PUBLIC_API_URL;
  res.status(200).json(token);
  if (!token) {
    return res.status(401).json({ user: null });
  }
  try {
    const response = await axios.get(baseApiURL + "/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json(response);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error checking token:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
