// src/routes/events/eventRegistrationsRoutes.js
import { Router } from "express";
import GetRegistrationsController from "../../controllers/registrations/getRegistrationsController.js";
import CreateRegistrationController from "../../controllers/registrations/createRegistrationController.js";
import DeleteMyRegistrationController from "../../controllers/registrations/deleteRegistrationController.js";

const router = Router({ mergeParams: true });

// Get registrations from an event
router.get("/:id/registrations", GetRegistrationsController.list);

// Create a new registration for a event
router.post("/:id/registrations", CreateRegistrationController.create);

// Delete a registration from an event
router.delete("/:id/registrations/me", DeleteMyRegistrationController.delete);

export default router;