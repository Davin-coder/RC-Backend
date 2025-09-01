// src/models/event_registrations/getRegistrationsModel.js
import pool from "../../middleware/connection.js";

const ALLOWED_STATUS = new Set(["registered", "attended", "missed"]);

const getRegistrationsModel = {
    /**
     * Lista inscripciones por evento con filtros opcionales.
     * @param {object} args
     * @param {number} args.eventId  - id del evento (int)
     * @param {string=} args.status  - 'registered'|'attended'|'missed'
     * @param {number=} args.limit   - paginación (default 50)
     * @param {number=} args.offset  - paginación (default 0)
     */
    async listByEvent({ eventId, status, limit = 50, offset = 0 }) {
        const params = [eventId];
        let paramIndex = 1;
        let where = "WHERE r.id_event = $1";
        if (status) {
            if (!ALLOWED_STATUS.has(status)) {
                throw Object.assign(new Error("Invalid status"), { http: 400 });
            }
            paramIndex += 1;
            params.push(status);
            where += ` AND r.registration_status = $${paramIndex}`;
        }
        paramIndex += 1; params.push(limit);
        paramIndex += 1; params.push(offset);
        const sql = `SELECT
        r.registration_id,
        r.id_event,
        r.id_user,
        r.registration_status,
        r.created_at
        FROM event_registrations r
        ${where}
        ORDER BY r.created_at ASC
        LIMIT $${paramIndex - 1} OFFSET $${paramIndex}`;
        const result = await pool.query(sql, params);
        return result.rows;
    },
};

export default getRegistrationsModel;
