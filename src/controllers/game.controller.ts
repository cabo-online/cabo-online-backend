import { GameManager } from "../lib";

 export const createInitialGame = async (req: any, res: any) => {
    const { name } = req.body;

    const mgr = GameManager.getInstance();
    const newGameResponse = await mgr.createInitialGame({ name });

    console.log('newGameResponse', newGameResponse);

    res.json(newGameResponse);
}

export const joinGame = async (req: any, res: any) => {
    const { name, game_code } = req.body;

    const mgr = GameManager.getInstance();
    const joinGameResponse = await mgr.joinGame({ name, game_code });

    console.log('joinGameResponse', joinGameResponse);

    res.json(joinGameResponse);
}