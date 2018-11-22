$(document).ready(function () {
    $("a[href='#adminSchedule']").click(fixSchedule)
//    $("a[href='#adminRes']").click(manageRes)
    $("a[href='#adminTutees']").click(manageTutees)
    $("a[href='#adminBilling']").click(manageBilling)

    // IAN
    $(".list-group-item").click(checkDisabled)
    $("#adminTutees input#hideDisabled").click(hideDisabled)

    $("#studentInfo_edit").click(onEdit)
    $("#disableAccBtn").click(toggleDisable)
    $("#enableAccBtn").click(toggleDisable)
    $("button#studentInfo_disable").click(changeName)


    /// KYlE
    fixSchedule()

    // ZACH
    manageRes()
})

// Kyle
function fixSchedule(){
    // AJAX to retrieve slots and fix schedule
    $(".calendar li").removeClass("selected");
    $.ajax({
        url: "../slot/getSlots",
        method: "post",
        data: {
        },
        success: function(newdoc) {
            initSlots(newdoc);
        }
    });
}

// Zach
function manageRes(){
    // AJAX to retrieve session info and format properly
    setupTutoringRow()
    setupPendingAndWaitlist()
    setupCheckBox()
    updateSessionInfo(null)
}

function setupCheckBox(){
    $("#defaultCheck1[type='checkbox']").change(function(){
        if($(this).prop("checked")){
            $(".tbody_tutorSessions").empty()
            console.log("DONT MESS UP MY TEMPO")
            $.ajax({
                url: '../slot/getApproved',
                method: 'get',
                success: function (res) {
                    res.forEach((slot)=>{
                        
                        console.log("CURRENT DAY: " + Date.now() + " vs DATE OF SLOT: " + Date.parse(slot.date) )
                        if(Date.now() <= Date.parse(slot.date))
                            addTutoringRow(slot)

                    })
                }
            })
            
        } else setupTutoringRow()
        
    })
    
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
            $(newRow).attr("slot_status", slot.status)
            $(newRow).attr("slot_id", slot._id)
            
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
            
            $(newCard).attr("slot_id", slot._id)
            $(newCard).attr("slot_owner", res.fullname)
            $(newCard).attr("slot_date", slot.date)
            $(newCard).attr("slot_time", slot.start_time)
            var dur = slot.intervals * 15
            $(newCard).attr("slot_duration", dur)
            $(newCard).attr("slot_location", slot.location)
            $(newCard).attr("slot_notes", slot.notes)
            $(newCard).attr("slot_status", slot.status)
            $(newCard).attr("slot_id", slot._id)
                            
            $(newCard).attr("onclick", "updateSessionInfo(this)")

            $(newCard).append(header)
            $(newCard).append(body)

            $(".pwList").append(newCard)
        }
        
    })
    
}

/**     CARD        **/

function updateSessionInfo(obj){
    $(".session-info.approve").hide()
    $(".session-info.waitlist").hide()
    $(".session-info.approve").attr("slot-id", $(obj).attr("slot_id"))
    $(".session-info.waitlist").attr("slot-id", $(obj).attr("slot_id"))
    
    console.log("SLOT OWNER: " + $(obj).attr("slot_owner"))
    $(".session-info.card-name").text($(obj).attr("slot_owner"))
    $(".session-info.card-date").text($(obj).attr("slot_date"))
    $(".session-info.card-time").text($(obj).attr("slot_time"))
    $(".session-info.card-duration").text($(obj).attr("slot_duration"))
    $(".session-info.card-location").text($(obj).attr("slot_location"))
    $(".session-info.card-notes").text($(obj).attr("slot_notes"))
    
    
    if($(obj).attr("slot_status") == "Approved"){
        $(".session-info.waitlist").show()
        $(".session-info.waitlist").attr("onclick", "updateSlot(this)")
    } else if ($(obj).attr("slot_status") == "Waitlisted") {
        $(".session-info.approve").show()
        $(".session-info.approve").attr("onclick", "updateSlot(this)")
    } else if ($(obj).attr("slot_status") == "Pending") {
        $(".session-info.waitlist").show()
        $(".session-info.waitlist").attr("onclick", "updateSlot(this)")

        $(".session-info.approve").show()
        $(".session-info.approve").attr("onclick", "updateSlot(this)")
    }
    
    
}

