// src/controllers/event_registrations/getRegistrationsController.js
import getRegistrationsModel from "../../models/registrations/getRegistrationsModels.js";

const GetRegistrationsController = {
    async list(req, res) {
        try {
            const eventId = Number(req.params.id);
            const status = req.query.status?.trim();
            const limit = req.query.limit ? Math.min(100, Math.max(1, Number(req.query.limit))) : 50;
            const offset = req.query.offset ? Math.max(0, Number(req.query.offset)) : 0;
            if (!eventId || Number.isNaN(eventId)) {
                return res.status(400).json({ success: false, error: true, msg: "Invalid event id" });
            }
            const registrations = await getRegistrationsModel.listByEvent({
                eventId, status, limit, offset,
            });
            if (!registrations || registrations.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "No registrations found for this event",
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Registrations retrieved successfully",
                registrations,
            });
        } catch (error) {
            if (error.http) {
                return res.status(error.http).json({ success: false, error: true, msg: error.message });
            }
            console.error("GetRegistrations Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default GetRegistrationsController;
