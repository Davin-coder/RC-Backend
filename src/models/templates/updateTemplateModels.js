// src/models/updateTemplate.js
import pool from "../../middleware/connection.js";

const updateTemplate = async ( id_template, { title, project_description } ) => {
  const { rows } = await pool.query(
    `UPDATE project_templates
    SET title = $1,
    project_description = $2
    WHERE id_template = $3
    RETURNING id_template, title, project_description`,
    [title, project_description ?? null, id_template]
  );
  return rows[0];
};

export default updateTemplate;
