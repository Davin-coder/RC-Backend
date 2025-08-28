import pool from "../../middleware/connection.js"

const createHackathon = async ({ h_title, h_desc, h_date, created_by }) => {
    const { rows } = await pool.query(
        `
        INSERT INTO hackathons (h_title, h_desc, h_date, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING id_hackathon, h_title, h_desc, h_date, created_by`,
        [h_title, h_desc, h_date, created_by ?? null]
    );
    return rows[0];
};

export default createHackathon;