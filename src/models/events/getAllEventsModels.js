import pool from "../../middleware/connection.js"; // adjust the path if needed

const getAllEventsModels = {
  async getAllEvents() {
    try {
      const result = await pool.query("SELECT * FROM events ORDER BY created_at DESC");
      return result.rows; // return array of events
    } catch (error) {
      console.error("Database error in getAllEvents:", error.message);
      throw error;
    }
  },
};

export default getAllEventsModels;