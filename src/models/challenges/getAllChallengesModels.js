import pool from "../../middleware/connection.js"

const getAllChallenges =  async () => {
    try{
        const query = 
        `SELECT
        c.id_challenge,
        c.title,
        c.challenge_desc,
        c.difficulty
        FROM challenges c;`;
        const result = await pool.query(query);
        return result.rows;        
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default getAllChallenges;