function updateSlot(elem){
    var slotid = $(elem).attr("slot-id")
    var slotstatus = $(elem).attr("slot-status")
    console.log(slotid)
    $.ajax({
        url: '../slot/update',
        method: 'post',
        data: {
            id: slotid,
            status: slotstatus
        },
        success: manageRes()
        
    })
}

// Ian
function manageTutees(){
    // AJAX to retrieve tutees and format properly
    $("#adminTutees .tuteeProfile input.form-control-plaintext").css("transition","none")
    $("#adminTutees .tuteeProfile textarea.form-control-plaintext").css("transition","none")

    $("#adminTutees .list-group .list-group-item").removeClass("active")
    $("#adminTutees .list-group .list-group-item").click(function(){$(".tuteeBtn").prop("disabled",false)})
    $("#adminTutees .tab-pane").removeClass("active")
    $(".tuteeBtn").prop("disabled",true)

    $("#addAccBtn").prop("disabled",true)
}

function changeName(event){
    let id = $("#adminTutees .tuteeProfile .active").attr("id")
    let fullname = $("div[id="+id+"] input[id=studentInfo_fullname]").val()
    let firstname = fullname.split(" ")[0]
    console.log(fullname)
    console.log(firstname)
    $(".studentName").text(firstname+"'s")
}

function checkDisabled(event){
    let clicked = event.target    
    while (!$(clicked).is("a")){
        clicked = $(clicked).parent()
    }
    let dis = $(clicked).attr("data-disabled")

    // turn into enable button
    if (dis == "true"){
        toggleDisableBtn(true)
    } else { // turn into disable button
        toggleDisableBtn(false)
    }
}

function toggleDisableBtn(status){
    let btn = document.getElementById("studentInfo_disable")
    let ico = $("#disableIcon")
    if (status == true) {
        $(btn).removeClass("btn-danger")
        $(btn).addClass("btn-custom-light")
        btn.childNodes[1].nodeValue = "Enable"
        $(ico).removeClass("fa-times-circle")
        $(ico).addClass("fa-check-circle")
        $(btn).attr("data-target","#enableAccModal")
    } else {
        $(btn).removeClass("btn-custom-light")
        $(btn).addClass("btn-danger")
        btn.childNodes[1].nodeValue = "Disable"
        $(ico).addClass("fa-times-circle")
        $(ico).removeClass("fa-check-circle")
        $(btn).attr("data-target","#disableAccModal")
    }
}

function hideDisabled(){
    let hide = $("#adminTutees input#hideDisabled").is(":checked")
    if (hide){
        $("a.list-group-item").has("span.badge-danger").hide()
    } else {
        $("a.list-group-item").show()
    }
}

