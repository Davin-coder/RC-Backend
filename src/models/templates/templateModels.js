// src/models/projectTemplatesModel.js
import pool from "../../middleware/connection.js";

/** Lista con paginación y búsqueda opcional por título */
export async function getAllTemplates({ page = 1, limit = 20, q = "" } = {}) {
  const p = Math.max(1, Number(page) || 1);
  const l = Math.min(100, Math.max(1, Number(limit) || 20));
  const offset = (p - 1) * l;

  const where = [];
  const values = [];
  if (q && String(q).trim()) {
    values.push(`%${q.trim()}%`);
    where.push(`title ILIKE $${values.length}`);
  }
  const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const totalSQL = `SELECT COUNT(*)::int AS total FROM project_templates ${whereSQL}`;
  const listSQL  = `
    SELECT id_template, title, project_description
    FROM project_templates
    ${whereSQL}
    ORDER BY id_template DESC
    LIMIT $${values.length + 1} OFFSET $${values.length + 2}
  `;

  const totalRes = await pool.query(totalSQL, values);
  const total = totalRes.rows?.[0]?.total ?? 0;

  const listRes = await pool.query(listSQL, [...values, l, offset]);
  return {
    items: listRes.rows,
    pagination: { page: p, limit: l, total, pages: Math.max(1, Math.ceil(total / l)) },
  };
}

/** Uno por id */
export async function getTemplateById(id) {
  const q = `SELECT id_template, title, project_description
             FROM project_templates
             WHERE id_template = $1 LIMIT 1`;
  const { rows } = await pool.query(q, [id]);
  return rows[0] || null;
}

/** Crear */
export async function createTemplate({ title, project_description = null }) {
  const q = `
    INSERT INTO project_templates (title, project_description)
    VALUES ($1, $2)
    RETURNING id_template, title, project_description
  `;
  const { rows } = await pool.query(q, [title, project_description]);
  return rows[0];
}

/** Actualizar (parcial) */
export async function updateTemplate(id, { title, project_description }) {
  const fields = [];
  const values = [];
  if (typeof title === "string") {
    values.push(title);
    fields.push(`title = $${values.length}`);
  }
  if (typeof project_description === "string" || project_description === null) {
    values.push(project_description);
    fields.push(`project_description = $${values.length}`);
  }
  if (!fields.length) return await getTemplateById(id);

  values.push(id);
  const q = `
    UPDATE project_templates
    SET ${fields.join(", ")}
    WHERE id_template = $${values.length}
    RETURNING id_template, title, project_description
  `;
  const { rows } = await pool.query(q, values);
  return rows[0] || null;
}

/** Eliminar */
export async function deleteTemplate(id) {
  const q = `DELETE FROM project_templates WHERE id_template = $1 RETURNING id_template`;
  const { rows } = await pool.query(q, [id]);
  return Boolean(rows[0]?.id_template);
}
