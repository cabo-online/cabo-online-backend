import express from "express";
import { createInitialGame } from "../controllers";
const router = express.Router();

router.post("/create", createInitialGame);

export default router;
