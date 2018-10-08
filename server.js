const express = require("express")
const path = require("path")
const hbs = require("hbs")
//const mongoose = require("mongoose")
const session= require("express-session")
//const moment = require("moment")
const favicon = require("serve-favicon")

/*                  SETUP               */
const app = express()
//app.use(favicon(path.join(__dirname, 'icons', 'favicon.ico')))
app.set("view engine", "hbs")
// hbs.registerPartials(__dirname+"/views/partials")
//mongoose.Promise = global.Promise

/*
mongoose.connect("mongodb://localhost:27017/MP2",{
    useNewUrlParser:true
})
*/

/*
mongoose.connect("mongodb://memehub:memehub123@ds133622.mlab.com:33622/webapde_mc03",{
    useNewUrlParser:true
})
*/

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
}

/*                  ROUTES               */
app.listen(process.env.PORT || 3000, ()=>{
    //clearDB()
    console.log("Now listening on port 3000...")
})