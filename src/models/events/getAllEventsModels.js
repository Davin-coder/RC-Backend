import pool from "../../middleware/connection.js"

const getAllEventsModels = {
    async getAllEvents() {
        try {
            const query = 
            `SELECT
            e.id_event,
            e.title,
            e.event_type,
            e.event_description,
            e.event_date,
            u.first_name
            FROM events e
            LEFT JOIN users u ON id_tutor = u.id_user;
            `;
            const result = await pool.query(query);
            return result.rows;        
        }catch(error){
            throw new Error('Database query failed: ' + error.message);
        }
    }
};

export default getAllEventsModels;