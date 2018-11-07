//require("./../config/database.js")
const Tutor = require("./tutor.js")
const Student = require("./student.js")
const Slot = require("./slot.js")
var tutor;
var add_tutors = new Promise(
    function (resolve, reject) {

        var slot

        Tutor.addNew({
            email: "abc@yahoo.com",
            password: "123",
            students: [],
            blocked_slots: [],
            fullname: "Mica Pena",
            address: "837 Elm Street, AAVA Muntinlupa City"
        }).then((result_tutor) => {
            tutor = result_tutor
            return Slot.addNew({
                start_time: "10:00",
                intervals: 5,
                date: "2018-12-25",
                type: "blocked",
                tutor_id: tutor._id,
                student_id: null,
                notes: "It's Christmas Day",
                location: tutor.address,
                paid: false
            }).then((result_slot) => {
                slot = result_slot
                return Tutor.addBlocked(tutor._id, slot._id).then((updated_tutor) => {
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
                        location: "847 Fire Drive, Harry Poter City",
                        paid: false
                    }).then((result_slot2) => {
                        slot = result_slot2
                        return Tutor.addBlocked(tutor._id, slot._id).then((updated_tutor) => {
                            console.log("Sammie: ")
                            console.log(tutor)
                        })
                    })

                })
            })
        })
    })

var add_students = new Promise(function(resolve, reject){
    var student, slot;
    
    Student.addNew({
        email: "rolopens@gmail.com",
        password: "123",
        school: "DLSU",
        rate: 500,
        hours: 3,
        contact_info: "09175723300", //phone number?
        tutor: "Mica Pena", //tutor name or id?
        reserved_slots: [], //ID to of the slots reserved by the student
        fullname: "Romeo Manuel N. Pena",
        address: "24 JP Laurel St. BF HOMES EAST PHASE VI LAS PINAS CITY"
    }).then((returned_student)=>{
        student = returned_student;
        return Slot.addNew({
            start_time: "10:00",
            intervals: 5,
            date: "2018-12-23",
            type: "reserved",
            tutor_id: tutor._id,
            student_id: student._id,
            notes: "Calculus",
            location: null,
            status: "Approved",
            paid: false
        }).then((returned_slot)=>{
            slot = returned_slot
            return Student.addReserved(student._id, slot._id).then((updated_student)=>{
                console.log(updated_student)
                return Slot.addNew({
                    start_time: "10:00",
                    intervals: 5,
                    date: "2018-11-13",
                    type: "reserved",
                    tutor_id: tutor._id,
                    student_id: student._id,
                    notes: "Physics",
                    location: null,
                    status: "Approved",
                    paid: false
                }).then((return_slot22)=>{
                    slot = return_slot22
                    return Student.addReserved(student._id, slot._id).then((updated_student2)=>{
                        console.log(updated_student2)
                    })
                })
            })
        })
    })
})
