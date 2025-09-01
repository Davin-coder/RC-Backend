import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import userRoutes from "./src/routes/users/userRoutes.js";
import groupsRoutes from "./src/routes/groups/groupsRoutes.js";
import eventsRoutes from "./src/routes/events/eventsRoutes.js";
import eventRegistrationsRoutes from "./src/routes/events/registrationsRoutes.js";
import hackathonsRoutes from "./src/routes/hackathons/hackathonsRoutes.js";
import challengesRoutes from "./src/routes/challenges/challengesRoutes.js";
import projectsRoutes from "./src/routes/projects/projectsRoutes.js";
import templateRoutes from "./src/routes/templates/templateRoutes.js";   // 👈 nueva importación

dotenv.config();
const app = express();
const PORT = process.env.EXPRESSPORT || 3000;

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || "1234567890",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  },
}));

// Healthcheck
app.get("/", (_req, res) => res.send("✅ Server is running!"));

// ============= // Users EndPoints // =============
app.use("/users", userRoutes);

// ============= // Groups EndPoints // =============
app.use("/groups", groupsRoutes);

// ============= // Events EndPoints // =============
app.use("/events", eventsRoutes);
app.use("/events", eventRegistrationsRoutes);

// ============= // Hackathons EndPoints // =============
app.use("/hackathons", hackathonsRoutes);

// ============= // Challenges EndPoints // =============
app.use("/challenges", challengesRoutes);

// ============= // Projects EndPoints // =============
app.use("/projects", projectsRoutes);

// ============= // Templates EndPoints // =============
app.use("/templates", templateRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
