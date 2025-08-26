import { Router } from "express";
import GetAllGroupsController from "../../controllers/groups/getAllGroupsController.js";
import GetOneGroupController from "../../controllers/groups/getOneGroupController.js";
import CreateGroupController from "../../controllers/groups/createGroupController.js";
import UpdateGroupController from "../../controllers/groups/updateGroupController.js";
import DeleteGroupController from "../../controllers/groups/deleteGroupController.js";

const router = Router();

// Get All groups from the database
router.get("/", GetAllGroupsController.getAllGroups);

// Get group by id
router.get("/:id", GetOneGroupController.getOneGroup);

// Create a new group
router.post("/", CreateGroupController.create);

// Update a group from the database
router.put("/:id", UpdateGroupController.update);

// Delete a group from the database
router.delete("/:id", DeleteGroupController.delete)

export default router;