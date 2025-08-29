
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
