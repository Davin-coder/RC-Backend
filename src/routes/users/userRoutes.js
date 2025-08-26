import { Router } from "express";
import GetAllUsersController from "../../controllers/users/getAllUsersController.js";
import GetOneUserController from "../../controllers/users/getOneUserController.js"

const router = Router();

router.get("/", GetAllUsersController.getAllUser);
router.get("/:id", GetOneUserController.getOneUser);


export default router;