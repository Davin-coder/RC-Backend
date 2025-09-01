// src/models/getAllTemplateModels.js
import pool from "../../middleware/connection.js";

const getAllTemplateModels = {
  async getAllTemplates() {
    try {
      const query = `
        SELECT
          pt.id_template,
          pt.title,
          pt.project_description
        FROM project_templates pt
        ORDER BY pt.id_template DESC;`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error("Database query failed: " + error.message);
    }
  },
};

export default getAllTemplateModels;
