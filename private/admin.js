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
    setupPendingAndWaitlist()
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

/**         TABLE           **/
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
            $(newRow).attr("slot_time", slot.start_time)
            var dur = slot.intervals * 15
            
            $(newRow).attr("slot_duration", dur)
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

    updateSessionInfo(obj)
}

/** PENDING AND WAITLIST **/
function setupPendingAndWaitlist(){
    $(".card-columns.pwList").empty()
    
    /**     GET PENDING FIRST     **/
    $.ajax({
        url: '../slot/getSlots',
        method: 'get',
        success: function (res) {
            res.forEach((slot)=>{
                if(slot.status != "Approved")
                    addPending(slot)
                
            })
        }
    })
    
}

function addPending(slot){
    
    $.ajax({
        url: '../student/getByID',
        method: 'post',
        data: {id: slot.student_id},
        success: function (res) {
            var newCard = document.createElement("div")
            $(newCard).addClass("card")
            
            if(slot.status == "Pending")
                $(newCard).addClass("pending")
            else
                $(newCard).addClass("waitlist")

            var header = document.createElement("div")
            $(header).addClass("card-header")

            var body = document.createElement("div")
            $(body).addClass("card-body")
            
            var title = document.createElement("h5")
            $(title).addClass("card-title")
            
            if(slot.status == "Pending")
                $(title).text("Pending Session")
            else
                $(title).text("Waitlisted Session")
            
            
            var text = document.createElement("p")
            $(text).addClass("card-text")
            
            var name = document.createElement("span")
            $(name).text(res.fullname)

            var date = document.createElement("span")
            $(date).text(slot.date)
            
            var location = document.createElement("span")
            $(location).text(slot.location)
            
            
            $(text).append(name)
            $(text).append("<br/>")
            $(text).append(date)
            $(text).append("<br/>")
            $(text).append(location)
            
            $(body).append(title)
            $(body).append(text)

            $(newCard).append(header)
            $(newCard).append(body)

            $(".pwList").append(newCard)
        }
        
    })
    
}

/**     CARD        **/

function updateSessionInfo(obj){
    console.log("SLOT OWNER: " + $(obj).attr("slot_owner"))
    $(".session-info.card-name").text($(obj).attr("slot_owner"))
    $(".session-info.card-date").text($(obj).attr("slot_date"))
    $(".session-info.card-time").text($(obj).attr("slot_time"))
    $(".session-info.card-duration").text($(obj).attr("slot_duration"))
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
