import pool from "../../middleware/connection.js";

const getAllProjects = async () => {
    try {
        const query = `
        SELECT
        ps.id_project_submissions,
        pt.title AS template_title,
        pt.project_description,
        ps.repo_url,
        ps.demo_url,
        ps.screenshots,
        ps.notes,
        ps.created_at,
        u.first_name || ' ' || u.first_surname AS user_creator,
        g.group_name AS group_creator
        FROM project_submissions ps
        INNER JOIN project_templates pt ON ps.id_template = pt.id_template
        LEFT JOIN users u ON ps.id_user = u.id_user
        LEFT JOIN groups g ON ps.id_group = g.id_group
        ORDER BY ps.created_at DESC;
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
};

export default getAllProjects;
