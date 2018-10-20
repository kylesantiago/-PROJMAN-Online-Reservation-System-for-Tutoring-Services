// create mongoose document ticket
const mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
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
    type: String, //teacher or student
    fullname: String //Split?
});

var User = mongoose.model("User", UserSchema);

var exports = module.exports = {}

exports.schema = UserSchema

exports.addNew = function(user){
    return new Promise(function(resolve, reject){
    var x = new User(user)
    x.save().then((newItem)=>{
      resolve(newItem)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.login = function (user){
    return new Promise(function(res, rej){
        User.findOne(
            {email: user.email,
             password: user.password
            }
        ).then((founduser)=>{
            console.log("User " + user.fullname + " Found")
            res(founduser)
        }, (err)=>{
            console.log("ERROR")
            rej(err)
        })  
    }) 
}
