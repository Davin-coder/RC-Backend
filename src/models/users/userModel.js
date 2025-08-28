import pool from "../../middleware/connection.js";

const findByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

export default findByEmail;