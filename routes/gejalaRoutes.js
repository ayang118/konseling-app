import express from "express";
import {
  getGejala,
  addGejala,
  updateGejala,
  deleteGejala,
} from "../controllers/gejalaController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔓 PUBLIC: siswa boleh melihat gejala (tanpa token)
router.get("/", getGejala);

// 🔐 ADMIN ONLY
router.post("/", protect, authorize("admin"), addGejala);
router.put("/:id", protect, authorize("admin"), updateGejala);
router.delete("/:id", protect, authorize("admin"), deleteGejala);

export default router;
