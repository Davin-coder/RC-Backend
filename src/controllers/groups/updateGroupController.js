import updateGroup from "../../models/groups/updateGroupModels.js";

const UpdateGroupController = {
    async update(req, res) {
        try{
            const  id_group  = req.params.id;
            const { group_name } = req.body;
            if(!group_name || typeof group_name !== "string"){
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "Group name is required and must be string",
                });
            }
            const updatedGroup = await updateGroup(id_group, { group_name });
            if(!updatedGroup){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Group not found"
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Group updated successful",
                group: updatedGroup,
            });
        }catch(error){
            console.error("UpdateGroup Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default UpdateGroupController;