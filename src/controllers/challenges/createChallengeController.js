import createChallenge from "../../models/challenges/createChallengeModels.js";

const CreateChallengeController = {
    async create(req, res) {
        try {
            const { title, challenge_desc, difficulty } = req.body;
            if (!title || typeof title !== "string") {
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "Challenge title is required and must be string",
                });
            }
            const challenge = await createChallenge({ title, challenge_desc, difficulty });
            return res.status(201).json({
                success: true,
                msg: "Challenge created successful",
                challenge,
            });
        }catch(error){
            console.error("CreateChallenge Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    }
};

export default CreateChallengeController;