import { mint, getNFT } from "../models/index.js";

export default async (req, res) => {
    const name = req.body.name;
    const symbol = req.body.symbol;
    const address = req.body.address;
    const description = req.body.description;
    const img = req.file;

    if (name && symbol && address && description && img) {
        const [mintStatus, msg] = await mint({ name, symbol, address, description, img });
        //console.log(mintStatus, msg)
        if (mintStatus) {
            const NFTList = await getNFT(address);
            res.status(200).send(NFTList);
        } else {
            res.status(400).send("fail");
        }
    } else {
        res.status(400).send("fail");
    }
}