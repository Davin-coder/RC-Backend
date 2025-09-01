import getAllGroupsModels from "../../models/groups/getAllGroupsModels.js";

const GetAllGroupsController = {
    async getAllGroups(req, res) {
        try {
            const groups = await getAllGroupsModels.getAllGroups();
            res.status(200).json({ 
                success: true,
                msg: "Groups retrieved successfully",
                groups
            });
            if(!groups){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Groups not found"
                });
            }
        }catch(error){
            console.error('GetAllGroups Error:', error.message);
            res.status(500).json({ 
                success: false,
                error: true, 
                msg: "Internal server error, try later" 
            });
        }
    }
};

export default GetAllGroupsController;