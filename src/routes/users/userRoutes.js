// src/routes/users/userRoutes.js
import { Router } from "express";
import GetAllUsersController from "../../controllers/users/getAllUsersController.js";
import GetOneUserController from "../../controllers/users/getOneUserController.js";
import CreateUserController from "../../controllers/users/createUserController.js";
import UpdateUserController from "../../controllers/users/updateUserController.js";
import DeleteUserController from "../../controllers/users/deleteUserController.js";
import LoginUserController from "../../controllers/users/loginUserController.js";
import LogoutUserController from "../../controllers/users/logoutUserController.js";

const router = Router();

router.get("/me", (req, res) => {
  if (!req.session?.user) return res.status(401).json({ ok: false, msg: "No auth" });
  // Devuelve solo lo necesario (incluye role para el guard del front)
  return res.json({ ok: true, ...req.session.user });
});

// Get All Users
router.get("/", GetAllUsersController.getAllUser);

// Get User by id
router.get("/:id", GetOneUserController.getOneUser);

// Create a new User
router.post("/", CreateUserController.create);

// Update a User
router.put("/:id", UpdateUserController.update);

// Delete a User
router.delete("/:id", DeleteUserController.delete);

// Login
router.post("/login", LoginUserController);

// Logout
router.post("/logout", LogoutUserController);

export default router;
