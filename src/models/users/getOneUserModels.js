import pool from "../../middleware/connection.js"

const getOneUser = async (id_user) => {
    try {
        const query = 
        `SELECT
        u.id_user,
        u.first_name,
        u.first_surname,
        ci.city_name,
        cl.clan_name,
        u.id_cohort,
        u.email
        FROM users u
        INNER JOIN cities ci ON u.id_city = ci.id_city
        INNER JOIN clans cl ON u.id_clan = cl.id_clan
        WHERE id_user = $1;
        `;
        const result = await pool.query(query, [id_user]);
        return result.rows[0] || null;           
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};

export default getOneUser;