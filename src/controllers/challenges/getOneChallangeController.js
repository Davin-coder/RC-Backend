import getOneChallenge from "../../models/challenges/getOneChallengeModels.js";

const GetOneChallengeController = {
    async getOne(req, res) {
        try{
            const id_challenge = req.params.id;
            const challenge = await getOneChallenge(id_challenge);
            if(!challenge){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Challenge not found"
                });
            }
            res.status(200).json({  
                success: true,
                msg: "Challenge retrieved successfully", 
                challenge
            });
        }catch(error){
            console.error('GetChallenge Error:', error);
            throw new Error('Database query failed: ' + error.message);
        }
    }
};

export default GetOneChallengeController;