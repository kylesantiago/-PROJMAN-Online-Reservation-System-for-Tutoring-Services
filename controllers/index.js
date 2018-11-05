const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const session= require("express-session")
const cookieparser = require("cookie-parser")
/*
const MemeService = require("../models/memeService")
const UserService = require("../models/userService")
*/
const fs = require("fs")
const path = require("path")

/*                  SETUP               */
const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})
app.use(cookieparser())

/*
router.use("/user", require("./user"))
router.use("/meme", require("./meme"))
router.use("/tag", require("./tag"))
*/

// GET ALL PUBLIC MEMES
router.get("/",(req,res)=>{
    console.log("GET /")
    let user = req.session.user
    res.render("index.hbs")
})

// LOGIN USER
router.post("/loginSuccess", urlencoder, (req,res)=>{
    res.render("admin.hbs")
})

// AJAX ROUTE TO CHECK CREDENTIALS
router.post("/login", urlencoder, (req,res)=>{
    // check for account
    res.send({
        result:"success"
    })
})

// LOGOUT USER
router.get("/logout", (req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

module.exports = router