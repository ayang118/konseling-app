import express from "express";
import { getPublicInfo } from "../controllers/publicController.js";

const router = express.Router();

router.get("/info", getPublicInfo);

export default router;
