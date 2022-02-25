import express from "express";
import { createInitialGame, getGameByGameCode, joinGame } from "../controllers";
const router = express.Router();

router.post("/create", createInitialGame);
router.post("/join", joinGame);
router.get("/game/:id", getGameByGameCode);

export default router;
