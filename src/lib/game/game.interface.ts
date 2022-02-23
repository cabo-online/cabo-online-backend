import { Document } from "mongoose";

export interface IGame extends Document {
    game_code: string,
    players: [string]
}

export interface IGameDTO {
    name: string
}