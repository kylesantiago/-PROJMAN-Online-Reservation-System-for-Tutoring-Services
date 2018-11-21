$(document).ready(function () {
    $("#loginBtn").click(login)
    
    $("#addAccModal input").keyup(checkFields)
    $("input[name=addAcc_check]").click(checkFields)
    
    $("#addAccModal input[name='addAcc_fullname']").on("blur",checkIfEmpty)
    $("#addAccModal input[name='addAcc_school']").on("blur",checkIfEmpty)
    $("#addAccModal input[name='addAcc_address']").on("blur",checkIfEmpty)
    $("#addAccModal input[name='addAcc_email']").on("blur",checkValidEmail)
    $("#addAccModal input[name='addAcc_contact']").on("blur",checkValidContact)
})

function checkIfEmpty(event){
    let val = $(event.target).val()
    let id = $(event.target).attr('name')
    if (val === "") {
        $("#addAccModal input[name="+id+"]").addClass('errForm')
        $("#addAccModal small[id="+id+"]").addClass('d-block')
        $("#addAccModal small[id="+id+"]").removeClass('d-none')
    } else {
        $("#addAccModal input[name="+id+"]").removeClass('errForm')
        $("#addAccModal small[id="+id+"]").removeClass('d-block')
        $("#addAccModal small[id="+id+"]").addClass('d-none')
    }
}

function checkValidEmail(event){
    let val = $(event.target).val()
    let id = $(event.target).attr('name')
    if (val === "" || !isValidEmail(val)) {
        $("#addAccModal input[name="+id+"]").addClass('errForm')
        $("#addAccModal small[id="+id+"]").addClass('d-block')
        $("#addAccModal small[id="+id+"]").removeClass('d-none')
    } else {
        $("#addAccModal input[name="+id+"]").removeClass('errForm')
        $("#addAccModal small[id="+id+"]").removeClass('d-block')
        $("#addAccModal small[id="+id+"]").addClass('d-none')
    }
}

function checkValidContact(event){
    let val = $(event.target).val()
    let id = $(event.target).attr('name')
    if (val === "" || isNaN(val)) {
        $("#addAccModal input[name="+id+"]").addClass('errForm')
        $("#addAccModal small[id="+id+"]").addClass('d-block')
        $("#addAccModal small[id="+id+"]").removeClass('d-none')
    } else {
        $("#addAccModal input[name="+id+"]").removeClass('errForm')
        $("#addAccModal small[id="+id+"]").removeClass('d-block')
        $("#addAccModal small[id="+id+"]").addClass('d-none')
    }
}

function login() {
    let email = $("#email").val()
    let password = $("#password").val()
    $.ajax({
        url: '../login',
        method: 'POST',
        data: { email, password },
        success: function (res) {
            if (res.result === 'error') {
                $(".invalid-feedback").show()
            }
            else {
                $(".invalid-feedback").hide()
                $("form#loginForm").submit()
            }
        }
    })
}

function isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //regular expression is used to check email AUTOMAT INTENSIFIES
    return re.test(email);
}

function checkFields() {
    let creds = {
        email: $("input[name=addAcc_email]").val(),
        fullname: $("input[name=addAcc_fullname]").val(),
        school: $("input[name=addAcc_school]").val(),
        contact: $("input[name=addAcc_contact]").val(),
        address: $("input[name=addAcc_address]").val(),
        check: $("input[name=addAcc_check]").is(":checked")
    }
    
    if (creds.email != "" && isValidEmail (creds.email) && creds.fullname != "" && creds.school != "" && creds.contact != "" && !isNaN(creds.contact) && creds.address != "" && creds.check) {
        $("#addAccBtn").prop("disabled",false)
        $("#addAccBtn").click(function(){$("form[action='../student/addAcc']").submit()})
    }
    else
        $("#addAccBtn").prop("disabled",true)
}