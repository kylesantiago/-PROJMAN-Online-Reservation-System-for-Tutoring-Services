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
router.get("/getSlots", urlencoder, (req,res)=>{
    console.log("GET /slot/getSlots")
    Slot.getAll().then((slots)=>{
        res.send(slots)
    }, (err)=>{
        
    })
})

router.get("/getApproved", urlencoder, (req,res)=>{
    console.log("GET /slot/getApproved")
    Slot.getApproved().then((slots)=>{
        res.send(slots)
    }, (err)=>{
        
    })
})

router.get("/getPending", urlencoder, (req,res)=>{
    console.log("GET /slot/getPending")
    Slot.getPending().then((slots)=>{
        res.send(slots)
    }, (err)=>{
        
    })
})

router.post("/update", urlencoder, (req, res)=>{
    console.log("POST /slot/update")
    
    Slot.updateStatus(req.body.id, req.body.status).then((succ)=>{
        
    }, (err)=>{
        
    })
    
})


module.exports = router