import pool from "../../middleware/connection.js";

const getAllUserModels = {
    async getAllUsers() {
        try {
            const query = 
            `SELECT
            u.first_name,
            u.first_surname,
            ci.city_name,
            cl.clan_name,
            u.id_cohort,
            u.email
            FROM users u
            INNER JOIN cities ci ON u.id_city = ci.id_city
            INNER JOIN clans cl ON u.id_clan = cl.id_clan;`;
            const result = await pool.query(query);
            return result.rows; 
        }catch(error){
            throw new Error('Database query failed: ' + error.message);
        }
    }
};

export default getAllUserModels;