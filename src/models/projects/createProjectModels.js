import pool from "../../middleware/connection.js";

const createProject = async ({
  id_template,
  id_user = null,
  id_group = null,
  repo_url,
  demo_url,
  screenshots,
  notes,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO project_submissions
      (id_template,
       id_user,
       id_group,
       repo_url,
       demo_url,
       screenshots,
       notes)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7)
     RETURNING id_project_submissions,
               id_template,
               id_user,
               id_group,
               repo_url,
               demo_url,
               screenshots,
               notes,
               created_at`,
    [
      id_template,
      id_user,
      id_group,
      repo_url,
      demo_url,
      screenshots ? JSON.stringify(screenshots) : null,
      notes,
    ]
  );
  return rows[0];
};

export default createProject;
