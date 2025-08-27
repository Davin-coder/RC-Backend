import pool from "../../middleware/connection.js"

const deleteGroup = async (id_group) => {
    try{
        const query = `
        DELETE FROM groups WHERE id_group = $1
        RETURNING *`;
        const result = await pool.query(query, [id_group]);
        return result.rows[0];
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};


export default deleteGroup;
