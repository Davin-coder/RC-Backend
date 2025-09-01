import pool from "../../middleware/connection.js"

const updateChallenge = async (id_challenge, { title, challenge_desc, difficulty }) => {
    const { rows } = await pool.query(
        `UPDATE challenges
        SET title = $1,
        challenge_desc = $2,
        difficulty = $3
        WHERE id_challenge = $4
        RETURNING id_challenge, title, challenge_desc, difficulty`,
        [title, challenge_desc ?? null, difficulty, id_challenge]
    );
    return rows[0];
};

export default updateChallenge;