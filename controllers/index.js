const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const session= require("express-session")
const cookieparser = require("cookie-parser")

const Slot = require("../models/slot.js");
const Student = require("../models/student.js");
const Tutor = require("../models/tutor.js");

const fs = require("fs")
const path = require("path")

/*                  SETUP               */
const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})
app.use(cookieparser())


router.use("/slot", require("./slot"))
router.use("/student", require("./student"))
router.use("/tutor", require("./tutor"))


// GET ALL PUBLIC MEMES
router.get("/",(req,res)=>{
    console.log("GET /")
    let user = req.session.user
    res.render("index.hbs")
    
})

// LOGIN USER
router.post("/loginSuccess", urlencoder, (req,res)=>{
    var email = req.body.email;
    var password = req.body.pword;
    
    Student.getSpecific(email,password).then((found)=>{
        if(found){
            console.log("Found Student");
            req.session.user = found._id;
            console.log(req.session.user);
            res.render("admin.hbs");
        }
        else{
            console.log("Not Student");
            Tutor.getSpecific(email,password).then((found)=>{
                if(found){
                    console.log("Found Tutor");
                    req.session.user = found._id;
                    console.log(req.session.user);
                    res.render("admin.hbs");
                }
                else{
                    console.log("Not Tutor Either");
                    res.render("index.hbs");
                }
            },(err)=>{
                console.log("Tutor Error");
            })
        }
    },(err)=>{
        console.log("Student Error");
    })
    
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

// always remember to export the router for index.js
module.exports = router