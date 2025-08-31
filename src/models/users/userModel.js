import pool from "../../middleware/connection.js";

const findByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const getClanNameByUserId = async (userId) => {
    const q = `
    SELECT c.clan_name
    FROM users u
    LEFT JOIN clans c ON c.id_clan = u.id_clan
    WHERE u.id_user = $1
    LIMIT 1
    `;
    const { rows } = await pool.query(q, [userId]);
    return rows[0]?.clan_name ?? null;
};

const getRoleNameByUserId = async (userId) => {
    const q = `
    SELECT r.role_name
    FROM user_roles ur
    JOIN roles r ON r.id_role = ur.id_role
    WHERE ur.id_user = $1
    LIMIT 1
    `;
    const { rows } = await pool.query(q, [userId]);
    return rows[0]?.role_name ?? "coder";
};


export { findByEmail, getClanNameByUserId, getRoleNameByUserId};