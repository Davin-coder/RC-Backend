import pool from "../../middleware/connection.js"

const updateEvent = async (id_event, { event_type, title, event_description, event_date, id_tutor }) => {
    const { rows } = await pool.query(
        `UPDATE events
        SET event_type = $1,
        title = $2,
        event_description = $3,
        event_date = $4,
        id_tutor = $5
        WHERE id_event = $6
        RETURNING id_event, event_type, title, event_description, event_date, id_tutor`,
        [event_type, title, event_description, event_date, id_tutor ?? null, id_event]
    );
    return rows[0];
};

export default updateEvent;