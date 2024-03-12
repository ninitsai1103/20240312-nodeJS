// import express from "express";
// import {resolve} from "path";
const express = require("express");
const {resolve} = require("path");

// const __dirname = import.meta.dirname;

const app = express();
app.use(express.static(resolve(__dirname, "public")));
app.use("/bootstrap", express.static(resolve(__dirname, "node_modules/bootstrap/dist")))
app.use("/jquery", express.static(resolve(__dirname, "node_modules/jquery/dist")))
app.use('/fontawesome', express.static(resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free')));


app.get("/", (req, res) => {
    res.send("網頁首頁");
})


app.listen(3000, () => {
    console.log("伺服器啟動於 http://localhost:3000");
})