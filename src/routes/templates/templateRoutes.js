// src/routes/templates/templateRoutes.js
import { Router } from "express";

import GetAllTemplateController from "../../controllers/templates/getAllTemplateController.js";
import GetOneTemplateController from "../../controllers/templates/getOneTemplateController.js";
import CreateTemplateController from "../../controllers/templates/createTemplateController.js";
import UpdateTemplateController from "../../controllers/templates/updateTemplateController.js";
import DeleteTemplateController from "../../controllers/templates/deleteTemplateController.js";

const router = Router();

// Get ALL Templates
router.get("/", GetAllTemplateController.getAll);

// Get Template by id
router.get("/:id", GetOneTemplateController.getOne);

// Create Template
router.post("/", CreateTemplateController.create);

// Update Template
router.put("/:id", UpdateTemplateController.update);

// Delete Template
router.delete("/:id", DeleteTemplateController.delete);

export default router;
