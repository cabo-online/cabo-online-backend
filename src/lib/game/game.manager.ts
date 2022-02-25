import { IGameDTO } from "./game.interface";
import { IJoinGameDTO } from ".";
import gameRepository from "./game.repository";
import { errorResponse, invalidParamResponse, missingParamResponse, successResponse } from "../common/responses";
import { PARAM_GAME_CODE, PARAM_NAME } from "./constants";

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
            return missingParamResponse(PARAM_NAME);
        }

        const createdGame = await gameRepository.createGame(data);

        if (createdGame.success) return successResponse(201, createdGame.message, createdGame.data);

        return errorResponse(400, createdGame.message);
    }



    async joinGame(data: IJoinGameDTO) {
        if (!data.name) {
            return missingParamResponse(PARAM_NAME);
        }

        if (!data.game_code) {
            return missingParamResponse(PARAM_GAME_CODE);
        }

        let gameToJoin = await gameRepository.findGameByGameCode(data.game_code);

        if (!gameToJoin) {
            return invalidParamResponse(PARAM_GAME_CODE, data.game_code);
        }

        const response = await gameRepository.addPlayerToGame(data.game_code, data.name);

        if (response?.success) return successResponse(200, response.message, response.data);

        return errorResponse(400, response?.message);
    }

    async findGameByGameCode(game_code: string) {
        if (!game_code) {
            return missingParamResponse(PARAM_GAME_CODE);
        }

        let game = await gameRepository.findGameByGameCode(game_code);

        if (!game) {
            return invalidParamResponse(PARAM_GAME_CODE, game_code);
        }

        return {
            success: true,
            message: 'Game Found',
            data: {
                id: game.id,
                game_code: game.game_code,
                players: game.players
            }
        }
    }
}