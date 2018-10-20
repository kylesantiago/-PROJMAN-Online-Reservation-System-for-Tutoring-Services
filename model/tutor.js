// create mongoose document ticket
const mongoose = require("mongoose");

var TutorSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
              },
    students: [String], //fullname of students
    blocked_slots: [String] //ID of the blocked slots
    
});

var Tutor = mongoose.model("Tutor", TutorSchema);

var exports = module.exports = {}

exports.schema = TutorSchema

exports.addNew = function(tutor){
    return new Tutor(function(resolve, reject){
    var x = new Tutor(tutor)
    x.save().then((newItem)=>{
      resolve(newItem)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.findSpecific = function (tutor){
    return new Promise(function(res, rej){
        User.findOne(
            {email: tutor
            }
        ).then((founduser)=>{
            res(founduser)
        }, (err)=>{
            console.log("ERROR")
            rej(err)
        })  
    }) 
}