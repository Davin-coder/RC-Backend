import updateUser from "../../models/users/updateUserModels.js";

const UpdateUserController = {
    async update(req, res) {
        try{
            const  id_user  = req.params.id;
            const { id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user } = req.body;
            if(!first_name || typeof first_name !== "string"){
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "User first name is required and must be string",
                });
            }
            const updatedUser = await updateUser(id_user, { id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user });
            if(!updatedUser){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "User not found"
                });
            }
            return res.status(200).json({
                success: true,
                msg: "User updated successful",
                group: updatedUser,
            });
        }catch(error){
            console.error("UpdateUser Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default UpdateUserController;