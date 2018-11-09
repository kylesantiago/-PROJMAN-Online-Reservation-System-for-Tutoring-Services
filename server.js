const express = require("express")
const path = require("path")
const hbs = require("hbs")
const session= require("express-session")
//const moment = require("moment")
const favicon = require("serve-favicon")

/*                  DATABASE                   */
require("./config/database.js")
const Tutor = require("./models/tutor.js")
const Student = require("./models/student.js")
const Slot = require("./models/slot.js")

/*                  SETUP               */
const app = express()
//app.use(favicon(path.join(__dirname, 'icons', 'favicon.ico')))
app.set("view engine", "hbs")
hbs.registerPartials(__dirname+"/views/partials")

app.use(express.static(__dirname+"/private"))
app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:"supersecrethash",
    name:"OTRS",
    // 1 hour sessions
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(require("./controllers"))

// SETUP STATIC FILES
app.use(express.static(path.join(__dirname, "private")))

function clearDB(){
    console.log("Clearing DB...")
    Tutor.model.remove({}).then((result)=>{
        console.log("[Tutor] CLEAR SUCCESS")
    })
    Student.model.remove({}).then((result)=>{
        console.log("[Student] CLEAR SUCCESS")
    })
    Slot.model.remove({}).then((result)=>{
        console.log("[Slot] CLEAR SUCCESS")
    })
}

function fillDB(){
    console.log("Filling DB...")
    require("./models/add_test.js")
}

/*                  ROUTES               */
app.listen(process.env.PORT || 3000, ()=>{
    clearDB()
    fillDB()
    console.log("Now listening on port 3000...")
})