import pool from "../../middleware/connection.js"

const updateHackathon = async (id_hackathon, { h_title, h_desc, h_date, h_status, created_by }) => {
    const { rows } = await pool.query(
        `UPDATE hackathons
        SET h_title = $1,
        h_desc = $2,
        h_date = $3,
        h_status = $4,
        created_by = $5
        WHERE id_hackathon = $6
        RETURNING id_hackathon, h_title, h_desc, h_date, h_status, created_by`,
        [h_title, h_desc, h_date, h_status, created_by ?? null, id_hackathon]
    );
    return rows[0];
};

export default updateHackathon;