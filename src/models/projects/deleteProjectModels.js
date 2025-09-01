import pool from "../../middleware/connection.js";

const deleteProject = async (id_project_submissions) => {
    try {
        const query = `
        DELETE FROM project_submissions
        WHERE id_project_submissions = $1
        RETURNING *`;
        const result = await pool.query(query, [id_project_submissions]);
        return result.rows[0];
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
};

export default deleteProject;
