import getAllHackathons from "../../models/hackathons/getAllHackathonsModels.js";

const GetAllHackathonsController = {
    async getAll(req, res) {
        try {
            const hackathons = await getAllHackathons();
            res.status(200).json({ 
                success: true,
                msg: "Hackathons retrieved successfully",
                hackathons
            });
        }catch(error){
            console.error('GetAllHackathons Error:', error);
            res.status(500).json({ 
                success: false,
                error: true, 
                msg: "Internal server error, try later" 
            });
        }
    }
};

export default GetAllHackathonsController;