// pages/api/auth/callback.js
export default async function handler(req, res) {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "Missing user data" });
  }
  try {
    const userData = JSON.parse(user);
    // Lưu thông tin người dùng vào cookie
    const cleanUserData = {
      id: userData.id || null,
      name: userData.name || "Unknown",
      email: userData.email || null,
      avatar: userData.avatar || null,
    };
    const encodedUserData = encodeURIComponent(JSON.stringify(cleanUserData));
    const token = userData.token;
    if (!token) {
      throw new Error("Missing auth token from backend");
    }
    // Thiết lập cookie
    res.setHeader("Set-Cookie", [
      `user=${encodedUserData}; Path=/; HttpOnly; SameSite=Lax`,
      `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax`,
    ]);
    res.writeHead(302, { Location: "/?login=true" }).end();
  } catch (error) {
    console.error("Error processing callback:", error);
    res.status(500).json({ error: "Failed to process callback" });
  }
}
