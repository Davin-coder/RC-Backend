import { Router } from "express";

const router = Router();

router.get("/", GetAllUsersController.getAllUser);
router.get("/:id", GetOneUserController.getOneUser);


export default router;