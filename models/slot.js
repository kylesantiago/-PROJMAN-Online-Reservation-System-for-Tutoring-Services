// create mongoose document ticket
const mongoose = require("mongoose");

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