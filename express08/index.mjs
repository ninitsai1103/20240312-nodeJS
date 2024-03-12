import express from "express";
import {fileURLToPath} from "url";
import {dirname, resolve} from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(resolve(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("網頁首頁");

});

app.listen(3000, () => {
    console.log("伺服器啟動於 http://localhost:3000");
});