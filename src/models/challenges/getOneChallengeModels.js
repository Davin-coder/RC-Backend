import pool from "../../middleware/connection.js"

const getOneChallenge = async (id_challenge) => {
    try{
        const query = 
        `SELECT
        c.title,
        c.challenge_desc,
        c.difficulty
        FROM challenges c
        WHERE id_challenge = $1;
        `;
        const result = await pool.query(query, [id_challenge]);
        return result.rows[0] || null;           
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default getOneChallenge;