import pool from "../../middleware/connection.js"

const deleteHackathon = async (id_hackathon) => {
    try{
        const query = `
        DELETE FROM hackathons WHERE id_hackathon = $1
        RETURNING *`;
        const result = await pool.query(query, [id_hackathon]);
        return result.rows[0];
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default deleteHackathon;