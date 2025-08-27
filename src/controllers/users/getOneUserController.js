import getOneUser from "../../models/users/getOneUserModels.js"

const GetOneUserController = {
    async getOneUser(req, res) {
        try {
            const id_user = req.params.id;
            const user = await getOneUser(id_user);
            res.status(200).json({  
                success: true,
                msg: "User retrieved successfully", 
                user
            });
        } catch (error) {
            console.error('GetUser Error:', error);
            throw new Error('Database query failed: ' + error.message);
        }
    }
};

export default GetOneUserController;