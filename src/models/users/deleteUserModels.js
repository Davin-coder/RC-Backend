import pool from "../../middleware/connection.js"

const deleteUser = async (id_user) => {
    try{
        const query = `
        DELETE FROM users WHERE id_user = $1
        RETURNING *`;
        const result = await pool.query(query, [id_user]);
        return result.rows[0];
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default deleteUser;