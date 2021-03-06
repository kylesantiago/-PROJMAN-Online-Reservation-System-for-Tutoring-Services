var months = new Array(12);
months[0] = "January";
months[1] = "Febuary";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var time = new Array(30);
var tempTime = 8;
for(var i = 0; i < 30; i++){
    if(i%2==0){
        time[i] = (tempTime) + ":00";
        time[i+1] = (tempTime) + ":30";
    }
    else{
        tempTime++;
    }
}
    
n = new Date();        
var curMonth = n.getMonth();
var curDay = n.getDate();
var curYear = n.getFullYear();
// This is the distance from the current month
var curMonthNum = curMonth;
var curYearNum = curYear;
var curDayNum = curDay - n.getDay();

var days = new Array(7);
days[0] = "Sun";
days[1] = "Mon";
days[2] = "Tue";
days[3] = "Wed";
days[4] = "Thu";
days[5] = "Fri";
days[6] = "Sat";

initCalendar();

function initTime(){
    $("#time").empty();
    for(var i = 0; i < 30; i++){
        var liTime = document.createElement("li");
        var timeTxt = document.createTextNode(time[i]);
        if(i%2 == 0){
            $(liTime).addClass("calTime");
        }
        $(liTime).append(timeTxt);
        $("#time").append(liTime);
    }
}

function initDays(){
    var dayName;
    var ulDay;
    var liDay;
    var dayTxt;
    var tempMonth;
    var tempDay;
    for(var i = 0; i <7; i++){
        $("#" + days[i]).empty();
        if(curDayNum + i > daysInMonth(curMonthNum+1,curYearNum)){
            tempMonth = curMonthNum + 1;
            tempDay = curDayNum + i - daysInMonth(tempMonth,curYearNum);
            dayName = document.createTextNode(days[i] + " " + (tempDay));
        }
        else{
            tempMonth = curMonthNum;
            tempDay = curDayNum + i;
            dayName = document.createTextNode(days[i] + " " + (tempDay));

        }
        ulDay = document.createElement("ul");
        for(var x = 0; x < 30; x++){
            liDay = document.createElement("li");
            dayTxt = document.createTextNode(" ");
            $(liDay).addClass("days reserved blocked");
            $(liDay).toggleClass("reserved");
            $(liDay).toggleClass("blocked");
            $(liDay).attr("id",time[x] + " " + curYearNum + "-" +(tempMonth+1) + "-" +tempDay);
            $(liDay).append(dayTxt);
            $(liDay).css("font-weight","Bold");
            $(ulDay).append(liDay);
            $(liDay).on("click",cellClick)

            let selected = false;
            
        }
        $("#" + days[i]).append(dayName);
        $("#" + days[i]).append(ulDay);
    }
}

function cellClick(){
    if($(this).hasClass("blocked")){
       removeBlock(this);
    }
    else{
       createBlock(this);
    }
}

function removeBlock(temp){
    var removeHidden = document.createElement("hidden");
    $(removeHidden).attr("data-id",$(temp).attr("data-id"));
    $(removeHidden).attr("id","removeHidden");
    $("#removeBlock").append(removeHidden);
    
    $("#removeBlockModal").modal("show");
}

function blockRemove(){
    var id = $(document.getElementById("removeHidden")).attr("data-id");
    $(document.getElementById("removeHidden")).remove();
    console.log(id);
    $.ajax({
        url: "../slot/removeSlot",
        method: "post",
        data: {
            id
        },
        success: function(newdoc) {
            initSlots(newdoc);
        }
    });
    $("#removeBlockModal").modal("hide");
}

function createBlock(temp){
    var index = time.indexOf($(temp).attr("id").split(" ")[0]);
    var date = $(temp).attr("id").split(" ")[1];
    console.log(index,date);
    var freeTimes = fillTimes(index,date);
    
    $("#date").empty();
    var dateText = document.createTextNode(date);
    var dateOption = document.createElement("option");
    $(dateOption).append(dateText);
    $("#date").append(dateOption);
    
    $("#startTime").empty();
    var startText = document.createTextNode(freeTimes[0]);
    var startOption = document.createElement("option");
    $(startOption).append(startText);
    $("#startTime").append(startOption);
    
    $("#endTime").empty();
    for(var i = 0; i < freeTimes.length; i++){
        var endText = document.createTextNode(freeTimes[i]);
        var endOption = document.createElement("option");
        $(endOption).append(endText);
        $("#endTime").append(endOption);
    }
    
    $("#addBlockModal").modal("show");
}

