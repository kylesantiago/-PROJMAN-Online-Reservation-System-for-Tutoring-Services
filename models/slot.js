// create mongoose document ticket
const mongoose = require("mongoose")
const moment = require('moment')

// ROLO's ALGO
//for days of the week
var dateVals = []
var monthVals = []

for (var i = 1; i < 8; i++){
    var month = moment().month() + 1
    var stringDate = "" + moment().year() + "-" + month + "-" + moment().day(i).toString().split(" ")[2]
    dateVals.push(stringDate)
}

for (var i = 1; i < 32; i++){
    var month = moment().month() + 1
    if (i < 10){
        var stringDate = "" + moment().year() + "-" + month + "-" + 0 + i
    }
    else{
        var stringDate = "" + moment().year() + "-" + month + "-" + i
    }
    monthVals.push(stringDate)
}

var SlotSchema = mongoose.Schema({
    start_time: String, //? 00:00 to 23:59
    intervals: Number, //15 minute intervals
    date: String, //? Format: YYYY-MM-DD
    type: String, //reserved or blocked
    tutor_id: String,
    student_id: String,
    notes: String,
    location: String,
    status: String //Approved, Pending, Waitlisted
});

var Slot = mongoose.model("Slot", SlotSchema);

var exports = module.exports = {}

exports.schema = SlotSchema
exports.model = Slot

exports.addNew = function(slot){
    return new Promise(function(resolve, reject){
    var x = new Slot(slot)
    x.save().then((newItem)=>{
      resolve(newItem)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.getAll = function(){
    return new Promise(function(res, rej){
        Slot.find().then((items)=>{
            res(items)
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
    })
}

exports.getAll = function(){
    return new Promise(function(res, rej){
        Slot.find().then((items)=>{
            res(items)
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
    })
}

exports.getReserved = function(){
    return new Promise(function(res, rej){
        Slot.find({type: "reserved"}).then((items)=>{
            res(items)
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
        
    })
    
}

exports.getApproved = function(){
    return new Promise(function(res, rej){
        Slot.find({status: "Approved"}).then((items)=>{
            res(items)
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
        
    })
    
}

exports.getPending = function(){
    return new Promise(function(res, rej){
        Slot.find({status: "Pending"}).then((items)=>{
            res(items)
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
        
    })
    
}

exports.getWaitlisted = function(){
    return new Promise(function(res, rej){
        Slot.find({status: "Waitlisted"}).then((items)=>{
            res(items)
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
        
    })
    
}

exports.updateStatus = function(slot, stat){
    return new Promise(function(res, rej){
        Slot.findOneAndUpdate({
            _id:slot
        }, {
            status: stat
        }).then((succ)=>{
            console.log("Update Successful")
            res(succ)
        }, (err)=>{
            console.log("Update Failed")
            rej(err)
        })
    })
}

// Start of Kyle
exports.removeSlot = function(_id){
    return new Promise(function(res, rej){
        Slot.remove({_id}).then((items)=>{
            res(items)
            console.log("SUCCESS");
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
    })
}
// End of Kyle

// ROLO's AJAX
exports.getAllSlotsOfThisWeek = function () {
    return new Promise(function (res, rej) {
        Slot.find(
            { $and : [{date: {$in : [dateVals[0], dateVals[1], dateVals[2], dateVals[3], dateVals[4], dateVals[5], dateVals[6]]}}, {type: 'reserved'}]}
        ).then((results)=>{
            res(results)
        }, (err)=>{
            rej(err)
            console.log(err)
        })
    })
}

exports.getAllSlotsOfThisMonth = function () {
    return new Promise(function (res, rej) {
        Slot.find(
            { $and : [{date: {$in : [monthVals[0], monthVals[1], monthVals[2], monthVals[3], monthVals[4], monthVals[5], monthVals[6], monthVals[7], monthVals[8], monthVals[9], monthVals[10], monthVals[11], monthVals[12], monthVals[13], monthVals[14], monthVals[15], monthVals[16], monthVals[17], monthVals[18], monthVals[19], monthVals[20], monthVals[21], monthVals[22], monthVals[23], monthVals[24], monthVals[25], monthVals[26], monthVals[27], monthVals[28], monthVals[29], monthVals[30]]}}, {type: 'reserved'}]}
        ).then((results)=>{
            res(results)
        }, (err)=>{
            rej(err)
            console.log(err)
        })
    })
}