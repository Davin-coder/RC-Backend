import pool from "../../middleware/connection.js";

const createUser = async ({ id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user }) => {
    const { rows } = await pool.query(
        `INSERT INTO users
        (id_city,
        id_cohort,
        id_clan,
        first_name,
        middle_name,
        first_surname,
        second_surname,
        email,
        password_user)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id_user, id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user`,
        [id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user]
    );
    return rows[0];
};

export default createUser;