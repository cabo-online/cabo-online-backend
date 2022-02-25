import { IGameDTO } from ".";
import { generate } from 'randomstring';
import { Game } from "./game.model";

class GameRepository {
    async createGame(data: IGameDTO) {
        let game = new Game();

        game.players.push(data.name);
        game.game_code = await this._generateRandomGameCode();

        return game.save()
            .then(game => {
                return {
                    success: true,
                    message: 'Game Created',
                    data: {
                        id: game.id,
                        game_code: game.game_code,
                        players: game.players
                    }
                }
            }).catch(err => {
                return {
                    success: false,
                    message: 'Unknown error has occured',
                    data: {}
                }
            });
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

    async findGameByGameCode(game_code: string) {
        return await Game.findOne({ game_code }).exec();
    }

    async addPlayerToGame(game_code: string, playerToJoin: string) {
        let game = await Game.findOne({ game_code }).exec();

        game?.players.push(playerToJoin);

        return game?.save()
            .then(game => {
                return {
                    success: true,
                    message: `'${playerToJoin}' joined game with code ${game_code}`,
                    data: {
                        id: game.id,
                        game_code: game.game_code,
                        players: game.players
                    }
                }
            }).catch(err => {
                return {
                    success: false,
                    message: 'Unknown error has occured',
                    data: {}
                }
            });
    }
}

export default new GameRepository();