import AuthService from "../services/auth.service.js";
import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ success:false, error: "Unauthorized" });

  const token = auth.split(" ")[1];
  const payload = await AuthService.verifyToken(token);
  if (!payload) return res.status(401).json({ success:false, error: "Invalid token" });

  const user = await User.findById(payload.userId).select("-password");
  if (!user) return res.status(401).json({ success:false, error: "User not found" });

  req.user = user;
  next();
}
