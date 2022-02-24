import express from "express";
import { createInitialGame, joinGame } from "../controllers";
const router = express.Router();

router.post("/create", createInitialGame);
router.post("/join", joinGame);

export default router;
