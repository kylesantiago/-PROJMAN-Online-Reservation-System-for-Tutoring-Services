require("./../configuration/database.js")

const Tutor = require("./tutor.js")
const Student = require("./student.js")

var add_tutors = = new Promise(
  function (resolve, reject) {
    var array_studs = ["Sammie Dacanay", "Nea Tan", "Vivian Uy"]
    
    var array_blocked = ["QWERTY", "ABCDEF"]
    var arary_slots = ["ASDFG", "ZXCVB"]
    
    var tutor 
    
    Tutor.addNew({
            email: "abc@yahoo.com",
            password: "123",
            students: array,
            blocked_slots: array_blocked,
            fullname: "Mica Pena",
            address: "837 Elm Street, AAVA Muntinlupa City"
    }).then((result_tutor)=>{
        
        
    })
      
      Slot.addNew({
        id: "QWERTY",
        start_time: "10:00",
        intervals: 5,
        date: "2018-12-25",
        type: "blocked",
        tutor_id:
    }).then
  }
)