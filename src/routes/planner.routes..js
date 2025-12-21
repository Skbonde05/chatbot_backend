import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  startTripPlanner, continueTripPlanner,
  startGiftPlanner, continueGiftPlanner,
  startThemePlanner, continueThemePlanner
} from "../controllers/planner.controller.js";

const router = express.Router();

// Trip
router.post("/trip/start", authMiddleware, startTripPlanner);
router.post("/trip/continue", authMiddleware, continueTripPlanner);

// Gift
router.post("/gift/start", authMiddleware, startGiftPlanner);
router.post("/gift/continue", authMiddleware, continueGiftPlanner);

// Theme
router.post("/theme/start", authMiddleware, startThemePlanner);
router.post("/theme/continue", authMiddleware, continueThemePlanner);

export default router;
