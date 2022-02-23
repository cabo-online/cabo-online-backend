import mongoose, { Schema } from "mongoose";
import { IGame } from "./game.interface";

export const DOCUMENT_NAME = "Game";
export const COLLECTION_NAME = "games";

const GameSchema: Schema = new Schema(
  {
    game_code: String,
    players: [String]
  },
  {
    timestamps: true,
  }
);

export const Game = mongoose.model<IGame>(
  DOCUMENT_NAME,
  GameSchema,
  COLLECTION_NAME
);
