
export default (req, res) => {
    const name = req.body.name;
    const symbol = req.body.symbol;
    const address = req.body.address;
    const discription = req.body.discription;
    const img = req.file;
    if (name && symbol && address && discription && img) {
        console.log(name, symbol, address, discription, img);
        res.status(200).send("ok");
    } else {
        res.status(400);
    }
}