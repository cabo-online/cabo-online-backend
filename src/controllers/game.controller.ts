import { GameManager } from "../lib";

 export const createInitialGame = async (req: any, res: any) => {
    let newGameResponse;
    const { name } = req.body;

    if (!name) {
        newGameResponse = {
            status: 400,
            message: 'Must Provide Name',
            success: false
        } 
    } else {
        const mgr = GameManager.getInstance();
        newGameResponse = await mgr.createInitialGame({ name });
    }

    console.log('newGameResponse', newGameResponse);

    res.json(newGameResponse);
}