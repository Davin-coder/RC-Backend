import deleteGroup from "../../models/groups/deleteGroupModels.js";

const DeleteGroupController = {
    async delete(req, res) {
        const id_group = req.params.id;
        try{
            const deletedGroup = await deleteGroup(id_group);
            if (!deletedGroup) {
                return res.status(404).json({
                    success: false,
                    msg: "Group not found",
                });
            }
            res.status(200).json({
                success: true,
                msg: "Group deleted successfully",
                group: deletedGroup,
            });
        }catch(error){
            console.error("DeleteGroup Error:", error.message);
            res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default DeleteGroupController;
