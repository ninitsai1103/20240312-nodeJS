import express from "express";
import moment from "moment";
import fs from "fs";
import {resolve} from "path";
const __dirname = import.meta.dirname;

const app = express();

// top down 
const writeToLog = (req, res, next) => {
    const {ip, path} = req;
    const accessData = moment().format("YYYY-MM-DD HH:mm:ss");
    const accessLog = `${accessData} ${ip} ${path}\r\n`;
    fs.appendFile(resolve(__dirname, "access.log"),accessLog, (error) => {
        if(error){
            console.log("寫入失敗");
        }
    });
    next();
}

// middleware
const errorToLog = (req, res, next) => {
    const {ip, path} = req;
    const accessData = moment().format("YYYY-MM-DD HH:mm:ss");
    const accessLog = `${accessData} ${ip} ${path}\r\n`;
    fs.appendFile(resolve(__dirname, "error.log"),accessLog, (error) => {
        if(error){
            console.log("寫入失敗");
        }
    });
    next();
}

const checkLogin = (req, res, next) => {
    if(req.query.code === "464"){
        next();
    }else{
        res.send("請先登入");
    }
}

app.use(writeToLog);
app.get("/", (req, res) => {
    // const {ip, path} = req;

    // const accessData = moment().format("YYYY-MM-DD HH:mm:ss");
    // const accessLog = `${accessData} ${ip} ${path}\r\n`;
    // fs.appendFile(resolve(__dirname, "access.log"),accessLog, (error) => {
    //     if(error){
    //         console.log("寫入失敗");
    //     }
    // });
    // writeToLog(req);
    res.send("網頁首頁");
});

app.get("/login", (req, res) => {
    // const {ip, path} = req;

    // const accessData = moment().format("YYYY-MM-DD HH:mm:ss");
    // const accessLog = `${accessData} ${ip} ${path}\r\n`;
    // fs.appendFile(resolve(__dirname, "access.log"),accessLog, (error) => {
    //     if(error){
    //         console.log("寫入失敗");
    //     }
    // });
    // writeToLog(req);
    res.send("登入頁面");
});

app.get("/about", (req, res) => {
    // const {ip, path} = req;

    // const accessData = moment().format("YYYY-MM-DD HH:mm:ss");
    // const accessLog = `${accessData} ${ip} ${path}\r\n`;
    // fs.appendFile(resolve(__dirname, "access.log"),accessLog, (error) => {
    //     if(error){
    //         console.log("寫入失敗");
    //     }
    // });
    // writeToLog(req);
    res.send("關於我");
});

app.get("/admin", checkLogin, (req, res) => {
    // 假設收到code=464就登入成功
    // if(req.query.code === "464"){
        res.send("後臺首頁");
    // }else{
    //     res.send("請先登入");
    // }

});

app.get("/setting", checkLogin, (req, res) => {
    // if(req.query.code === "464"){
        res.send("設定頁");
    // }else{
    //     res.send("請先登入");
    // }
});

app.all("*", errorToLog, (req, res) => {
    res.send("<h1>找不到頁面</h1>");
});

app.listen(3000, () => {
    console.log("伺服器啟動於 http://localhost:3000");
})