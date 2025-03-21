// pages/api/auth/facebook.js
import axios from "axios";

export default async function handler(req, res) {
  //   const baseApiURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    // Gọi API backend để lấy URL OAuth của Facebook
    const backendResponse = await axios.get("api/auth/facebook");
    // console.log(backendResponse);
    res.status(200).json({ redirectUrl: backendResponse.data.redirectUrl });
  } catch (error) {
    console.error("Error fetching Facebook auth URL:", error);
    res.status(500).json({ error: "Failed to initiate Facebook login" });
  }
}
