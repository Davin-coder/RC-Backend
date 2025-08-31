// src/routes/projects/projectsRoutes.js
import { Router } from "express";

import GetAllProjectController from "../../controllers/projects/getAllProjectController.js";
import GetOneProjectController from "../../controllers/projects/getOneProjectController.js";
import CreateProjectController from "../../controllers/projects/createProjectController.js";
import UpdateProjectController from "../../controllers/projects/updateProjectController.js"; 
import DeleteProjectController from "../../controllers/projects/deleteProjectController.js";

const router = Router();

// Get All Projects
router.get("/", GetAllProjectController.getAll);

// Get Project by id
router.get("/:id", GetOneProjectController.getOne);

// Create Project
router.post("/", CreateProjectController.create);

// Update Project
router.put("/:id", UpdateProjectController.update);

// Delete Project
router.delete("/:id", DeleteProjectController.delete);

export default router;
