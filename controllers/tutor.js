const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const session= require("express-session")
const cookieparser = require("cookie-parser")
const fs = require("fs")
const path = require("path")
const Tutor = require("../models/tutor.js")

/*                  SETUP               */
const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})
app.use(cookieparser())

// Start of Kyle
router.post("/getAll", urlencoder, (req,res)=>{
    var temp = req.body.tutorOption;
    console.log("POST tutor/getAll");
    Tutor.getAll().then((result)=>{
        if(result){
            res.send(result);
        }
        else{
            console.log("No Tutors");
        }
    },(err)=>{
        console.log("Error in getting slots");
    });
})
// End of Kyle

module.exports = router