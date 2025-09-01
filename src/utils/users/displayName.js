const buildDisplayName = (u) => {
    const parts = [
        u.first_name,
        u.middle_name,
        u.first_surname,
        u.second_surname,
    ]
    .filter(Boolean)
    .map((s) => String(s).trim())
    .filter((s) => s.length > 0);
    return parts.join(" ").trim();
};

export default buildDisplayName