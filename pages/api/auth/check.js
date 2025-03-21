// pages/api/auth/check.js
import axios from "axios";

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const response = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error checking token:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
