import express from "express";
import path from "path";
import controllers from "./controllers/index.js";

const app = express();
const port = 8080;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

app.post('/mint', controllers.mint);

app.get('/', controllers.mainpage);

app.listen(port, () => {
    console.log(`running server port : ${port}`);
});
