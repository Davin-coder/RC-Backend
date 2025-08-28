import updateHackathon from "../../models/hackathons/updateHackathonModels.js";

const UpdateHackathonController = {
    async update(req, res) {
        try{
            const  id_hackathon  = req.params.id;
            const { h_title, h_desc, h_date, h_status, created_by } = req.body;
            if(!h_title || typeof h_title !== "string"){
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "Hackathon title is required and must be string",
                });
            }
            const updatedHackathon = await updateHackathon(id_hackathon, { h_title, h_desc, h_date, h_status, created_by });
            if(!updatedHackathon){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Hackathon not found"
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Hackathon updated successful",
                hackathon: updatedHackathon,
            });
        }catch(error){
            console.error("UpdateHackathon Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default UpdateHackathonController;