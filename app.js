import express from "express";
import path from "path";
import multer from "multer";
import controllers from "./controllers/index.js";

const app = express();
const port = 8080;
const __dirname = path.resolve();
const upload = multer({ dest: 'files' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

app.route('/mint').post(upload.single("img"), controllers.mint);

app.route('/').get(controllers.mainpage);

app.listen(port, () => {
    console.log(`running server port : ${port}`);
});
