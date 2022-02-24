import { IGameDTO } from "./game.interface";
import { Game } from "./game.model";
import { generate } from 'randomstring';
import { IJoinGameDTO } from ".";

export class GameManager {
    private static _theInstance: GameManager = null as any;

    static getInstance(): GameManager {
      if (GameManager._theInstance) return GameManager._theInstance;
  
      GameManager._theInstance = new GameManager();
  
      return GameManager._theInstance;
    }

    private constructor() {}

    async createInitialGame(data: IGameDTO) {
        if (!data.name) {
            return {
                status: 400,
                message: 'Must Provide Name',
                success: false
            } 
        }

        let game = new Game();

        game.players.push(data.name);
        game.game_code = await this._generateRandomGameCode();

        game.save();

        return {
            success: true,
            message: 'Game Created',
            statusCode: 201,
            data: {
                id: game.id,
                game_code: game.game_code,
                players: game.players
            }
        };
    }

    private async _generateRandomGameCode() {
        let value = generate(10);
        let game = await Game.findOne({ game_code: value }).exec();

        while (game) {
            value = generate(10);
            game = await Game.findOne({ game_code: value }).exec();
        }

        return value;
    }

    async joinGame(data: IJoinGameDTO) {
        if (!data.name) {
            return {
                status: 400,
                message: 'Must Provide Name',
                success: false
            } 
        }

        if (!data.game_code) {
            return {
                status: 400,
                message: 'Must Provide Game Code',
                success: false
            } 
        }

        let gameToJoin = await Game.findOne({ game_code: data.game_code }).exec();

        if (!gameToJoin) {
            return {
                status: 400,
                message: 'Invalid Game Code',
                success: false
            }
        }

        gameToJoin.players.push(data.name);

        gameToJoin.save();

        return {
            status: 200,
            message: `${data.name} joined game with code ${data.game_code}`,
            success: true,
            data: {
                id: gameToJoin.id,
                game_code: gameToJoin.game_code,
                players: gameToJoin.players
            }
        }
    }
}