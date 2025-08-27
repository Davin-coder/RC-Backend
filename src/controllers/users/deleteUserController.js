import deleteUser from "../../models/users/deleteUserModels.js";

const DeleteUserController = {
    async delete(req, res) {
        const id_user = req.params.id;
        try{
            const deletedUser = await deleteUser(id_user);
            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }
            res.status(200).json({
                success: true,
                msg: "User deleted successfully",
                user: deletedUser,
            });
        }catch(error){
            console.error("DeleteEvent Error:", error.message);
            res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default DeleteUserController;
