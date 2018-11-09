$(document).ready(function () {
    $("a[href='#adminSchedule']").click(fixSchedule)
    $("a[href='#adminRes']").click(manageRes)
    $("a[href='#adminTutees']").click(manageTutees)
    $("a[href='#adminBilling']").click(manageBilling)  
    
    fixSchedule()
    manageRes()
})





// Kyle
function fixSchedule(){
    // AJAX to retrieve slots and fix schedule
    $(".calendar li").removeClass("selected")
}

// Rolo
function manageRes(){
    // AJAX to retrieve session info and format properly
    setupTutoringRow()
}

function setupTutoringRow(){

    $(".tbody_tutorSessions").empty()
    
    $.ajax({
        url: '../slot/getApproved',
        method: 'get',
        success: function (res) {
            res.forEach((slot)=>{
                addTutoringRow(slot)
                
            })
        }
    })
    
//    var slot = {
//        date: "March 21, 1999",
//        student_id: "Switch",
//        location: "DLSU"
//    }
//    addTutoringRow(slot)
}

function addTutoringRow(slot){
    
    $.ajax({
        url: '../student/getByID',
        method: 'post',
        data: {id: slot.student_id},
        success: function (res) {
            console.log("STUDENT:" + res)
            
            var newRow = document.createElement("tr")
            var date_data = document.createElement("th")
            var name_data = document.createElement("td")
            var venue_data = document.createElement("td")

            $(date_data).text(slot.date)
            $(date_data).attr("scope","row")
            $(name_data).text(res.fullname)
            $(venue_data).text(slot.location)

            newRow.append(date_data)
            newRow.append(name_data)
            newRow.append(venue_data)
            
            $(newRow).attr("slot_id", slot._id)
            $(newRow).attr("slot_owner", res.fullname)
            $(newRow).attr("slot_date", slot.date)
            $(newRow).attr("slot_location", slot.location)
            $(newRow).attr("slot_notes", slot.notes)
            $(newRow).attr("onclick", "selectMe(this)")

            $(".tbody_tutorSessions").append(newRow)
        }
    })
    
    
}

function selectMe(obj){
    
    $("tr").removeClass("selected")
    $(obj).addClass("selected")

    updateCard(obj)
}

function updateCard(obj){
    console.log("SLOT OWNER: " + $(obj).attr("slot_owner"))
    $(".session-info.card-name").text($(obj).attr("slot_owner"))
    $(".session-info.card-date").text($(obj).attr("slot_date"))
    $(".session-info.card-location").text($(obj).attr("slot_location"))
    $(".session-info.card-notes").text($(obj).attr("slot_notes"))
}

// Ian
function manageTutees(){
    // AJAX to retrieve tutees and format properly
}

// Zach
function manageBilling(){
    // AJAX to retrieve billing info
}
