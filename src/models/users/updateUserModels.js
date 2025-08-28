import pool from "../../middleware/connection.js";

const updateUser = async (id_user, { id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user }) => {
    const { rows } = await pool.query(
        `UPDATE users
        SET id_city = $1,
        id_cohort = $2,
        id_clan = $3,
        first_name = $4,
        middle_name = $5,
        first_surname = $6,
        second_surname = $7,
        email = $8,
        password_user = $9
        WHERE id_user = $10
        RETURNING id_city, id_cohort, id_clan, first_name, middle_name, first_surname, second_surname, email, password_user`,
        [ id_city, id_cohort, id_clan, first_name, middle_name, first_surname ?? null, second_surname ?? null, email, password_user, id_user]
    );
    return rows[0];
};

export default updateUser;