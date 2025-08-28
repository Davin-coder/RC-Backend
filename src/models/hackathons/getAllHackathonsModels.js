import pool from "../../middleware/connection.js"

const getAllHackathons =  async () => {
    try{
        const query = 
        `SELECT
        h.id_hackathon,
        h.h_title,
        h.h_desc,
        h.h_date,
        h.h_status,
        u.first_name || ' ' || u.first_surname AS creator
        FROM hackathons h
        LEFT JOIN users u ON created_by = u.id_user;
        `;
        const result = await pool.query(query);
        return result.rows;        
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default getAllHackathons;