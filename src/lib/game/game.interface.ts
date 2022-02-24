import { Document } from "mongoose";

export interface IGame extends Document {
    game_code: string,
    players: [string]
}

export interface IGameDTO {
    name: string
}

export interface IJoinGameDTO {
    name: string,
    game_code: string
}