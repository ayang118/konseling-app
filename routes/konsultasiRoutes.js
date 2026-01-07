import express from "express";
import { konsultasiSiswa } from "../controllers/konsultasiController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// SISWA WAJIB LOGIN
router.post("/", protect, authorize("siswa"), konsultasiSiswa);

export default router;
