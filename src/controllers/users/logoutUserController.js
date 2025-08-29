// src/controllers/users/logoutUserController.js
const LogoutUserController = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout Error:", error.message);
      return res.status(500).json({
        ok: false,
        error: true,
        msg: "Error logging out, try again later",
      });
    }

    // limpiar cookie en el cliente
    res.clearCookie("connect.sid");

    return res.status(200).json({
      ok: true,
      msg: "Logout successful",
    });
  });
};

export default LogoutUserController;
