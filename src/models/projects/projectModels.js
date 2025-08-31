// src/models/projectsModel.js
import pool from "../../middleware/connection.js";

/* ===========================
   TEMPLATES
=========================== */
export async function listTemplates({ q = "", limit = 20, offset = 0 } = {}) {
  const params = [];
  let where = "";
  if (q) {
    params.push(`%${q}%`);
    where = `WHERE (pt.title ILIKE $${params.length} OR pt.project_description ILIKE $${params.length})`;
  }
  params.push(limit, offset);
  const sql = `
    SELECT pt.id_template, pt.title, pt.project_description
    FROM project_templates pt
    ${where}
    ORDER BY pt.id_template DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `;
  const { rows } = await pool.query(sql, params);
  return rows;
}

export async function getTemplateById(id_template) {
  const { rows } = await pool.query(
    `SELECT id_template, title, project_description
     FROM project_templates WHERE id_template = $1 LIMIT 1`,
    [id_template]
  );
  return rows[0] || null;
}

export async function createTemplate({ title, project_description = null }) {
  const { rows } = await pool.query(
    `INSERT INTO project_templates (title, project_description)
     VALUES ($1, $2)
     RETURNING id_template, title, project_description`,
    [title, project_description]
  );
  return rows[0];
}

export async function updateTemplate(id_template, { title, project_description }) {
  const { rows } = await pool.query(
    `UPDATE project_templates
     SET title = COALESCE($2, title),
         project_description = COALESCE($3, project_description)
     WHERE id_template = $1
     RETURNING id_template, title, project_description`,
    [id_template, title, project_description]
  );
  return rows[0] || null;
}

export async function deleteTemplate(id_template) {
  const { rowCount } = await pool.query(
    `DELETE FROM project_templates WHERE id_template = $1`,
    [id_template]
  );
  return rowCount > 0;
}

