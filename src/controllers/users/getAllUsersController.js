import getAllUserModels from "../../models/getAllUsersModels.js"

const GetAllUsersController = {
    async getAllUser(req, res) {
        try {
            const users = await getAllUserModels.getAllUsers();
            res.status(200).json({ 
                success: true,
                msg: "Users retrieved successfully", 
                users
            });
        } catch (error) {
            console.error('GetAllUsers Error:', error);
            res.status(500).json({ 
                success: false,
                error: true, 
                msg: "Internal server error, try later" 
            });
        }
    }
}

export default GetAllUsersController;