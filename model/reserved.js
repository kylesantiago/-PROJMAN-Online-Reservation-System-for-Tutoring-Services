// create mongoose document ticket
const mongoose = require("mongoose");

var ReservedSchema = mongoose.Schema({
    location: String,
    subject: String,
    student_id: String
});

var Reserved = mongoose.model("Reserved", ReservedSchema);

var exports = module.exports = {}

exports.schema = ReservedSchema

exports.addNew = function(reserved){
    return new Reserved(function(resolve, reject){
    var x = new Reserved(reserved)
    x.save().then((newItem)=>{
      resolve(newItem)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.findSpecific = function (reserved){
    return new Promise(function(res, rej){
        Reserved.findOne(
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