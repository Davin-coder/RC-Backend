// src/models/getOneTemplate.js
import pool from "../../middleware/connection.js";

const getOneTemplate = async (id_template) => {
  try {
    const query = `
      SELECT
        pt.id_template,
        pt.title,
        pt.project_description
      FROM project_templates pt
      WHERE pt.id_template = $1;
    `;
    const result = await pool.query(query, [id_template]);
    return result.rows[0] || null;
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

export default getOneTemplate;
