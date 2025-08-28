import deleteHackathon from "../../models/hackathons/deleteHackathonModels.js";

const DeleteHackathonController = {
    async delete(req, res) {
        const id_hackathon = req.params.id;
        try{
            const deletedHackathon = await deleteHackathon(id_hackathon);
            if (!deletedHackathon){
                return res.status(404).json({
                    success: false,
                    msg: "Hackathon not found",
                });
            }
            res.status(200).json({
                success: true,
                msg: "Hackathon deleted successfully",
                hackathon: deletedHackathon,
            });
        }catch(error){
            console.error("DeleteHackathon Error:", error.message);
            res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default DeleteHackathonController;