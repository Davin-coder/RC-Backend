SELECT
u.first_name AS First_name,
u.first_surname AS First_surname,
ci.city_name AS City,
cl.clan_name AS Clan,
u.id_cohort AS Cohort,
u.email AS Email
FROM users u
INNER JOIN cities ci ON u.id_city = ci.id_city
INNER JOIN clans cl ON u.id_clan = cl.id_clan;

SELECT
h.id_hackathon,
h.h_title,
h.h_desc,
h.h_date,
h.h_status,
u.first_name || ' ' || u.first_surname AS creator
FROM hackathons h
LEFT JOIN users u ON created_by = u.id_user;

SELECT
c.id_challenge
c.title,
c.challenge_desc,
c.difficulty
FROM challenges c;

-- ============ // Reiniciador de tablas // ============
TRUNCATE TABLE 
    cities,
    cohorts,
    roles,
    tl_areas,
    skills,
    badges,
    challenges,
    project_templates,
    clans,
    users,
    groups,
    submissions,
    hackathons,
    hackathon_participants,
    hackathon_scores,
    project_submissions,
    project_comments,
    project_votes,
    events,
    event_registrations,
    user_roles,
    user_skills,
    user_badges,
    group_members
RESTART IDENTITY CASCADE;
