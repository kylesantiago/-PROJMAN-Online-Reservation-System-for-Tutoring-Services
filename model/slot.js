// create mongoose document ticket
const mongoose = require("mongoose");

var SlotSchema = mongoose.Schema({
    start_time: String, //? 00:00 to 23:59
    intervals: int,
    start_date: String, //? Format: YYYY-MM-DD
    end_date: String, //? Format: "YYYY-MM-DD"
    concurrency: String, //Either Daily, Weekly, Monthly
    type: String //reserved or blocked
    
});

var Slot = mongoose.model("Slot", SlotSchema);

var exports = module.exports = {}

exports.schema = SlotSchema

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