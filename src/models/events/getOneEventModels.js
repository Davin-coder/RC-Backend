import pool from "../../middleware/connection.js"

const getOneEvent = async (id_event) => {
    try {
        const query = 
        `SELECT
        e.title,
        e.event_type,
        e.event_description,
        e.event_date,
        u.first_name
        FROM events e
        LEFT JOIN users u ON id_tutor = u.id_user
        WHERE id_event = $1;
        `;
        const result = await pool.query(query, [id_event]);
        return result.rows[0] || null;           
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default getOneEvent;