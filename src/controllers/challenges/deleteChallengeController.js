import deleteChallenge from "../../models/challenges/deleteChallengeModels.js";

const DeleteChallengeController = {
    async delete(req, res) {
        const id_challenge = req.params.id;
        try{
            const deletedChallenge = await deleteChallenge(id_challenge);
            if (!deletedChallenge){
                return res.status(404).json({
                    success: false,
                    msg: "Challenge not found",
                });
            }
            res.status(200).json({
                success: true,
                msg: "Challenge deleted successfully",
                challenge: deletedChallenge,
            });
        }catch(error){
            console.error("DeleteChallenge Error:", error.message);
            res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default DeleteChallengeController;