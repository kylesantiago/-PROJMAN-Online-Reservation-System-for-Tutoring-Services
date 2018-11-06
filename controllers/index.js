const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const session= require("express-session")
const cookieparser = require("cookie-parser")
const fs = require("fs")
const path = require("path")

/*                  DATABASE                   */
const Tutor = require("../models/tutor.js")
const Student = require("../models/student.js")
const Slot = require("../models/slot.js")

/*                  SETUP               */
const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})
app.use(cookieparser())

router.use("/slot", require("./slot"))
router.use("/student", require("./student"))
router.use("/tutor", require("./tutor"))

router.get("/",(req,res)=>{
    console.log("GET /")
    let type = req.session.type
    if (type != null) {
        res.redirect(307, "../loginSuccess")
    }

    res.render("index.hbs")
})

// LOGIN USER
router.get("/loginSuccess", (req,res)=>{
    let type = req.session.type
    if (type == "Student")
        res.render("user.hbs")
    if (type == "Tutor")
        res.render("admin.hbs")
})

// LOGOUT USER
router.get("/logout", (req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

/*      AJAX     */

// AJAX ROUTE TO CHECK CREDENTIALS
router.post("/login", urlencoder, (req,res)=>{
    // check for account
    Tutor.login(req.body.email,req.body.password).then((tutor)=>{
        if (tutor) {
            req.session.type = "Tutor"
            res.send({
                result:"success"
            })
        } else {
            Student.login(req.body.email,req.body.password).then((student)=>{
                if (student) {
                    req.session.type = "Student"
                    res.send({
                        result:"success"
                    })
                } else {
                    res.send({
                        result:"error"
                    })
                }
            })
        }
    })
})

module.exports = router