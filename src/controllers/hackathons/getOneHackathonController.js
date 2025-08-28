import getOneHackathon from "../../models/hackathons/getOneHackathonModels.js";

const GetOneHackathonController = {
    async getOne(req, res) {
        try{
            const id_hackathon = req.params.id;
            const hackathon = await getOneHackathon(id_hackathon);
            if(!hackathon){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Hackathon not found"
                });
            }
            res.status(200).json({  
                success: true,
                msg: "Hackathon retrieved successfully", 
                hackathon
            });
        }catch(error){
            console.error('GetHackathon Error:', error);
            throw new Error('Database query failed: ' + error.message);
        }
    }
};

export default GetOneHackathonController;