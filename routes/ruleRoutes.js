import express from "express";
import {
  getRules,
  addRule,
  updateRule,
  deleteRule,
} from "../controllers/ruleController.js";

const router = express.Router();

router.get("/", getRules);
router.post("/", addRule);
router.put("/:id", updateRule);
router.delete("/:id", deleteRule);

export default router;
