// create mongoose document ticket
const mongoose = require("mongoose");

var TutorSchema = mongoose.Schema({
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
    students: [String], //fullname of students/ id?
    blocked_slots: [String], //ID of the blocked slots
    fullname: String, //so we know the name of the tutor
    address: String //house of the tutor (can do tutoring sessions in this location)

});

var Tutor = mongoose.model("Tutor", TutorSchema);

var exports = module.exports = {}

exports.schema = TutorSchema
exports.model = Tutor

exports.addNew = function(tutor){
    return new Promise(function(res, rej){
        var x = new Tutor(tutor)
        x.save().then((newItem)=>{
            res(newItem)
        }, (err)=>{
            rej(err)
        })
    })
}

exports.login = function(email,password){
    return new Promise(function(res, rej){
        Tutor.findOne({
            email: email,
            password: password
        }).then((user)=>{
            res(user)
        }, (err)=>{
            rej(err)
        })
    })
}

/**
** Add new blocked given tutor_id and blocked_id
**/
exports.addBlocked = function(tutor_id, block_id){
    return new Promise(function(res, rej){
        Tutor.findOne({
            _id: tutor_id
        }).update({}, {
            $addToSet: {
                blocked_slots: block_id
            }
        }, {multi: true
           }).then((succ) => {
            console.log("Add Block Succ")
            res(succ)
        }, (err) => {
            console.log("Add Block Failed")
            rej(err)
        })
    })
}

// Start of Kyle
exports.getAll = function(){
    return new Promise(function(res, rej){
        Tutor.find().then((items)=>{
            res(items)
        }, (err)=>{
            rej(err)
            console.log("ERROR")
        })
    })
}

exports.removeBlocked = function(tutor_id,block_id){
    return new Promise(function(res, rej){
        Tutor.findOne({
            _id: tutor_id
        }).update({}, {
            $pull: {
                blocked_slots: block_id
            }
        }, {multi: true
           }).then((succ) => {
            console.log("Remove Block Succ")
            res(succ)
        }, (err) => {
            console.log("Remove Block Failed")
            rej(err)
        })
    })
}
// End of Kyle