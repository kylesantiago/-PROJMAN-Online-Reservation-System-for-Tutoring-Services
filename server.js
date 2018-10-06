const express = require("express")
const ejs = require("ejs")

const app = express()

app.set("view engine","ejs")

app.listen(3000,()=>{
    console.log("Listening to port 3000")
});