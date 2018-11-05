$(document).ready(function () {
    $("#loginBtn").click(login)
})

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
                $("form#loginForm").submit()
            }
        }

    })
}