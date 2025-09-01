// src/models/createTemplate.js
import pool from "../../middleware/connection.js";

const createTemplate = async ({ title, project_description }) => {
  const { rows } = await pool.query(
    `INSERT INTO project_templates
    (title, project_description)
    VALUES ($1, $2)
    RETURNING id_template, title, project_description`,
    [title, project_description]
  );
  return rows[0];
};

export default createTemplate;