function fillTimes(index,date){
    var tempTimes = [];
    var tempSlot;
    for (var i = index; i< 30; i++){
        tempSlot = document.getElementById(time[i] + " " + date);
        if($(tempSlot).attr("data-id")){
            return tempTimes;
        }
        else{
            tempTimes.push(time[i]);
        }
    }
    return tempTimes;
}

function blockSubmit(){
    $("#addBlockModal").modal("hide");
    var startTime = $("#startTime").children("option:selected").val();
    var endTime = $("#endTime").children("option:selected").val();
    var note = $("#note").val();
    var interval = time.indexOf(endTime)-time.indexOf(startTime);
    var location = $("#location").val();
    var date = $("#date").children("option:selected").val();
    $.ajax({
        url: "../slot/blockSlot",
        method: "post",
        data: {
            startTime,
            note,
            interval,
            location,
            date
        },
        success: function(newdoc) {
            initSlots(newdoc);
        }
    });
}

$("#prev").click(function(){
    curDayNum-=7;
    console.log(curDayNum);
    if(curDayNum < 1){
        prevMonth();
        var temp = curDayNum;
        console.log(daysInMonth(curMonthNum+1,curYearNum));
        curDayNum += daysInMonth(curMonthNum+1,curYearNum);
        console.log("old Day " + curDayNum);
    }
    initDays();
    //ADD AJAX HERE
    $.ajax({
        url: "../slot/getSlots",
        method: "post",
        data: {
        },
        success: function(newdoc) {
            initSlots(newdoc);
        }
    });
});

function prevMonth(){
    curMonthNum--;
    if(curMonthNum < 0){
        curYearNum--;
        curMonthNum = 11;
    }
    setCalendar();
};

function nextMonth(){
    curMonthNum++;
    if(curMonthNum > 11){
        curYearNum++;
        curMonthNum = 0;
    }
    setCalendar();
}

$("#next").click(function(){
    curDayNum+=7;
    console.log(curDayNum)
    if(curDayNum > daysInMonth(curMonthNum+1,curYearNum)){
        nextMonth();
        curDayNum -= daysInMonth(curMonthNum,curYearNum);
        console.log("new Day " + curDayNum);
    }
    initDays();
    //ADD AJAX HERE
    $.ajax({
        url: "../slot/getSlots",
        method: "post",
        data: {
        },
        success: function(newdoc) {
            initSlots(newdoc);
        }
    });
});

function initSlots(newdoc){
    initDays();
    for(doc in newdoc){
        if(newdoc[doc].start_time === "00:00"){
            var tempDay;
            for(var i = 0; i < 30; i++){
                tempDay = document.getElementById(time[i] + " " + newdoc[doc].date);
                $(tempDay).attr("data-id",newdoc[doc]._id);
                if(newdoc[doc].type === "blocked"){
                    
                    $(tempDay).toggleClass("blocked");
                }
                else{
                    $(tempDay).toggleClass("reserved");
                }
            }
        }
        else{
            var tempSlot = document.getElementById(newdoc[doc].start_time+ " " + newdoc[doc].date);
            if(tempSlot){
                if(newdoc[doc].intervals == 0){
                    $(tempSlot).attr("data-id",newdoc[doc]._id);
                    if(newdoc[doc].type === "blocked"){
                        $(tempSlot).toggleClass("blocked");
                    }
                    else{
                        $(tempSlot).toggleClass("reserved");
                    }
                }
                else{
                    for(var i = 0; i < newdoc[doc].intervals; i++){
                        tempSlot = document.getElementById(time[i+time.indexOf(newdoc[doc].start_time)]+ " " + newdoc[doc].date);
                        $(tempSlot).attr("data-id",newdoc[doc]._id);
                        if(newdoc[doc].type === "blocked"){
                            $(tempSlot).toggleClass("blocked");
                        }
                        else{
                            $(tempSlot).toggleClass("reserved");
                        }
                    }
                }
            }
        }
    }
}

function initCalendar(){
    $(".days").empty();
    setYearAndMonth(curMonth,curYear);
    initDays();
    initTime();
}

function setCalendar(){
    $(".days").empty();
    setYearAndMonth(curMonthNum,curYearNum);
    initDays();
}

function setYearAndMonth(month,year){
    $("#monthName").empty();
    var mon = document.createTextNode(months[month] + " ");
    var yer = document.createTextNode(year);
    var brk = document.createElement("br");
    var span = document.createElement("span");
    $(span).attr("style","font-size:18px");
    $("#monthName").append(mon);
    //$("#monthName").append(brk);
    //$("#monthName").append(span);
    $("#monthName").append(yer);
}


function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}