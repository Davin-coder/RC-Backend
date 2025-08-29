import bcrypt from "bcrypt";

(async () => {
    const hash = await bcrypt.hash("andres123", 15);
    console.log(hash);
})();
