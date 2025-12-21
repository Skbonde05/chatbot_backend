import express from "express";
import { handleMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/message", handleMessage);

export default router;