/* ===========================
   SUBMISSIONS
=========================== */
// Helper para armar WHERE dinámico
function buildSubmissionFilters({ id_template, id_user, id_group }) {
  const where = [];
  const params = [];
  if (id_template) {
    params.push(id_template);
    where.push(`ps.id_template = $${params.length}`);
  }
  if (id_user) {
    params.push(id_user);
    where.push(`ps.id_user = $${params.length}`);
  }
  if (id_group) {
    params.push(id_group);
    where.push(`ps.id_group = $${params.length}`);
  }
  return { where: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

// Listado con agregados (#votes, #comments)
export async function listSubmissions({
  id_template,
  id_user,
  id_group,
  limit = 20,
  offset = 0,
  q = "",
} = {}) {
  const { where, params } = buildSubmissionFilters({ id_template, id_user, id_group });

  let search = "";
  if (q) {
    params.push(`%${q}%`);
    search = `${where ? " AND " : "WHERE"} (
      COALESCE(ps.notes,'') ILIKE $${params.length}
      OR COALESCE(ps.repo_url,'') ILIKE $${params.length}
      OR COALESCE(ps.demo_url,'') ILIKE $${params.length}
    )`;
  }

  params.push(limit, offset);

  const sql = `
    SELECT
      ps.id_project_submissions,
      ps.id_template,
      ps.id_user,
      ps.id_group,
      ps.repo_url,
      ps.demo_url,
      ps.screenshots,
      ps.notes,
      ps.created_at,
      COALESCE(v.cnt_votes, 0) AS votes_count,
      COALESCE(c.cnt_comments, 0) AS comments_count,
      u.name AS user_name,
      g.group_name
    FROM project_submissions ps
    LEFT JOIN (
      SELECT id_project_submissions, COUNT(*)::int AS cnt_votes
      FROM project_votes
      GROUP BY id_project_submissions
    ) v ON v.id_project_submissions = ps.id_project_submissions
    LEFT JOIN (
      SELECT id_project_submissions, COUNT(*)::int AS cnt_comments
      FROM project_comments
      GROUP BY id_project_submissions
    ) c ON c.id_project_submissions = ps.id_project_submissions
    LEFT JOIN users u ON u.id_user = ps.id_user
    LEFT JOIN groups g ON g.id_group = ps.id_group
    ${where} ${search}
    ORDER BY ps.created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `;

  const { rows } = await pool.query(sql, params);
  return rows;
}

export async function getSubmissionById(id_project_submissions) {
  const { rows } = await pool.query(
    `
    SELECT
      ps.id_project_submissions,
      ps.id_template,
      ps.id_user,
      ps.id_group,
      ps.repo_url,
      ps.demo_url,
      ps.screenshots,
      ps.notes,
      ps.created_at
    FROM project_submissions ps
    WHERE ps.id_project_submissions = $1
    LIMIT 1
  `,
    [id_project_submissions]
  );
  return rows[0] || null;
}

// Crea submission: debe venir EITHER id_user OR id_group (tu CHECK lo valida)
export async function createSubmission({
  id_template,
  id_user = null,
  id_group = null,
  repo_url = null,
  demo_url = null,
  screenshots = null, // array/obj => JSONB
  notes = null,
}) {
  const { rows } = await pool.query(
    `
    INSERT INTO project_submissions
      (id_template, id_user, id_group, repo_url, demo_url, screenshots, notes)
    VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7)
    RETURNING *
  `,
    [id_template, id_user, id_group, repo_url, demo_url, screenshots ? JSON.stringify(screenshots) : null, notes]
  );
  return rows[0];
}

// Update (solo campos editables)
export async function updateSubmission(id_project_submissions, {
  repo_url = undefined,
  demo_url = undefined,
  screenshots = undefined,
  notes = undefined,
}) {
  const { rows } = await pool.query(
    `
    UPDATE project_submissions
    SET
      repo_url   = COALESCE($2, repo_url),
      demo_url   = COALESCE($3, demo_url),
      screenshots= CASE WHEN $4::text IS NULL THEN screenshots ELSE $4::jsonb END,
      notes      = COALESCE($5, notes)
    WHERE id_project_submissions = $1
    RETURNING *
  `,
    [
      id_project_submissions,
      repo_url ?? null,
      demo_url ?? null,
      screenshots !== undefined ? JSON.stringify(screenshots) : null,
      notes ?? null,
    ]
  );
  return rows[0] || null;
}

export async function deleteSubmission(id_project_submissions) {
  const { rowCount } = await pool.query(
    `DELETE FROM project_submissions WHERE id_project_submissions = $1`,
    [id_project_submissions]
  );
  return rowCount > 0;
}

/* ===========================
   COMMENTS
=========================== */
export async function listComments(id_project_submissions, { limit = 50, offset = 0 } = {}) {
  const { rows } = await pool.query(
    `
    SELECT pc.id_comment, pc.id_project_submissions, pc.id_user, pc.body, pc.created_at,
           u.name AS user_name
    FROM project_comments pc
    LEFT JOIN users u ON u.id_user = pc.id_user
    WHERE pc.id_project_submissions = $1
    ORDER BY pc.created_at ASC
    LIMIT $2 OFFSET $3
  `,
    [id_project_submissions, limit, offset]
  );
  return rows;
}

export async function addComment({ id_project_submissions, id_user, body }) {
  const { rows } = await pool.query(
    `
    INSERT INTO project_comments (id_project_submissions, id_user, body)
    VALUES ($1, $2, $3)
    RETURNING id_comment, id_project_submissions, id_user, body, created_at
  `,
    [id_project_submissions, id_user, body]
  );
  return rows[0];
}

export async function deleteComment(id_comment, requestingUserId, { isAdmin = false } = {}) {
  // Solo autor o admin
  const own = await pool.query(
    `SELECT id_user FROM project_comments WHERE id_comment = $1`,
    [id_comment]
  );
  const ownerId = own.rows[0]?.id_user;
  if (!ownerId) return false;
  if (!isAdmin && ownerId !== requestingUserId) return false;

  const { rowCount } = await pool.query(
    `DELETE FROM project_comments WHERE id_comment = $1`,
    [id_comment]
  );
  return rowCount > 0;
}

/* ===========================
   VOTES (toggle)
=========================== */
export async function userHasVoted(id_project_submissions, id_user) {
  const { rows } = await pool.query(
    `SELECT 1 FROM project_votes WHERE id_project_submissions = $1 AND id_user = $2`,
    [id_project_submissions, id_user]
  );
  return !!rows[0];
}

export async function toggleVote(id_project_submissions, id_user) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const has = await client.query(
      `SELECT id_vote FROM project_votes WHERE id_project_submissions = $1 AND id_user = $2`,
      [id_project_submissions, id_user]
    );
    if (has.rows[0]) {
      await client.query(
        `DELETE FROM project_votes WHERE id_project_submissions = $1 AND id_user = $2`,
        [id_project_submissions, id_user]
      );
      await client.query("COMMIT");
      return { voted: false };
    } else {
      await client.query(
        `INSERT INTO project_votes (id_project_submissions, id_user) VALUES ($1, $2)`,
        [id_project_submissions, id_user]
      );
      await client.query("COMMIT");
      return { voted: true };
    }
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
