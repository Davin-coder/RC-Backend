import createRegistrationModel from "../../models/registrations/createRegistrationModels.js";

const CreateRegistrationController = {
    async create(req, res) {
        try {
            const eventId = Number(req.params.id);
            const userId = req.user?.id ?? Number(req.body?.id_user); // ← provisoriamente aceptamos body
            const status = (req.body?.registration_status || "registered").trim();
            if (!eventId || Number.isNaN(eventId)) {
                return res.status(400).json({ success: false, error: true, msg: "Invalid event id" });
            }
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ success: false, error: true, msg: "Invalid user id" });
            }
            const registration = await createRegistrationModel.create({ eventId, userId, status });
            return res.status(201).json({
                success: true,
                msg: "Registration created successfully",
                registration,
            });
        } catch (error) {
            if (error.http) {
                return res.status(error.http).json({ success: false, error: true, msg: error.message });
            }
            console.error("CreateRegistration Error:", error.message);
            return res.status(500).json({ success: false, error: true, msg: "Internal server error, try later" });
        }
    },
};

export default CreateRegistrationController;
