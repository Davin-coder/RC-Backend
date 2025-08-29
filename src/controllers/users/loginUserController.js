// src/controllers/users/loginUserController.js
import bcrypt from "bcrypt";
import findByEmail from "../../models/users/userModel.js";
import pool from "../../middleware/connection.js"; // 👈 Pool de pg

// Arma el nombre visible usando los campos de la tabla users
function buildDisplayName(u) {
  const parts = [
    u.first_name,
    u.middle_name,
    u.first_surname,
    u.second_surname,
  ].filter(Boolean);
  return parts.join(" ").trim();
}

// Obtiene el primer rol asignado al usuario (ajusta prioridad si quieres)
async function getUserRoleName(userId) {
  const q = `
    SELECT r.role_name
    FROM user_roles ur
    JOIN roles r ON r.id_role = ur.id_role
    WHERE ur.id_user = $1
    LIMIT 1
  `;
  const { rows } = await pool.query(q, [userId]);
  return rows[0]?.role_name || "coder";
}

const LoginUserController = async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password_user = String(req.body?.password_user || "");

    if (!email || !password_user) {
      return res.status(400).json({ ok: false, msg: "Email and password are required" });
    }

    // Debe devolver: id_user, email, password_user, first_name, middle_name, first_surname, second_surname
    const user = await findByEmail(email);
    if (!user) return res.status(404).json({ ok: false, msg: "User not found" });

    const ok = await bcrypt.compare(password_user, user.password_user);
    if (!ok) return res.status(401).json({ ok: false, msg: "Invalid credentials" });

    const name = buildDisplayName(user);
    const role = await getUserRoleName(user.id_user);

    // 🔑 Guarda en sesión lo que usará el front y /users/me
    req.session.user = {
      id: user.id_user,
      email: user.email,
      name,   // ← nombre completo
      role,   // ← "coder" | "team_leader" | "admin"
    };

    // Asegura persistencia de la sesión antes de responder
    req.session.save(err => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ ok: false, msg: "Session error" });
      }
      return res.json({
        ok: true,
        message: "Login successful",
        user: req.session.user, // { id, email, name, role }
      });
    });
  } catch (error) {
    console.error("LoginUser Error:", error);
    return res.status(500).json({ ok: false, msg: "Internal server error, try later" });
  }
};

export default LoginUserController;
