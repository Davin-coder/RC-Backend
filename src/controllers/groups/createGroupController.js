import createGroup from "../../models/groups/createGroupModels.js";

const CreateGroupController = {
    async create(req, res) {
        try {
            const { group_name, id_creator } = req.body;
            if (!group_name || typeof group_name !== "string") {
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "Group name is required and must be string",
                });
            }
            const group = await createGroup({ group_name, id_creator });
            return res.status(201).json({
                success: true,
                msg: "Group created successful",
                group,
            });
        }catch(error){
            console.error("CreateGroup Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    }
};

export default CreateGroupController;
