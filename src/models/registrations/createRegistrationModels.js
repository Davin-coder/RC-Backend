import pool from "../../middleware/connection.js";

const ALLOWED = new Set(["registered", "attended", "missed"]);

const createRegistrationModel = {
    async create({ eventId, userId, status = "registered" }) {
        if (!ALLOWED.has(status)) {
            const err = new Error("Invalid status");
            err.http = 400;
            throw err;
        }
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            // 1) Verificar que exista el evento
            const ev = await client.query(
                "SELECT id_event, event_date FROM events WHERE id_event = $1 FOR SHARE",
                [eventId]
            );
            if (ev.rowCount === 0) {
                const err = new Error("Event not found");
                err.http = 404;
                throw err;
            };
            // 2) Insertar inscripción (única por (id_event,id_user) según tu UNIQUE)
            const ins = await client.query(
                `INSERT INTO event_registrations (id_event, id_user, registration_status)
                VALUES ($1, $2, $3)
                RETURNING registration_id, id_event, id_user, registration_status, created_at`,
                [eventId, userId, status]
            );
            await client.query("COMMIT");
            return ins.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            if (error.code === "23505") {
                const err = new Error("User already registered for this event");
                err.http = 409;
                throw err;
            }
            throw error;
        } finally {
            client.release();
        }
    },
};

export default createRegistrationModel;
