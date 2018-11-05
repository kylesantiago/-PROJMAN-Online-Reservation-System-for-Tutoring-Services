require("./../config/database.js")

const Tutor = require("./tutor.js")
const Student = require("./student.js")
const Slot = require("./slot.js")

var add_tutors = new Promise(
  function (resolve, reject) {
//    var array_studs = ["Sammie Dacanay", "Nea Tan", "Vivian Uy"]
    
//    var array_blocked = ["QWERTY", "ABCDEF"]
//    var arary_slots = ["ASDFG", "ZXCVB"]
    
    var tutor, slot
    
    Tutor.addNew({
        email: "abc@yahoo.com",
        password: "123",
        students: [],
        blocked_slots: [],
        fullname: "Mica Pena",
        address: "837 Elm Street, AAVA Muntinlupa City"
    }).then((result_tutor)=>{
        tutor = result_tutor
        return Slot.addNew({
        start_time: "10:00",
        intervals: 5,
        date: "2018-12-25",
        type: "blocked",
        tutor_id: tutor._id,
        student_id: null,
        notes: "It's Christmas Day",
        location: tutor.address
        }).then((result_slot)=>{
            slot = result_slot
            return Tutor.addBlocked(tutor._id, slot._id).then((updated_tutor)=>{
                tutor = updated_tutor
                console.log("Sammie: ")
                console.log(tutor)
                return Slot.addNew({
                start_time: "00:00",
                intervals: (4 * 24),
                date: "2018-11-14",
                type: "blocked",
                tutor_id: tutor._id,
                student_id: null,
                notes: "It's My Birth Day",
                location: "847 Fire Drive, Harry Poter City"
                }).then((result_slot2)=>{
                slot = result_slot2
                return Tutor.addBlocked(tutor._id, slot._id).then((updated_tutor)=>     {
                    tutor = updated_tutor
                    console.log("Sammie: ")
                    console.log(tutor)
                    })
                })
                
            })
        })
    })
      
      
  }
)