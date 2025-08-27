import { Router } from "express";
import GetAllUsersController from "../../controllers/users/getAllUsersController.js";
import GetOneUserController from "../../controllers/users/getOneUserController.js";
import CreateUserController from "../../controllers/users/createUserController.js";
import UpdateUserController from "../../controllers/users/updateUserController.js";
import DeleteUserController from "../../controllers/users/deleteUserController.js";

const router = Router();

router.get("/", GetAllUsersController.getAllUser);
router.get("/:id", GetOneUserController.getOneUser);
router.post("/", CreateUserController.create);
router.put("/:id", UpdateUserController.update);
router.delete("/:id", DeleteUserController.delete);

export default router;