import deleteEvent from "../../models/events/deleteEventModels.js";

const DeleteEventController = {
    async delete(req, res) {
        const id_event = req.params.id;
        try{
            const deletedEvent = await deleteEvent(id_event);
            if (!deletedEvent) {
                return res.status(404).json({
                    success: false,
                    msg: "Event not found",
                });
            }
            res.status(200).json({
                success: true,
                msg: "Event deleted successfully",
                group: deletedEvent,
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

export default DeleteEventController;