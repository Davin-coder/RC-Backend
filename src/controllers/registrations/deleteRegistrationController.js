import deleteMyRegistrationModel from "../../models/registrations/deleteRegistration.js";

const DeleteMyRegistrationController = {
    async delete(req, res) {
        try {
            const eventId = Number(req.params.id);
            const userId = req.user?.id ?? Number(req.body?.id_user); // soporte temporal sin auth
            if (!eventId || Number.isNaN(eventId)) {
                return res.status(400).json({ success: false, error: true, msg: "Invalid event id" });
            }
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ success: false, error: true, msg: "Invalid user id" });
            }
            const out = await deleteMyRegistrationModel.delete({ eventId, userId });
            if (!out.found) {
                return res.status(404).json({
                    success: false, error: true, msg: "Registration not found",
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Registration canceled successfully",
                registration: out.registration,
            });
        } catch (error) {
            console.error("DeleteMyRegistration Error:", error.message);
            return res.status(500).json({
                success: false, error: true, msg: "Internal server error, try later",
            });
        }
    },
};

export default DeleteMyRegistrationController;