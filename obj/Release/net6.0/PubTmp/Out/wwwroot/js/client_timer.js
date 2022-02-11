﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


connection.on("ReceiveMessage", function (Eventmessage) {
  
    if (Eventmessage.subject == "start new game") {
        var objgame = JSON.parse(Eventmessage.message);
        var gameinfo = ""
        gameinfo += '<span class="font-style-2">' + objgame.createddate.substr(8, 2) + '/' +objgame.createddate.substr(5, 2) + '/' + objgame.createddate.substr(0, 4) + '</span>';
        gameinfo += '<span class="font-style-2">#' + objgame.gameid + '&nbsp;' + objgame.createddate.substr(11, 8) + '</span>';

        $("#div_gameinfo").html(gameinfo);
        $("#div_resultinfo").html("");
        clear_result();
        loadnumbers();
    } else if (Eventmessage.subject == "count down") {
        var objgame = JSON.parse(Eventmessage.message);
        console.log(objgame)
        countdown(objgame.timeremaining, objgame.gameid);
    }
    else if (Eventmessage.subject == "start result") {
            var objresult = JSON.parse(Eventmessage.message);
                var resultinfo = ""
        resultinfo += '<span class="font-style-2">' + objresult.ResultDate.substr(8, 2) + '/' + objresult.ResultDate.substr(5, 2) + '/' + objresult.ResultDate.substr(0, 4) + '</span>';
        resultinfo += '<span class="font-style-2">#' + objresult.GameID + '&nbsp;' + objresult.ResultDate.substr(11, 8) + '</span>';

        $("#div_resultinfo").html(resultinfo);


    } else if (Eventmessage.subject == "result1") {
        var resultstring = Eventmessage.message;
        load_result(1, resultstring);
    } else if (Eventmessage.subject == "result2") {
        var resultstring = Eventmessage.message;
        load_result(2, resultstring);
    } else if (Eventmessage.subject == "result3") {
        var resultstring = Eventmessage.message;
        load_result(3, resultstring);
    } else if (Eventmessage.subject == "result4") {
        var resultstring = Eventmessage.message;
        load_result(4, resultstring);
    } else if (Eventmessage.subject == "result5") {
        var resultstring = Eventmessage.message;
        load_result(5, resultstring);
    } else if (Eventmessage.subject == "end result") {
        var jsonresult = Eventmessage.message;
        show_result(jsonresult);

    } else if (Eventmessage.subject == "end game") {

    }
  

});




connection.start().then(function () {



    console.log("hub connected");

    var server = getUrlParameter("server");
    loadnumbers();
    clear_result();
   

}).catch(function (err) {
    return console.log(err.toString());
});

var maxsecond = 305;//360seconds=6mn


function show_result_html(datajson) {
    var data =JSON.parse( datajson);
    console.log("display result on result list");
    console.log(data);

    var html = '';
    //html += "<div>";
    //html += "Game #" + data.GameID;
    //html += "</div>";
    //html += "<div>";
    //html += "<span class='round-number-green'>" + data.Result1 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result2 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result3 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result4 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result5 + "</span>";;
    //html += "</div>"

    html += '<div class="recent-item">'
    html += '<p><span style="margin-right: 15px">#' + data.GameID + '&nbsp;' + data.ResultDate.substr(11, 8) + '</span><a href="javascript: void(0);" onclick="LottoInst.showRecentDetail(0)"> &gt;&gt;</a></p>'
    html += '<div class="special"><div class="special-abcde"><span>' + data.Result1 + '</span><span>' + data.Result2 + '</span><span>' + data.Result3 + '</span><span>' + data.Result4 + '</span><span>' + data.Result5 + '</span></div>'
    html += '<div class="special-x"><span style="background: #f73">U</span><span style="background: #ea8d34">R1</span></div></div>'
    html += '</div>'

    console.log(html);
    var prehtml = $("#div_result_list").html();
    html = prehtml + html;
    $("#div_result_list").html(html);
}
function clientTimer(secondsout) {
  
    var totalminute = parseInt((maxsecond - secondsout) / 60);
    var seconds = maxsecond - totalminute * 60 - secondsout;
    $("#div_timer").html("Minute:" + totalminute + ";Second:" + seconds);
}


var totalminute = 0;
var timespent = 0;
function countdown(timeremaining,gameid) {
    console.log("start count:" + timeremaining);
    
    totalminute = parseInt((timeremaining) / 60);

    

    var seconds = timeremaining - totalminute * 60;

    if (seconds <= 0) {
        $("#div_timer").html("Time up!");

    } else {
        $("#div_timer").html("Minute:" + totalminute + ";Second:" + seconds);

    }
        
}

var result_index = 0;
function load_result(result_index, result) {



        var result_number;
        if (result_index == 1) {
            result_number = result;
            $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
            $("#span_result1").html(result_number);
        } else {
            if (result_index == 2) {
                result_number = result;
                $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
                $("#span_result2").html(result_number);
            } else {
                if (result_index == 3) {
                    result_number = result;
                    $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
                    $("#span_result3").html(result_number);
                } else {
                    if (result_index == 4) {
                        result_number = result;
                        $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
                        $("#span_result4").html(result_number);
                    } else {
                        if (result_index == 5) {
                            result_number = result;
                            $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
                            $("#span_result5").html(result_number);
                        } else {
                            //result_index = 0;
                            //show_result(datajson);
                            //clearInterval(interval);
                        }
                        
                    }

                }

            }

        }


}

function show_result(datajson) {
    var data = JSON.parse(datajson);
    show_result_html(datajson);

   
    //end_game(gameid);
}



//$(document).ready(    
//    clear_result_list
//);
 


function clear_result() {
    $("#span_result1").html("");
    $("#span_result2").html("");
    $("#span_result3").html("");
    $("#span_result4").html("");
    $("#span_result5").html("");

   
  


}

function clear_result_list() {
    $("#div_result_list").html("");

}
function loadnumbers() {
    var html = "";
    for (var i = 1; i < 100; i++) {
        html += "<div class='round-number' id='span_n" + i + "'>" + i + "</div>";
    }
      


    $("#div_numbers").html(html);
}




var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1)


    var uri_encoded = replaceAll(sPageURL, '%', '%25');
    console.log(uri_encoded);
    var sURLVariables = uri_encoded.split('&'),
        sParameterName,
        i;


    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

