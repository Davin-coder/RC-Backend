import getAllEventsModels from "../../models/events/getAllEventsModels.js";

const GetAllEventsController = {
  async getAllEvents(req, res) {
    try {
      const events = await getAllEventsModels.getAllEvents();

      if (!events || events.length === 0) {
        return res.status(404).json({
          success: false,
          error: true,
          msg: "No events found"
        });
      }

      return res.status(200).json({
        success: true,
        msg: "Events retrieved successfully",
        events
      });
    } catch (error) {
      console.error("GetAllEvents Error:", error.message);
      return res.status(500).json({
        success: false,
        error: true,
        msg: "Internal server error, try later"
      });
    }
  }
};

export default GetAllEventsController;