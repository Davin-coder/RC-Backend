import { Router } from "express";
import GetAllChallengesController from "../../controllers/challenges/getAllChallengesController.js";
import GetOneChallengeController from "../../controllers/challenges/getOneChallangeController.js";
import CreateChallengeController from "../../controllers/challenges/createChallengeController.js";
import UpdateChallengeController from "../../controllers/challenges/updateChallengeController.js";
import DeleteChallengeController from "../../controllers/challenges/deleteChallengeController.js";

const router = Router();

// Get All Challenges from the database
router.get("/", GetAllChallengesController.getAll);

// Get Challenge by id
router.get("/:id", GetOneChallengeController.getOne);

// Create a new Challenge
router.post("/", CreateChallengeController.create);

// Update a Challenge from the database
router.put("/:id", UpdateChallengeController.update);

// Delete a Challenge from the database
router.delete("/:id", DeleteChallengeController.delete);

export default router;