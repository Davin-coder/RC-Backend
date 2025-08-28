import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/users/userRoutes.js";
import groupsRoutes from "./src/routes/groups/groupsRoutes.js";
import eventsRoutes from "./src/routes/events/eventsRoutes.js";
import hackathonsRoutes from "./src/routes/hackathons/hackathonsRoutes.js";
import challengesRoutes from "./src/routes/challenges/challengesRoutes.js"

dotenv.config();
const app = express();
const PORT = process.env.EXPRESSPORT || 3000;

app.use(express.json());

// test endpoint
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// ============= // Users EndPoints // =============
app.use("/users", userRoutes);

// ============= // Groups EndPoints // =============
app.use("/groups", groupsRoutes);

// ============= // Events EndPoints // =============
app.use("/events", eventsRoutes);

// ============= // Hackathons EndPoints // =============
app.use("/hackathons", hackathonsRoutes);

// ============= // Hackathons EndPoints // =============
app.use("/challenges", challengesRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});