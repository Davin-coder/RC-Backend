import getOneGroup from "../../models/groups/getOneGroupModels.js"

const GetOneGroupController = {
    async getOneGroup(req, res) {
        try {
            const id_group = req.params.id;
            const group = await getOneGroup(id_group);
            if(!group){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Group not found"
                });
            }
            res.status(200).json({
                success: true,
                msg: "Group retrieved successfully", 
                group
            });
        }catch(error){
            console.error('GetGroup Error:', error);
            throw new Error('Database query failed: ' + error.message);
        }
    }
};

export default GetOneGroupController;