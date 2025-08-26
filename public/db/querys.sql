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