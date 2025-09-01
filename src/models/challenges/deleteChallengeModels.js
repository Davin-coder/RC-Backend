import pool from "../../middleware/connection.js"

const deleteChallenge = async (id_challenge) => {
    try{
        const query = `
        DELETE FROM challenges WHERE id_challenge = $1
        RETURNING *`;
        const result = await pool.query(query, [id_challenge]);
        return result.rows[0];
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default deleteChallenge;