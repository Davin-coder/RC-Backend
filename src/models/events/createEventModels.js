import pool from "../../middleware/connection.js"

const createEvent = async ({ event_type, title, event_description, event_date }) => {
    const { rows } = await pool.query(
        `INSERT INTO events (event_type, title, event_description, event_date)
        VALUES ($1, $2, $3, $4)
        RETURNING id_event, event_type, title, event_description, event_date`,
        [event_type, title, event_description, event_date ?? null]
    );
    return rows[0];
};

export default createEvent;