import pool from '../middleware/connection.js'

const getAllUserModels = {
    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users';
            const result = await pool.query(query);
            return result.rows; 
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    }
}

export default getAllUserModels;