import pool from "../../middleware/connection.js"

const getOneGroup = async (id_group) => {
    try {
        const query = 
        `SELECT
        g.group_name,
        u.first_name,
        g.created_at
        FROM groups g
        INNER JOIN users u ON id_creator = u.id_user
        WHERE id_group = $1;
        `;
        const result = await pool.query(query, [id_group]);
        return result.rows[0] || null;           
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default getOneGroup;