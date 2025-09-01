import getOneEvent from "../../models/events/getOneEventModels.js"

const GetOneEventController = {
    async getOneEvent(req, res) {
        try {
            const id_event = req.params.id;
            const event = await getOneEvent(id_event);
            if(!event){
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Event not found"
                });
            }
            res.status(200).json({
                success: true,
                msg: "Event retrieved successfully", 
                event
            });
        }catch(error){
            console.error('GetEvent Error:', error);
            throw new Error('Database query failed: ' + error.message);
        }
    }
};

export default GetOneEventController;