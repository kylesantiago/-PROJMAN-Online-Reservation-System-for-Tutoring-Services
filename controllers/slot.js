const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const session= require("express-session")
const cookieparser = require("cookie-parser")
const fs = require("fs")
const path = require("path")

/*                  SETUP               */
const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})
app.use(cookieparser())

module.exports = router