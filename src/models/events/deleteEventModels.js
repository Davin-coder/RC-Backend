import pool from "../../middleware/connection.js"

const deleteEvent = async (id_event) => {
    try{
        const query = `
        DELETE FROM events WHERE id_event = $1
        RETURNING *`;
        const result = await pool.query(query, [id_event]);
        return result.rows[0];
    }catch(error){
        throw new Error('Database query failed: ' + error.message);
    }
};


export default deleteEvent;
