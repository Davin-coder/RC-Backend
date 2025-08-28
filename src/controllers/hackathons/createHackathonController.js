import createHackathon from "../../models/hackathons/createHackathonModels.js";

const CreateHackathonController = {
    async create(req, res) {
        try {
            const { h_title, h_desc, h_date, created_by } = req.body;
            if (!h_title || typeof h_title !== "string") {
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "Hackathon name is required and must be string",
                });
            }
            const hackathon = await createHackathon({ h_title, h_desc, h_date, created_by });
            return res.status(201).json({
                success: true,
                msg: "Hackathon created successful",
                hackathon,
            });
        }catch(error){
            console.error("CreateHackathon Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    }
};

export default CreateHackathonController;