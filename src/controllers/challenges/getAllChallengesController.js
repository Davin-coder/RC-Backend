import getAllChallenges from "../../models/challenges/getAllChallengesModels.js";

const GetAllChallengesController = {
    async getAll(req, res) {
        try {
            const challenge = await getAllChallenges();
            res.status(200).json({ 
                success: true,
                msg: "Challenge retrieved successfully",
                challenge
            });
        }catch(error){
            console.error('GetAllChallenge Error:', error);
            res.status(500).json({ 
                success: false,
                error: true, 
                msg: "Internal server error, try later" 
            });
        }
    }
};

export default GetAllChallengesController;