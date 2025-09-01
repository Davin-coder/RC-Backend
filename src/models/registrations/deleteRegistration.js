import pool from "../../middleware/connection.js";

const deleteMyRegistrationModel = {
    async delete({ eventId, userId }) {
        const sql = `
        DELETE FROM event_registrations
        WHERE id_event = $1 AND id_user = $2
        RETURNING registration_id, id_event, id_user, registration_status, created_at`;
        const { rows } = await pool.query(sql, [eventId, userId]);
        if (rows.length === 0) return { found: false };
        return { found: true, registration: rows[0] };
    },
};

export default deleteMyRegistrationModel;