import bcrypt from "bcrypt";
import findByEmail from "../../models/users/userModel.js";

const LoginUserController = async (req, res) => {
    const { email, password_user } = req.body;
    try{
        const user = await findByEmail(email);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const validPassword = await bcrypt.compare(password_user, user.password_user);
        if (!validPassword) {
            return res.status(401).json({ msg: "Invalids credentials"});
        }
        // 3. Si es válido, responder (ejemplo con sesiones)
        req.session.userId = user.id_user; // guardas el ID en la sesión
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id_user,
                email: user.email,
                nombre: user.first_name,
            }
        });
    }catch(error){
        console.error("LoginUser Error:", error.message);
        return res.status(500).json({
            success: false,
            error: true,
            msg: "Internal server error, try later" });
    }
};

export default LoginUserController;