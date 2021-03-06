var num;
var status = "off";
var arr = [];
var userArr = [];
var i = 0;
var j = 0;
var strictFlag = 0;
var counter = 0;
var one = document.getElementById("firstSnd"); //sound elements
var two = document.getElementById("secondSnd");
var three = document.getElementById("thirdSnd");
var four = document.getElementById("fourthSnd");
var y;

var cw = $('#game').width();
$('#game').css({
    'height': cw + 'px'
});

var turnOff = function(){
    $("#red").removeClass("lred");
    $("#yellow").removeClass("lylw");
    $("#green").removeClass("lgrn");
    $("#blue").removeClass("lblue");
}

var autoTurnOff = function(){
     setTimeout(function(){
    turnOff();
}, 500);
};

//function to play sounds
var playSnds = function(digit){
    //function to play sounds
    var x = $(digit).attr("id");

    if(digit == 1 || x == "green"){
        $("#green").addClass("lgrn");
        $("#red").removeClass("lred");
        $("#yellow").removeClass("lylw");
        $("#blue").removeClass("lblue");
        one.play();
    } else if (digit == 2 || x == "red"){
        $("#red").addClass("lred");
        $("#yellow").removeClass("lylw");
        $("#blue").removeClass("lblue");
        $("#green").removeClass("lgrn")
        two.play();
    } else if (digit == 3 || x == "yellow"){
        $("#yellow").addClass("lylw");
        $("#blue").removeClass("lblue");
        $("#green").removeClass("lgrn");
        $("#red").removeClass("lred");
        three.play();
    } else if (digit == 4 || x == "blue"){
        $("#blue").addClass("lblue");
        $("#red").removeClass("lred");
        $("#yellow").removeClass("lylw");
        $("#green").removeClass("lgrn");
        four.play();
    }
};


$("#screen > span").html(counter);

function getRandomNum(min, max) {
    counter++;
    $("#screen > span").html(counter);
    min = Math.ceil(min);
    max = Math.floor(max);
    num = Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    arr.push(num);
    return num;
}

var restart = function(){
    arr = [];
    userArr = [];
    i = 0;
    getRandomNum(1,4);
    soundsLights();
}

$("#start").click(function(){
    status = "on";
    counter = 0;
    restart();
})

$("#strict").click(function(){
    if(strictFlag == 1){
        strictFlag = 0;
        return false;
    } else {
        strictFlag = 1;
        return false;
    }
});

var k = 0;
var soundsLights = function(){
    if (k <= arr.length){
       y =  setTimeout(function(){
            playSnds(arr[k]);
            k++;
            setTimeout(function(){
                soundsLights();
            }, 50);
        }, 750);
    } else {
        turnOff();
        k = 0; 
        return
    }
};

$(".inputs > div").click(function(){
    var val = (this).getAttribute("value");
    userArr.push(val);
  
    //if the last item in the array is equal to the last item in the userArr, userArr becomes empty
    //i goes to zero, randomNum is drawn; also i needs to be equaled to the lenght of the arr -1; last item
     if(i == arr.length - 1 && arr[arr.length -1] == userArr[userArr.length -1]){
        if(counter == 20){
            $("#game, #rules").remove();
            $("body").append("<div id='winner'><p>Congrats on beating the game!</p><button id='restart'>Restart</button></div>");
        }else{
        userArr = [];
        i = 0;
        getRandomNum(1,4);
        setTimeout(function(){
            soundsLights();
        }, 500);
        return;
        }
    }
    //if the item in the array is equaled to the val which was the key pressed
    if(arr[i] == val){
        i++;
    } else {
        if(strictFlag == 1 && status == "on"){
            counter = 0;
            restart();
        } else {
            userArr = [];
            i = 0;
            setTimeout(function(){
                k = 0;
                soundsLights();
            }, 500);
        }
    }
});

$( window ).resize(function() {
    var cw = $('#game').width();
    $('#game').css({
        'height': cw + 'px'
    });
    $(".inputs").css({'height': 100 + "%"});
  });

  $(document.body).on("click", "#restart", function() {
    window.location.href = window.location.href;
  });