import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import db from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import gejalaRoutes from "./routes/gejalaRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import diagnosisRoutes from "./routes/diagnosisRoutes.js";
import konsultasiRoutes from "./routes/konsultasiRoutes.js";
import riwayatRoutes from "./routes/riwayat.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==============================
// 📊 Swagger Documentation Setup
// ==============================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistem Pakar Konseling API",
      version: "1.0.0",
      description:
        "API Documentation for Sistem Pakar Konseling SMK Kesehatan Muhammadiyah Kota Bogor",
    },
    servers: [{ url: "http://localhost:5000/api" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ==============================
// 💾 Database Connection
// ==============================
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected!");
  }
});

// ==============================
// 🧭 API ROUTES
// ==============================
app.use("/api/public", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gejala", gejalaRoutes);
app.use("/api/rules", ruleRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/konsultasi", konsultasiRoutes);
app.use("/api/riwayat", riwayatRoutes);
app.use("/api/users", usersRouter);

// ==============================
// 🌐 FRONTEND STATIC FILES
// ==============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve folder public
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// 🌐 FRONTEND STATIC FILES
// ==============================
app.use(express.static(path.join(__dirname, "public")));

// 404 khusus API saja
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});


// ==============================
// ⚠️ Error Handling Middleware
// ==============================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
});

// ==============================
// 🚀 START SERVER
// ==============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/api/docs`);
});
