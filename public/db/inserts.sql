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
VALUES (2, 3, 1, 'Alex', 'Tuiran', 'alex@email.com', '123');