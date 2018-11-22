$(document).ready(function () {
    $("a[href='#userSchedule']").click(fixSchedule)
    $("a[href='#userSessions']").click(fixSessions)
    
    fixSchedule()
})
/* Start of Kyle */

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


/* End of Kyle */


function fixSessions(){
    // AJAX to retrieve session info and format properly
    
}