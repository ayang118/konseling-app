import express from "express";
import {
  getDiagnosis,
  addDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
} from "../controllers/diagnosisController.js";

const router = express.Router();

router.get("/", getDiagnosis);
router.post("/", addDiagnosis);
router.put("/:id", updateDiagnosis);
router.delete("/:id", deleteDiagnosis);

export default router;
