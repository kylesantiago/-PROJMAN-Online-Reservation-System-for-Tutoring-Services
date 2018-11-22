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

// Start of Kyle
router.post("/getAll",(req,res)=>{
    console.log("POST student/getAll");
    Student.getAll().then((result)=>{
        if(result){
            res.send(result);
        }
        else{
            console.log("No Students");
        }
    },(err)=>{
        console.log("Error in getting slots");
    });
})
// End of Kyle

router.post("/addAcc", urlencoder, (req,res)=>{
    Student.addNew({
        email: req.body.addAcc_email,
        password: "123",
        school: req.body.addAcc_school,
        rate: 500,
        hours: 3,
        contact_info: req.body.addAcc_contact, //phone number?
        tutor: "Mica Pena", //tutor name or id?
        reserved_slots: [], //ID to of the slots reserved by the student
        fullname: req.body.addAcc_fullname,
        address: req.body.addAcc_address,
        disabled: false
    }).then((newDoc)=>{
        res.redirect("/")
    }, (err)=>{
        
    })
})

/*                                  AJAX HERE                                */

// AJAX ROUTE TO DISABLE/ENABLE STUDENT ACCOUNT
router.post("/toggleStatus", urlencoder, (req,res)=>{
    Student.toggleStatus(req.body.id,req.body.newStatus).then((newDoc)=>{
        if (newDoc)
            res.send({
                result:'success',
                newDoc
            })
    })
})

// AJAX ROUTE TO EDIT STUDENT ACCOUNT
router.post("/editStudent", urlencoder, (req,res)=>{
    Student.editStudent(req.body.id,req.body.newName,req.body.newSchool,req.body.newAddress,req.body.newEmail,req.body.newContact).then((newDoc)=>{
        if (newDoc)
            res.send({
                result:'success',
                newDoc
            })
    })
})

router.post("/getByID", urlencoder, (req,res)=>{
    console.log("GET /student/getByID" + req.body.id)
    Student.findStudentByID(req.body.id).then((student)=>{
        res.send(student)
    }, (err)=>{
        
    })
})

module.exports = router