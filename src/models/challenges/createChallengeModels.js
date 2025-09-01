import pool from "../../middleware/connection.js"

const createChallenge = async ({ title, challenge_desc, difficulty }) => {
    const { rows } = await pool.query(
        `
        INSERT INTO challenges (title, challenge_desc, difficulty)
        VALUES ($1, $2, $3)
        RETURNING id_challenge, title, challenge_desc, difficulty`,
        [title, challenge_desc ?? null, difficulty]
    );
    return rows[0];
};

export default createChallenge;