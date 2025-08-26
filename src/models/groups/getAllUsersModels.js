import pool from '../middleware/connection.js'

const getAllGroupsModels = {
    async getAllGroups() {
        try {
            const query = 'SELECT * FROM groups';
            const result = await pool.query(query);
            return result.rows; 
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    }
}

export default getAllUserModels;