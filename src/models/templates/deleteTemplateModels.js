// src/models/deleteTemplate.js
import pool from "../../middleware/connection.js";

const deleteTemplate = async (id_template) => {
  try {
    const query = `
      DELETE FROM project_templates 
      WHERE id_template = $1
      RETURNING *`;
    const result = await pool.query(query, [id_template]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

export default deleteTemplate;
