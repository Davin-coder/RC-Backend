import updateChallenge from "../../models/challenges/updateChallengeModels.js";

const UpdateChallengeController = {
    async update(req, res) {
        try{
            const  id_challenge  = req.params.id;
            const { title, challenge_desc, difficulty } = req.body;
            if(!title || typeof title !== "string"){
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "Challenge title is required and must be string",
                });
            }
            const updatedChallenge = await updateChallenge(id_challenge, { title, challenge_desc, difficulty });
            if(!updatedChallenge){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Challenge not found"
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Challenge updated successful",
                challenge: updatedChallenge,
            });
        }catch(error){
            console.error("UpdateChallenge Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default UpdateChallengeController;