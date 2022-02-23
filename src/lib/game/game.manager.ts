import { IGameDTO } from "./game.interface";
import { Game } from "./game.model";
import { generate } from 'randomstring';

export class GameManager {
    private static _theInstance: GameManager = null as any;

    static getInstance(): GameManager {
      if (GameManager._theInstance) return GameManager._theInstance;
  
      GameManager._theInstance = new GameManager();
  
      return GameManager._theInstance;
    }

    private constructor() {}

    async createInitialGame(data: IGameDTO) {
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
}