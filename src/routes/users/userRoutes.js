import { Router } from "express";
import GetAllUsersController from "../../controllers/users/getAllUsersController.js";
import GetOneUserController from "../../controllers/users/getOneUserController.js";
import CreateUserController from "../../controllers/users/createUserController.js";
import UpdateUserController from "../../controllers/users/updateUserController.js";
import DeleteUserController from "../../controllers/users/deleteUserController.js";
import LoginUserController from "../../controllers/users/loginUserController.js";
import LogoutUserController from "../../controllers/users/logoutUserController.js";

const router = Router();

// Get All Users from the database
router.get("/", GetAllUsersController.getAllUser);

// Get User by id
router.get("/:id", GetOneUserController.getOneUser);

// Create a new User
router.post("/", CreateUserController.create);

// Update a User from the database
router.put("/:id", UpdateUserController.update);

// Delete a User from the database
router.delete("/:id", DeleteUserController.delete);

// Login for users
router.post("/login", LoginUserController);

// Logout for users
router.post("/logout", LogoutUserController);

export default router;