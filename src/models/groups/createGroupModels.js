import pool from "../../middleware/connection.js"

const createGroup = async ({ group_name, id_creator }) => {
    const { rows } = await pool.query(
        `INSERT INTO groups (group_name, id_creator)
        VALUES ($1, $2)
        RETURNING id_group, group_name, id_creator, created_at`,
        [group_name, id_creator ?? null]
    );
    return rows[0];
};

export default createGroup;