function onEdit(){
    //console.log(document.getElementById('PORK').className.split(/\s+/))
    $("#adminTutees .tuteeProfile input").toggleClass("form-control-plaintext")
    $("#adminTutees .tuteeProfile textarea").toggleClass("form-control-plaintext")
    // ready form for editing
    if ($("#adminTutees .tuteeProfile input").prop("readonly") == true) {
        $("#adminTutees .tuteeProfile input").prop("readonly",false)
        $("#adminTutees .tuteeProfile textarea").prop("readonly",false)

        document.getElementById("studentInfo_edit").childNodes[1].nodeValue = "Save"
        $("#editIcon").toggleClass("fa-edit")
        $("#editIcon").toggleClass("fa-save")

        $("#studentInfo_edit").toggleClass("btn-custom")
        $("#studentInfo_edit").toggleClass("btn-success")
    } else { // done editing, save new info
        let id = $("#adminTutees .tuteeProfile .active").attr("id")
        let newName = $("div[id="+id+"] input[id=studentInfo_fullname]").val()
        let newSchool = $("div[id="+id+"] input[id=studentInfo_school]").val()
        let newContact = $("div[id="+id+"] input[id=studentInfo_contact]").val()
        let newEmail = $("div[id="+id+"] input[id=studentInfo_email]").val()
        let newAddress = $("div[id="+id+"] textarea[id=studentInfo_address]").val()

        $.ajax({
            url: '../student/editStudent',
            method: 'POST',
            data: { id, newName, newSchool, newContact, newEmail, newAddress},
            success: function (res) {
                if (res.result == 'success') {
                    $("a.list-group-item[href=#"+id+"] h4").text(newName)
                    $("a.list-group-item[href=#"+id+"] h6 span[id=schoolName]").text(newSchool)
                    $("#adminTutees .tuteeProfile input").prop("readonly",true)
                    $("#adminTutees .tuteeProfile textarea").prop("readonly",true)

                    document.getElementById("studentInfo_edit").childNodes[1].nodeValue = "Edit"
                    $("#editIcon").toggleClass("fa-edit")
                    $("#editIcon").toggleClass("fa-save")

                    $("#studentInfo_edit").toggleClass("btn-custom")
                    $("#studentInfo_edit").toggleClass("btn-success")
                }
            }
        })
    }
}

function toggleDisable(event){
    let clicked = event.target    
    while (!$(clicked).is("button")){
        clicked = $(clicked).parent()
    }

    let curStatus = false
    if ($(clicked).attr("id") === "enableAccBtn")
        curStatus = true
    let id = $("#adminTutees .tuteeProfile .active").attr("id")
    let newStatus = !curStatus
    $.ajax({
        url: '../student/toggleStatus',
        method: 'POST',
        data: { id, newStatus},
        success: function (res) {
            if (res.result == 'success') {
                if (newStatus == true) {
                    let disabledBadge = document.createElement("span")
                    disabledBadge.className = "badge badge-danger"
                    $(disabledBadge).text("Account disabled")
                    $("div[id="+id+"] form input[id=studentInfo_school]").after($(disabledBadge).clone())
                    $("a.list-group-item[href=#"+id+"] h6").append($(disabledBadge).clone())
                    $("a.list-group-item[href=#"+id+"]").attr("data-disabled",true)
                    toggleDisableBtn(true)
                } else {
                    $("a.list-group-item[href=#"+id+"] h6 span.badge").remove()
                    $("div[id="+id+"] form span.badge").remove()
                    $("a.list-group-item[href=#"+id+"]").attr("data-disabled",false)
                    toggleDisableBtn(false)
                }

                $("div#disableAccModal").modal('hide')
                $("div#enableAccModal").modal('hide')
                hideDisabled()
            }
        }
    })
}

// Rolo
var slotsFromServer, students = {
    objectID: 12345
}
var weekTrue = true,
    monthTrue = true

function manageBilling(){
    // AJAX to retrieve billing info
    getStudentsfortheWeek()
    $("tbody[name='billingBody']").empty()
    $("input[id='defaultCheck2']").click(displayButtonWeek)
    $("input[id='defaultCheck3']").click(displayButtonMonth)
}

//functions needed for billling

function displayButtonWeek() {
    $("tbody[name='billingDetails']").empty()
    if (weekTrue) {
        weekTrue = false;
        monthTrue = true;
        getStudentsfortheWeek()
    }

}

function displayButtonMonth() {
    $("tbody[name='billingDetails']").empty()
    if (monthTrue) {
        weekTrue = true;
        monthTrue = false;
        getStudentsfortheMonth()
    }
}

