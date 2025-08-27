import createEvent from "../../models/events/createEventModels.js";

const CreateEventController = {
    async create(req, res) {
        try {
            const { event_type, title, event_description, event_date } = req.body;
            if (!title || typeof title !== "string") {
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "Event title is required and must be string",
                });
            }
            const event = await createEvent({ event_type, title, event_description, event_date });
            return res.status(201).json({
                success: true,
                msg: "Event created successful",
                event,
            });
        }catch(error){
            console.error("CreateEvent Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    }
};

export default CreateEventController;
