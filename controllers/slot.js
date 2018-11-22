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

// Start of Kyle
router.post("/blockSlot",urlencoder,(req,res)=>{
    console.log("POST slot/blockSlot");
    var startTime = req.body.startTime;
    var note = req.body.note;
    var interval = req.body.interval;
    var location = req.body.location;
    var date = req.body.date;
    Slot.addNew({
        start_time:startTime,
        intervals:interval,
        date,
        type:"blocked",
        tutor_id: req.session.id,
        student_id:null,
        notes:note,
        location
    }).then((result)=>{
        addToTutor(req.session.userId,res,result);
    },(err)=>{
        console.log("Error in adding blocked slots");
    })
})

router.post("/reserveSlot",urlencoder,(req,res)=>{
    console.log("POST slot/reserveSlot");
    var startTime = req.body.startTime;
    var note = req.body.note;
    var interval = req.body.interval;
    var location = req.body.location;
    var date = req.body.date;
    var tutor_id = req.body.tutor;
    Slot.addNew({
        start_time:startTime,
        intervals:interval,
        date,
        type:"reserved",
        tutor_id,
        student_id:req.session.userId,
        notes:note,
        location
    }).then((result)=>{
        addToStudent(req.session.userId,res,result);
    },(err)=>{
        console.log("Error in adding blocked slots");
    })
})

function addToStudent(req,res,slot){
    Student.addReserved(req,slot._id).then((result)=>{
        getAllSlots(res);
    },(err)=>{
        console.log("Error in adding blocked slots");
    })
}

function addToTutor(req,res,slot){
    Tutor.addBlocked(req,slot._id).then((result)=>{
        getAllSlots(res);
    },(err)=>{
        console.log("Error in adding blocked slots");
    })
}

function removeFromTutor(req,res,slot){
    console.log(slot);
    Tutor.removeBlocked(req,slot).then((result)=>{
        getAllSlots(res);
    },(err)=>{
        console.log("Error in removing blocked slots");
    })
}

function removeFromStudent(req,res,slot){
    console.log(slot);
    Student.removeReserved(req,slot).then((result)=>{
        getAllSlots(res);
    },(err)=>{
        console.log("Error in removing reserved slots");
    })
}

router.post("/removeSlot",urlencoder,(req,res)=>{
    console.log("POST slot/removeSlot");
    var _id = req.body.id;
    Slot.removeSlot(_id).then((result)=>{
        removeFromTutor(req.session.userId,res,_id);
    },(err)=>{
        console.log("Error in removing blocked slots");
    })
})

router.post("/removeResSlot",urlencoder,(req,res)=>{
    console.log("POST slot/removeResSlot");
    var _id = req.body.id;
    console.log(_id);
    Slot.removeSlot(_id).then((result)=>{
        removeFromStudent(req.session.userId,res,_id);
    },(err)=>{
        console.log("Error in removing reserved slots");
    })
})

router.post("/getSlots",(req,res)=>{
    console.log("POST slot/getSlots");
    getAllSlots(res);
})

function getAllSlots(res){
    Slot.getAll().then((result)=>{
        if(result){
            res.send(result);
        }
        else{
            console.log("No Slots");
        }
    },(err)=>{
        console.log("Error in getting slots");
    });
}
// End of Kyle

// ROLO's AJAX

router.get('/getStudentsWeek', (req, res)=>{
    Slot.getAllSlotsOfThisWeek().then((results)=>{
        //console.log(results)
        res.send(results);
    }, (err)=>{
        console.log(err);
        res.send(err);
    })
})

router.get('/getStudentsMonth', (req, res)=>{
    Slot.getAllSlotsOfThisMonth().then((results)=>{
        //console.log(results)
        res.send(results);
    }, (err)=>{
        console.log(err);
        res.send(err);
    })
})

router.get('/getStudent/:id', (req, res)=>{
    Student.getStudentViaID(req.params.id).then((result)=>{
        //console.log(result)
        res.send(result)
    }, (err)=>{
        console.log(err)
        res.send(err)
    })
})


module.exports = router