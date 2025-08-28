INSERT INTO cities (city_name)
VALUES ('Medellin'), ('Barranquilla');

INSERT INTO cohorts (start_date, end_date)
VALUES
('2023-02-01', '2023-12-14'),
('2024-02-01', '2024-12-14'),
('2025-02-01', '2025-12-14');

INSERT INTO roles (role_name)
VALUES ('team leader'), ('tutor'), ('coder'), ('admin');

INSERT INTO tl_areas (area_name)
VALUES ('desarrollo'), ('HPLV'), ('ingles'), ('comercio');

INSERT INTO skills (skill_name)
VALUES ('JavaScript'), ('Angular'), ('Python'), ('HTML'), ('CSS'), ('SQL');

-- badges
-- challenges
-- project_templates

INSERT INTO clans (clan_name, shift)
VALUES
('Macondo', 'AM'),
('Manglar', 'AM'),
('Tayrona', 'AM'),
('Caiman', 'PM'),
('Malecon', 'PM');

INSERT INTO users
(id_city, id_cohort, id_clan, first_name, first_surname, email, password_user)
VALUES 
(2, 3, 1, 'Alex', 'Tuiran', 'alex@email.com', '$2b$10$N9qo8uLOickgx2ZMRZo5e.uEV5nYeD1yfknhk6aoCA8DmSOS5ux5e'),
(1, 3, NULL, 'David', 'Martinez', 'DavidMartinez@email.com', '$2b$10$N9qo8uLOickgx2ZMRZo5e.uEV5nYeD1yfknhk6aoCA8DmSOS5ux5e'),
(1, 3, 1, 'Tony', 'Ficado', 'tony@email.com', '$2b$10$N9qo8uLOickgx2ZMRZo5e.uEV5nYeD1yfknhk6aoCA8DmSOS5ux5e');

INSERT INTO groups (group_name, id_creator)
VALUES ('Software Factory', 1);

INSERT INTO events (event_type, title, event_description, event_date)
VALUES ('life_skills', 'Meet Soft-Skills', 'Be a better human with this event', '2025-01-11');

INSERT INTO hackathons (h_title, h_desc, h_date, created_by)
VALUES ('Proyecto Eneba', 'Presenta tus enebas', '2025-11-07', 2);

INSERT INTO challenges (title, challenge_desc, difficulty)
VALUES ('Python Calculator', 'Create a calculator with python', 'beginner');


INSERT INTO users
(id_city, id_cohort, id_clan, first_name, first_surname, email, password_user)
VALUES 
(2, 3, 1, 'Eduardo', 'Pertuz', 'edu@email.com', '$2b$10$HD7XtAm6jEVj7ReIlfD94.06G3Rj80owUDjEbIsbt.wWbLpRp4Mle');

-- $2b$10$HD7XtAm6jEVj7ReIlfD94.06G3Rj80owUDjEbIsbt.wWbLpRp4Mle 