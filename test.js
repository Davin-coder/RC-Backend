import bcrypt from "bcrypt";

(async () => {
    const hash = await bcrypt.hash("12345", 10);
    console.log(hash);
})();
