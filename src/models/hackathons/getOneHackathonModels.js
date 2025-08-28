import pool from "../../middleware/connection.js"

const getOneHackathon = async (id_hackathon) => {
    try{
        const query = 
        `SELECT
        h.h_title,
        h.h_desc,
        h.h_date,
        h.h_status,
        u.first_name || ' ' || u.first_surname AS creator
        FROM hackathons h
        LEFT JOIN users u ON created_by = u.id_user
        WHERE id_hackathon = $1;
        `;
        const result = await pool.query(query, [id_hackathon]);
        return result.rows[0] || null;           
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default getOneHackathon;