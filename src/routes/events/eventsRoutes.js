import { Router } from "express";
import GetAllEventsController from "../../controllers/events/getAllEventsController.js";
import GetOneEventController from "../../controllers/events/getOneEventController.js";
import CreateEventController from "../../controllers/events/createEventController.js";
import UpdateEventController from "../../controllers/events/updateEventController.js";
import DeleteEventController from "../../controllers/events/deleteEventController.js";

const router = Router();

// Get All Events from the database
router.get("/", GetAllEventsController.getAllEvents);

// Get Event by id
router.get("/:id", GetOneEventController.getOneEvent);

// Create a new Event
router.post("/", CreateEventController.create);

// Update a Event from the database
router.put("/:id", UpdateEventController.update);

// Delete a Event from the database
router.delete("/:id", DeleteEventController.delete)

export default router;