import getAllEventsModels from "../../models/events/getAllEventsModels.js";

const GetAllEventsController = {
    async getAllEvents(req, res) {
        try {
            const events = await getAllEventsModels.getAllEvents();
            res.status(200).json({ 
                success: true,
                msg: "Events retrieved successfully",
                events
            });
            if(!events){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Events not found"
                });
            }
        }catch(error){
            console.error('GetAllEvents Error:', error.message);
            res.status(500).json({ 
                success: false,
                error: true, 
                msg: "Internal server error, try later" 
            });
        }
    }
};

export default GetAllEventsController;