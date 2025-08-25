import express from "express";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const PORT = process.env.EXPRESSPORT || 3000;

app.use(express.json());

// test endpoint
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

/**********************************/
/************USERS*****************/
/**********************************/

app.use("/users", userRoutes);

/**********************************/
/***********CLEANINGS**************/
/**********************************/

app.use("/cleanings", cleaningRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});