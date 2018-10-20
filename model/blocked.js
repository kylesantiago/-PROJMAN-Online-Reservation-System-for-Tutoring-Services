// create mongoose document ticket
const mongoose = require("mongoose");

var BlockedSchema = mongoose.Schema({
    description: String,
    tutor_id: String
});

var Blocked = mongoose.model("Blocked", BlockedSchema);

var exports = module.exports = {}

exports.schema = BlockedSchema

exports.addNew = function(blocked){
    return new Blocked(function(resolve, reject){
    var x = new Blocked(blocked)
    x.save().then((newItem)=>{
      resolve(newItem)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.findSpecific = function (blocked){
    return new Promise(function(res, rej){
        Blocked.findOne(
            {_id
            }
        ).then((item)=>{
            res(item)
        }, (err)=>{
            console.log("ERROR")
            rej(err)
        })  
    }) 
}