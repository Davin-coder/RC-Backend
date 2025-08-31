// src/controllers/users/loginUserController.js
import bcrypt from "bcrypt";
import buildDisplayName from "../../utils/users/displayName.js";
import { findByEmail, getClanNameByUserId, getRoleNameByUserId } from "../../models/users/userModel.js";

const LoginUserController = async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim();
    const password_user = String(req.body?.password_user || "");
    
    if (!email || !password_user) {
      return res.status(400).json({ ok: false, msg: "Email and password are required" });
    }
    const user = await findByEmail(email);
    if (!user) return res.status(404).json({ ok: false, msg: "User not found" });

    const ok = await bcrypt.compare(password_user, user.password_user);
    if (!ok) return res.status(401).json({ ok: false, msg: "Invalid credentials" });

    const name = buildDisplayName(user),
      id_clan = await getClanNameByUserId(user.id_user),
      role = await getRoleNameByUserId(user.id_user);
    // 🔑 Guarda en sesión lo que usará el front y /users/me
    req.session.user = {
      id: user.id_user,
      email: user.email,
      name,
      role,
      id_clan
    };
    req.session.save(error => {
      if (error) {
        console.error("Session save error:", error.message);
        return res.status(500).json({ ok: false, msg: "Session error" });
      }
      return res.json({
        ok: true,
        message: "Login successful",
        user: req.session.user,
      });
    });
  } catch (error) {
    console.error("LoginUser Error:", error.message);
    return res.status(500).json({ ok: false, msg: "Internal server error, try later" });
  }
};

export default LoginUserController;