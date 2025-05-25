// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db.js"

// // import routes (you'll create these)
import authRoutes from "./routes/auth.routes.js";
import docRoutes from "./routes/doc.routes.js";
import aiRoutes from "./routes/ai.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// // routes
app.use("/api/auth", authRoutes);

app.use("/api/docs", docRoutes);

app.use("/api/ai",aiRoutes)

// root
app.get("/", (req, res) => {
  res.send("Docs AI Backend is running ✅");
});

app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );


    