function getStudentsfortheWeek() {
    $.ajax({
        method: 'get',
        url: '/slot/getStudentsWeek',
        contentType: 'application/json',
        success: function (results) {
            students = {
                objectID: 12345
            }
            $("tbody[name='billingBody']").empty()
            slotsFromServer = results
            for (var i = 0; i < slotsFromServer.length; i++) {
                getStudentsNameViaID(slotsFromServer[i])
            }

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getStudentsfortheMonth() {
    $.ajax({
        method: 'get',
        url: '/slot/getStudentsMonth',
        contentType: 'application/json',
        success: function (results) {
            students = {
                objectID: 12345
            }
            $("tbody[name='billingBody']").empty()
            slotsFromServer = results
            for (var i = 0; i < slotsFromServer.length; i++) {
                getStudentsNameViaID(slotsFromServer[i])
            }

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getStudentsNameViaID(slotObject) {

    $.ajax({
        method: 'get',
        url: '/slot/getStudent/' + slotObject.student_id,
        contentType: 'application/json',
        success: function (result) {
            var nameOfStudent = result.fullname
            if (students.hasOwnProperty(nameOfStudent)) {
                students[nameOfStudent].slots.push(slotObject)
            } else {
                students[nameOfStudent] = {
                    name: result.fullname,
                    slots: [slotObject],
                    rate: result.rate
                }
            }
            console.log(students)
            displayOnStudentBillingOnHtml()

        },
        error: function (err) {
            console.log(err)
            nameOfStudent = 'error'
        }
    })

}

//todo function for adding elements into billing
function displayOnStudentBillingOnHtml() {
//    console.log("HELLO!!")
     $("tbody[name='billingBody']").empty()

    for (var key in students) {
//        console.log("BEFORE IF STATEMENT " + key)
        
        if (key != 'objectID') {
           
            var element1, element2, element3, element4
            element1 = document.createElement("tr");
            element2 = document.createElement("td");
            element3 = document.createElement("td");

            $(element2).text(students[key].name)
            $(element3).text(students[key].rate + " PHP/HOUR")

            element1.append(element2)
            element1.append(element3)
            $(element1).attr("onClick", "clickOnRowFunction(this)")
            $("tbody[name='billingBody']").append(element1)

        }
    }
}

function clickOnRowFunction(element1){
    var totalAmt = 0
    var nodes = document.getElementById("billingDetails").childNodes
    var nodesOfBody = document.getElementById("billingBody").childNodes
    
    for (var i = 0; i < nodesOfBody.length; i++){
        $(nodesOfBody[i]).attr("class", "")
    }
    $(element1).attr("class", "selected")
    key = element1.childNodes[0].textContent
    
    
    $("tbody[name='billingDetails']").empty()
    var ratePerInterval = 0.25 * students[key].rate
    var element0, element2, element3, element4, element5, element6, total
    students[key].slots.forEach(function(item){
        element0 = document.createElement("tr");
        element2 = document.createElement("td");
        element3 = document.createElement("td");
        element4 = document.createElement("td");
        element5 = document.createElement("td");
        element6 = document.createElement("td");
        
        $(element2).text(item.notes)
        $(element3).text(item.date)
        var duration = item.intervals / 4.0 
        $(element4).text(duration)
        $(element5).text(item.location)
        total = item.intervals * ratePerInterval
        $(element6).text(total)
        
        element0.append(element2)
        element0.append(element3)
        element0.append(element4)
        element0.append(element5)
        element0.append(element6)
        $("tbody[name='billingDetails']").append(element0)
        totalAmt = totalAmt + total
    })
    //console.log(total)
    
    //for sub total
    element0 = document.createElement("tr");
    element2 = document.createElement("td");
    element3 = document.createElement("td");
    element4 = document.createElement("td");
    element5 = document.createElement("td");
    element6 = document.createElement("td");
    $(element2).text("Sub-Total: ")
    $(element6).text(totalAmt)
    element0.append(element2)
    element0.append(element3)
    element0.append(element4)
    element0.append(element5)
    element0.append(element6)
    $("tbody[name='billingDetails']").append(element0)
    
}