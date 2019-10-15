var calendar = [,];
var day = 1000;
var time = 1000;
var cellNum = 1000;
function daycheck() {
    $('#day1').on("click", function () {
        console.log(this);
        day = 1;
        $("#day_display").text(day);
    });
    $('#day2').on("click", function () {
        console.log(this);
        day = 2;
        $("#day_display").text(day);
    });
    $('#day3').on("click", function () {
        console.log(this);
        day = 3;
        $("#day_display").text(day);
    });
    $('#day4').on("click", function () {
        console.log(this);
        day = 4;
        $("#day_display").text(day);
    });
    $('#day5').on("click", function () {
        console.log(this);
        day = 5;
        $("#day_display").text(day);
    });
    $('#day6').on("click", function () {
        console.log(this);
        day = 6;
        $("#day_display").text(day);
    });
    $('#day7').on("click", function () {
        console.log(this);
        day = 7;
        $("#day_display").text(day);
    });
}
function timecheck() {
    $('#time1').on("click", function () {
        console.log(this);
        time = 1;
        $("#time_display").text(time);
    });
    $('#time2').on("click", function () {
        console.log(this);
        time = 2;
        $("#time_display").text(time);
    });
    $('#time3').on("click", function () {
        console.log(this);
        time = 3;
        $("#time_display").text(time);
    });
    $('#time4').on("click", function () {
        console.log(this);
        time = 4;
        $("#time_display").text(time);
    });
    $('#time5').on("click", function () {
        console.log(this);
        time = 5;
        $("#time_display").text(time);
    });
    $('#time6').on("click", function () {
        console.log(this);
        time = 6;
        $("#time_display").text(time);
    });
    $('#time7').on("click", function () {
        console.log(this);
        time = 7;
        $("#time_display").text(time);
    });
    $('#time8').on("click", function () {
        console.log(this);
        time = 8;
        $("#time_display").text(time);
    });
    $('#time9').on("click", function () {
        console.log(this);
        time = 9;
        $("#time_display").text(time);
    });
    $('#time10').on("click", function () {
        console.log(this);
        time = 10;
        $("#time_display").text(time);
    });
    $('#time11').on("click", function () {
        console.log(this);
        time = 11;
        $("#time_display").text(time);
    });
    $('#time12').on("click", function () {
        console.log(this);
        time = 12;
        $("#time_display").text(time);
    });
    $('#time13').on("click", function () {
        console.log(this);
        time = 13;
        $("#time_display").text(time);
    });
    $('#time14').on("click", function () {
        console.log(this);
        time = 14;
        $("#time_display").text(time);
    });
    $('#time15').on("click", function () {
        console.log(this);
        time = 15;
        $("#time_display").text(time);
    });
    $('#time16').on("click", function () {
        console.log(this);
        time = 16;
        $("#time_display").text(time);
    });
    $('#time17').on("click", function () {
        console.log(this);
        time = 17;
        $("#time_display").text(time);
    });
    $('#time18').on("click", function () {
        console.log(this);
        time = 18;
        $("#time_display").text(time);
    });
    $('#time19').on("click", function () {
        console.log(this);
        time = 19;
        $("#time_display").text(time);
    });
    $('#time20').on("click", function () {
        console.log(this);
        time = 20;
        $("#time_display").text(time);
    });
    $('#time21').on("click", function () {
        console.log(this);
        time = 21;
        $("#time_display").text(time);
    });
    $('#time22').on("click", function () {
        console.log(this);
        time = 22;
        $("#time_display").text(time);
    });
    $('#time23').on("click", function () {
        console.log(this);
        time = 23;
        $("#time_display").text(time);
    });
    $('#time24').on("click", function () {
        console.log(this);
        time = 24;
        $("#time_display").text(time);
    });
    $('#time25').on("click", function () {
        console.log(this);
        time = 25;
        $("#time_display").text(time);
    });
    $('#time26').on("click", function () {
        console.log(this);
        time = 26;
        $("#time_display").text(time);
    });
    $('#time27').on("click", function () {
        console.log(this);
        time = 27;
        $("#time_display").text(time);
    });
    $('#time28').on("click", function () {
        console.log(this);
        time = 28;
        $("#time_display").text(time);
    });
    $('#time29').on("click", function () {
        console.log(this);
        time = 29;
        $("#time_display").text(time);
    });
    $('#time30').on("click", function () {
        console.log(this);
        time = 30;
        $("#time_display").text(time);
    });
    $('#time31').on("click", function () {
        console.log(this);
        time = 31;
        $("#time_display").text(time);
    });
    $('#time32').on("click", function () {
        console.log(this);
        time = 32;
        $("#time_display").text(time);
    });
}
$(document).ready(function () {
    daycheck();
    timecheck();

    $("#submitBtn").on("click", function () {
        if (day !== 1000 && time !== 1000) {
            console.log("day= " + day + " " + "time= " + time);
            console.log(calendar[day - 1, time - 1] = 1);

            // calculating cell position
            cellNum = day + (time - 1) * 7;

            // marking the selected cell
            // if (this.id === "submitBtn") {
                document.getElementById("cell" + cellNum).innerHTML = "&#128077";
                document.getElementById("cell" + cellNum).style.backgroundColor = "#00ff00";
            // } else { // (this.id === "submitBtn2")
            //     document.getElementById("cell" + cellNum).innerHTML = "&#128078";
            //     document.getElementById("cell" + cellNum).style.backgroundColor = "#ff0000";
            // }
            // reset day and time position
            day = 1000;
            time = 1000;

            // removing previously selected day and time
            $("#day_display").text("");
            $("#time_display").text("");
            // $("#day_display2").text("");
            // $("#time_display2").text("");
        };
    });
    $("#submitBtn2").on("click", function () {
        if (day !== 1000 && time !== 1000) {
            console.log("day= " + day + " " + "time= " + time);
            console.log(calendar[day - 1, time - 1] = 1);

            // calculating cell position
            cellNum = day + (time - 1) * 7;

            // marking the selected cell
            // if (this.id === "submitBtn") {
            //     document.getElementById("cell" + cellNum).innerHTML = "&#128077";
            //     document.getElementById("cell" + cellNum).style.backgroundColor = "#00ff00";
            // } else { // (this.id === "submitBtn2")
                document.getElementById("cell" + cellNum).innerHTML = "&#128078";
                document.getElementById("cell" + cellNum).style.backgroundColor = "#ff0000";
            // }
            // reset day and time position
            day = 1000;
            time = 1000;

            // removing previously selected day and time
            // $("#day_display").text("");
            // $("#time_display").text("");
            $("#day_display").text("");
            $("#time_display").text("");
        };
    });
});