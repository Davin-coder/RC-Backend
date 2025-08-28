import { Router } from "express";
import GetAllHackathonsController from "../../controllers/hackathons/getAllHackathonsController.js";
import GetOneHackathonController from "../../controllers/hackathons/getOneHackathonController.js";
import CreateHackathonController from "../../controllers/hackathons/createHackathonController.js";
import UpdateHackathonController from "../../controllers/hackathons/updateHackathonController.js";
import DeleteHackathonController from "../../controllers/hackathons/deleteHackathonController.js";

const router = Router();

// Get All Hackathons from the database
router.get("/", GetAllHackathonsController.getAll);

// Get Hackathon by id
router.get("/:id", GetOneHackathonController.getOne);

// Create a new Hackathon
router.post("/", CreateHackathonController.create);

// Update a Hackathon from the database
router.put("/:id", UpdateHackathonController.update);

// Delete a Hackathon from the database
router.delete("/:id", DeleteHackathonController.delete);

export default router;