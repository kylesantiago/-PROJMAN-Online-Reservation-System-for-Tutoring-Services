// create mongoose document ticket
const mongoose = require("mongoose");

var StudentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
              },
    password: {
        type: String,
        required: true,
        trim: true
              },
    school: {
        type: String,
        required: true,
        trim: true
              },
    rate: Number,
    hours: Number,
    contact_info: String, //phone number?
    tutor: String,
    reserved_slots: [String], //ID to of the slots reserved by the student
    fullname: String,
    address: String
});

var Student = mongoose.model("Student", StudentSchema);

var exports = module.exports = {}

exports.schema = StudentSchema

exports.addNew = function(student){
    return new Promise(function(resolve, reject){
    var x = new Student(student)
    x.save().then((newItem)=>{
      resolve(newItem)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.getAll = function(){
    return new Promise(function(res, rej){
        Student.find().then((items)=>{
            res(items)
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
    })
}