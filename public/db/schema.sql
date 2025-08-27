DROP DATABASE IF EXISTS riwiCommunity;
CREATE DATABASE riwiCommunity;

-- En consola de psql se usa:
-- \c riwiCommunity;

-- ======================== // STRONG TABLES // ========================
CREATE TABLE cities(
    id_city SERIAL PRIMARY KEY,
    city_name VARCHAR(30) NOT NULL
);

CREATE TABLE cohorts(
    id_cohort SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
);

CREATE TABLE roles(
    id_role SERIAL PRIMARY KEY,
    role_name TEXT NOT NULL
);

CREATE TABLE tl_areas(
    id_tl_area SERIAL PRIMARY KEY,
    area_name VARCHAR(20) NOT NULL
);

CREATE TABLE skills(
    id_skill SERIAL PRIMARY KEY,
    skill_name TEXT NOT NULL
);

CREATE TABLE badges(
    id_badge SERIAL PRIMARY KEY,
    badge_name TEXT UNIQUE NOT NULL,
    badge_description TEXT,
    points INT DEFAULT 0
);

CREATE TABLE challenges(
    id_challenge SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    challenge_description TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    start_date DATE, 
    end_date DATE
);

CREATE TABLE project_templates (
    id_template SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    project_description TEXT
);

-- ======================== // WEAK TABLES // ========================
CREATE TABLE clans (
    id_clan SERIAL PRIMARY KEY,
    clan_name TEXT UNIQUE NOT NULL, -- 'Macondo', 'Tayrona'
    shift TEXT CHECK (shift IN ('AM','PM')),
    id_tutor INT,
    created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE users(
    id_user SERIAL PRIMARY KEY,
    id_city INT REFERENCES cities(id_city),
    id_cohort INT REFERENCES cohorts(id_cohort),
    id_clan INT REFERENCES clans(id_clan),
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20),
    first_surname VARCHAR(20) NOT NULL,
    second_surname VARCHAR(20),
    email VARCHAR(200) NOT NULL,
    password_user VARCHAR(256) NOT NULL,
    bio TEXT
);

CREATE TABLE groups (
    id_group SERIAL PRIMARY KEY,
    group_name TEXT NOT NULL,
    id_creator INT REFERENCES users(id_user),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE submissions (
    id_submission SERIAL PRIMARY KEY,
    id_challenge INT REFERENCES challenges(id_challenge) ON DELETE CASCADE,
    id_user INT REFERENCES users(id_user),
    id_group INT REFERENCES groups(id_group),
    CHECK ((id_user IS NOT NULL) <> (id_group IS NOT NULL)), -- XOR
    repo_url TEXT,
    screenshots JSONB,
    notes TEXT,
    submission_status TEXT CHECK (submission_status IN ('submitted','pending')) DEFAULT 'submitted',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE hackathons (
    id_hackathon SERIAL PRIMARY KEY,
    hackathon_name TEXT NOT NULL,
    hackathon_description TEXT,
    start_at TIMESTAMPTZ,
    end_at TIMESTAMPTZ,
    hackathon_status TEXT CHECK (hackathon_status IN ('upcoming','ongoing','finished')) DEFAULT 'upcoming',
    created_by INT REFERENCES users(id_user),
    allow_teams BOOLEAN DEFAULT TRUE
);

CREATE TABLE hackathon_participants (
    id_participant SERIAL PRIMARY KEY,
    id_hackathon INT REFERENCES hackathons(id_hackathon) ON DELETE CASCADE,
    id_user INT REFERENCES users(id_user),
    id_group INT REFERENCES groups(id_group),
    CHECK ((id_user IS NOT NULL) <> (id_group IS NOT NULL)),
    UNIQUE (id_hackathon, id_user),
    UNIQUE (id_hackathon, id_group)
);

CREATE TABLE hackathon_scores (
    id_score SERIAL PRIMARY KEY,
    id_hackathon INT REFERENCES hackathons(id_hackathon) ON DELETE CASCADE,
    id_participant INT REFERENCES hackathon_participants(id_participant) ON DELETE CASCADE,
    scores JSONB,
    total NUMERIC NOT NULL,
    UNIQUE (id_hackathon, id_participant)
);

CREATE TABLE project_submissions (
    id_project_submissions SERIAL PRIMARY KEY,
    id_template INT REFERENCES project_templates(id_template) ON DELETE CASCADE,
    id_user INT REFERENCES users(id_user),
    id_group INT REFERENCES groups(id_group),
    CHECK ((id_user IS NOT NULL) <> (id_group IS NOT NULL)),
    repo_url TEXT,
    demo_url TEXT,
    screenshots JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE project_comments (
    id_comment SERIAL PRIMARY KEY,
    id_project_submissions INT REFERENCES project_submissions(id_project_submissions) ON DELETE CASCADE,
    id_user INT REFERENCES users(id_user),
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE project_votes (
    id_vote SERIAL PRIMARY KEY,
    id_project_submissions INT REFERENCES project_submissions(id_project_submissions) ON DELETE CASCADE,
    id_user INT REFERENCES users(id_user),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (id_project_submissions, id_user)
);

CREATE TABLE events (
    id_event SERIAL PRIMARY KEY,
    event_type TEXT CHECK (event_type IN ('tutoring','life_skills','english')) NOT NULL,
    title TEXT NOT NULL,
    event_description TEXT,
    event_date DATE NOT NULL,
    id_tutor INT REFERENCES users(id_user),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_registrations (
    registration_id SERIAL PRIMARY KEY,
    id_event INT REFERENCES events(id_event) ON DELETE CASCADE,
    id_user INT REFERENCES users(id_user) ON DELETE CASCADE,
    registration_status TEXT CHECK (registration_status IN ('registered','attended','missed')) DEFAULT 'registered',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (id_event, id_user)
);

-- ======================== // PIVOT TABLES // ========================
CREATE TABLE user_roles(
    id_user INT REFERENCES users(id_user) ON DELETE CASCADE,
    id_role INT REFERENCES roles(id_role) ON DELETE CASCADE,
    id_tl_area INT REFERENCES tl_areas(id_tl_area),
    PRIMARY KEY (id_user, id_role, id_tl_area)
);

CREATE TABLE user_skills(
    id_user INT REFERENCES users(id_user) ON DELETE CASCADE,
    id_skill INT REFERENCES skills(id_skill) ON DELETE CASCADE,
    user_level SMALLINT CHECK (user_level BETWEEN 1 AND 5),
    PRIMARY KEY (id_user, id_skill)
);

CREATE TABLE user_badges(
    id_user INT REFERENCES users(id_user) ON DELETE CASCADE,
    id_badge INT REFERENCES badges(id_badge) ON DELETE CASCADE,
    awarded_at TIMESTAMPTZ DEFAULT NOW(),
    awarded_by INT REFERENCES users(id_user),
    PRIMARY KEY (id_user, id_badge)
);

CREATE TABLE group_members (
    id_group INT REFERENCES groups(id_group) ON DELETE CASCADE,
    id_user INT REFERENCES users(id_user) ON DELETE CASCADE,
    member_role TEXT CHECK (member_role IN ('leader','member')) DEFAULT 'member',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id_group, id_user)
);

CREATE UNIQUE INDEX idx_group_limit ON group_members(id_group, id_user);