import express from "express";
import path from "path";
import multer from "multer";
import controllers from "./controllers/index.js";

const app = express();
const port = 8080;
const __dirname = path.resolve();
let fileId = 0;
var storage = multer.diskStorage({
    //경로 설정
    destination: function (req, file, cb) {

        cb(null, 'files');
    },
    filename: function (req, file, cb) {

        const originalName = file.originalname;

        let mimeType;

        switch (file.mimetype) {
            case "image/jpeg":
                mimeType = "jpg";
                break;
            case "image/png":
                mimeType = "png";
                break;
            case "image/gif":
                mimeType = "gif";
                break;
            case "image/bmp":
                mimeType = "bmp";
                break;
            default:
                mimeType = "jpg";
                break;
        }

        cb(null, `${fileId++}_${originalName}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

app.route('/mint').post(upload.single("img"), controllers.mint);

app.route('/').get(controllers.mainpage);

app.listen(port, () => {
    console.log(`running server port : ${port}`);
});
