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
    var timeStr;
    for(var i = 8; i < 23; i++){
        timeStr = i + ":00";
        var liTime = document.createElement("li");
        var timeTxt = document.createTextNode(timeStr);
        $(liTime).addClass("calTime")
        $(liTime).append(timeTxt);
        $("#time").append(liTime);
        timeStr = i + ":30";
        var liTime = document.createElement("li");
        var timeTxt = document.createTextNode(timeStr);
        $(liTime).append(timeTxt);
        //$(liTime).addClass("calTime")
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
    var timeStr;
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
        for(var x = 8; x < 23; x++){
            timeStr = x + ":00";
            liDay = document.createElement("li");
            dayTxt = document.createTextNode(" ");
            $(liDay).addClass("days");
            $(liDay).attr("id",days[i] + " " + timeStr);
            $(liDay).attr("data-date", (tempMonth+1) + "/" +(tempDay) + "/" + curYearNum);
            $(liDay).append(dayTxt);
            $(liDay).css("font-weight","Bold");
            $(ulDay).append(liDay);
            timeStr = x + ":30";
            $(liDay).on("click",cellClick)
            $(liDay).mouseover(cellHover)
            
            liDay = document.createElement("li");
            dayTxt = document.createTextNode(" ");
            $(liDay).addClass("days");
            $(liDay).attr("id",days[i] + " " + timeStr);
            $(liDay).attr("data-date", (tempMonth+1) + "/" +(tempDay) + "/" + curYearNum);
            $(liDay).append(dayTxt);
            $(ulDay).append(liDay);
            
            $(liDay).attr("data-status","notSelected")
            
            let selected = false;
            $(liDay).on("click",cellClick)
            $(liDay).mouseover(cellHover)
            
        }
        $("#" + days[i]).append(dayName);
        $("#" + days[i]).append(ulDay);
    }
}

var selected = false;
function cellClick(){
    event.preventDefault();
    $(this).toggleClass("selected")
    selected = !selected;
}

function cellHover(){
    if (selected){
        event.preventDefault();
    $(this).toggleClass("selected")
    }
    
}

$(document).on("click",".days",function(){
    console.log($(this).attr("id") + " " + $(this).attr("data-date"));
})

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
});

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