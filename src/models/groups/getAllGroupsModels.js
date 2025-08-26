import pool from "../../middleware/connection.js"

const getAllGroupsModels = {
    async getAllGroups() {
        try {
            const query = 
            `SELECT
            g.group_name,
            u.first_name,
            g.created_at
            FROM groups g
            INNER JOIN users u ON id_creator = u.id_user
            `;
            const result = await pool.query(query);
            return result.rows;        
        }catch(error){
            throw new Error('Database query failed: ' + error.message);
        }
    }
};

export default getAllGroupsModels;