import pool from "../../middleware/connection.js";

const updateProject = async ( id_project_submissions, { repo_url, demo_url, screenshots, notes }) => {
  const { rows } = await pool.query(
    `UPDATE project_submissions
    SET 
    repo_url   = $1,
    demo_url   = $2,
    screenshots= $3::jsonb,
    notes      = $4
    WHERE id_project_submissions = $5
    RETURNING id_project_submissions,id_template,id_user,id_group,repo_url,demo_url,screenshots,notes,created_at`,
    [
      repo_url ?? null,
      demo_url ?? null,
      screenshots ? JSON.stringify(screenshots) : null,
      notes ?? null,
      id_project_submissions,
    ]
  );
  return rows[0] || null;
};

export default updateProject;
