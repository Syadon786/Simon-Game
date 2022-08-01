var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var path = "sounds/";
var level = 0;

window.onload = function() {
    $(document).on("keydown", start);
}

function start() {
    $(document).off("keydown", start);
    $("h1").text("Level 0");
    nextSequence();
    $(".btn").on("click", choose);
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    flash(randomChosenColor);   
    playSound(randomChosenColor);

    level++;
    $("h1").text(`Level ${level}`);
    console.log(gamePattern);
}



function choose() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    if(checkAnswer(userChosenColor) === false) {
        gameOver();
        return;
    }
    animatePress(userChosenColor);
    playSound(userChosenColor);

    if(level === userClickedPattern.length) {
         setTimeout(nextSequence, 1000);
         userClickedPattern = [];
    }
}

function checkAnswer(userChosenColor) {
    if(userChosenColor === gamePattern[userClickedPattern.length - 1])
        return true;
    return false;
}

function gameOver() {
    $("body").addClass("game-over");
    playSound("wrong");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];  

    $("h1").text("Game Over, Press Any Key to Restart");
    $(".btn").off("click", choose);
    $(document).on("keydown", start);

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

}

function playSound(name) {
    var audio = new Audio(`${path}${name}.mp3`);
    audio.play();
}

function flash(name) {
    $(`#${name}`).fadeTo(100, 0.3).fadeTo(100, 1.0);
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}