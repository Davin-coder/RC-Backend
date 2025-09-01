import createUser from "../../models/users/createUserModels.js";

const CreateUserController = {
    async create(req, res) {
        try {
            const { id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user } = req.body;
            const user = await createUser({ id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user});
            return res.status(201).json({
                success: true,
                msg: "User created successful",
                user,
            });
        }catch(error){
            console.error("CreateUser Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    }
};

export default CreateUserController;