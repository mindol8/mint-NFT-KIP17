export default (req, res) => {
    res.status(200).sendFile(__dirname + '/index.html');
}