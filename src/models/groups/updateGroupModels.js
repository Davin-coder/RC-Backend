import pool from "../../middleware/connection.js"

const updateGroup = async (id_group, { group_name }) => {
    const { rows } = await pool.query(
        `UPDATE groups
        SET group_name = $1
        WHERE id_group = $2
        RETURNING id_group, group_name`,
        [group_name ?? null, id_group]
    );
    return rows[0];
};

export default updateGroup;