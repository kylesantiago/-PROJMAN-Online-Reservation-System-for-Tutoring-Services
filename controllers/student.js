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


/*                  DATABASE                   */
const Tutor = require("../models/tutor.js")
const Student = require("../models/student.js")
const Slot = require("../models/slot.js")

/*                 CODE                 */
router.post("/getByID", urlencoder, (req,res)=>{
    console.log("GET /student/getByID" + req.body.id)
    Student.findStudentByID(req.body.id).then((student)=>{
        res.send(student)
    }, (err)=>{
        
    })
})




module.exports = router