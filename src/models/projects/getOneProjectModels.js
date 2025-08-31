import pool from "../../middleware/connection.js";

const getOneProject = async (id_project_submissions) => {
    try {
        const query = `
        SELECT
            ps.id_project_submissions,
            pt.title AS template_title,
            pt.project_description,
            ps.id_user,
            u.first_name,
            u.first_surname,
            g.group_name,
            ps.repo_url,
            ps.demo_url,
            ps.screenshots,
            ps.notes,
            ps.created_at
        FROM project_submissions ps
        INNER JOIN project_templates pt ON ps.id_template = pt.id_template
        LEFT JOIN users u ON ps.id_user = u.id_user
        LEFT JOIN groups g ON ps.id_group = g.id_group
        WHERE ps.id_project_submissions = $1;
        `;
        const result = await pool.query(query, [id_project_submissions]);
        return result.rows[0] || null;
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
};

export default getOneProject;
