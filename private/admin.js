$(document).ready(function () {
    $("a[href='#adminSchedule']").click(fixSchedule)
    $("a[href='#adminRes']").click(manageRes)
    $("a[href='#adminTutees']").click(manageTutees)
    $("a[href='#adminBilling']").click(manageBilling)

    // IAN
    $(".list-group-item").click(checkDisabled)
    $("#adminTutees input#hideDisabled").click(hideDisabled)

    $("#studentInfo_edit").click(onEdit)
    $("#disableAccBtn").click(toggleDisable)
    $("#enableAccBtn").click(toggleDisable)
    $("button#studentInfo_disable").click(changeName)

    fixSchedule()
})

// Kyle
function fixSchedule(){
    // AJAX to retrieve slots and fix schedule
    $(".calendar li").removeClass("selected")
}

// Rolo
function manageRes(){
    // AJAX to retrieve session info and format properly
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

// Zach
function manageBilling(){
    // AJAX to retrieve billing info
}