$(document).ready(function () {
    $("a[href='#adminSchedule']").click(fixSchedule)
    $("a[href='#adminRes']").click(manageRes)
    $("a[href='#adminTutees']").click(manageTutees)
    $("a[href='#adminBilling']").click(manageBilling)  
    
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
}

// Zach
function manageBilling(){
    // AJAX to retrieve billing info
}