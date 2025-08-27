import updateEvent from "../../models/events/updateEventModels.js";

const UpdateEventController = {
    async update(req, res) {
        try{
            const  id_event  = req.params.id;
            const { event_type, title, event_description, event_date, id_tutor } = req.body;
            if(!title || typeof title !== "string"){
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "Event title is required and must be string",
                });
            }
            const updatedEvent = await updateEvent(id_event, { event_type, title, event_description, event_date, id_tutor });
            if(!updatedEvent){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Event not found"
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Event updated successful",
                event: updatedEvent,
            });
        }catch(error){
            console.error("UpdateEvent Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default UpdateEventController;