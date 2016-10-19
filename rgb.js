var colorToGuess = getRandomColor();
var inGame = true;
var randomDivNumber; /* Gives us which div square is the correct one, 0-2 or 0-5 depending on easy/hard mode */
var colorDivs; /* Coloured Div Squares */
var nbOfSquares; /* Number of square to guess from */
var wonAudio = new Audio('victory.wav');
var clickAudio = new Audio('click.wav');

/* First run of the game when page loads */
play();

/* ---------------------------------------- Main function  ------------------------------------- */
function play(){
    inGame = true;
    colorToGuess = getRandomColor();
    colorDivs = document.querySelectorAll(".row div");
    nbOfSquares = colorDivs.length;
    document.querySelector("#message").textContent = "";
    document.querySelector("nav > p").innerHTML = "new<span class=\"display-large\"> colors</span>";

    /* Sets colorToGuess rgb numeric values tips in the top header */
    document.querySelector("#red").textContent = colorToGuess.r;
    document.querySelector("#green").textContent = colorToGuess.g;
    document.querySelector("#blue").textContent = colorToGuess.b;
    document.querySelector("header").style.background = "#1c3030";

    /*  Assigns random colors to the square divs */
    for (var div of colorDivs){
        var newColor;
        newColor = getRandomColor();
        div.style.background = newColor.hexa;
    }

    /*  Reassign correct colorToGuess to a random div square   */
    randomDivNumber = Math.floor(Math.random() * nbOfSquares);
    colorDivs[randomDivNumber].style.background = colorToGuess.hexa;

    /*  Set events when user clicks on a square  */
    for (let i = 0; i < colorDivs.length; i++){
        colorDivs[i].addEventListener("click", function(){
            if (inGame) { // Check if we're in a game, problems arised without it when the game was over and we could still click on colored divs.
                if (i != randomDivNumber)
                    this.classList.add("clicked");
                else
                    won();
            }
        });
    }
}

/*  ------------------ After player clicks on the correct div square  -------------------------------------*/
function won(){
    if (inGame) { // Check if we're playing the game.
        wonAudio.play();
        document.querySelector("#message").innerHTML = "<span class=\"display-large\">Correct!</span>";
        document.querySelector("header").style.background = colorToGuess.hexa;
        document.querySelector("nav > p").textContent = "play again?";
        for (var div of colorDivs) {
            div.classList.remove("clicked");
            div.style.background = colorToGuess.hexa;
        }
        inGame = false;
    }
}

/*   ----------- Manages the NEW COLORS / PLAY AGAIN ------------------------------------- */
var newGame = document.querySelector("nav > p");
newGame.addEventListener("click", function(){
    clickAudio.play();
    play();
});


/*   ------------ Manages easy / hard -------------------------------------
*       the class .row : display the colored divs + adds them to colorDivs
*       if easy -> only first row gets a .row class
*       if hard -> both rows get a .row class
*
*       + gives the EASY/HARD button a custom style (through class .selected) if selected
* */
var difficulties = document.querySelectorAll("#difficulty p"); /* 0 = easy, 1 = hard */

/* EASY button click handler */
difficulties[0].addEventListener("click", function(){
    clickAudio.play();
    difficulties[1].classList.remove("selected");
    difficulties[0].classList.add("selected");

    // Displays only first row
    var secondRow = document.querySelectorAll(".container > div")[1];
    secondRow.classList.remove("row");
    secondRow.style.opacity = 0;
    for (var div of colorDivs) {
        div.classList.remove("clicked");
    }
    play(); // launch a new game with easy settings.
});

/* HARD button click handler */
difficulties[1].addEventListener("click", function(){
    clickAudio.play();
    difficulties[0].classList.remove("selected");
    difficulties[1].classList.add("selected");

    // Displays first and second row
    var secondRow = document.querySelectorAll(".container > div")[1];
    secondRow.classList.add("row");
    secondRow.style.opacity = 1;
    for (var div of colorDivs) {
        div.classList.remove("clicked");
    }
    play(); // launch a new game with hard settings
});


/* ------------------------------- UTIL FUNCTIONS --------------------------------------------- */

function getRandomOctet(){
    return Math.floor(Math.random() * (256));
}

/*Adds leading zeros, 7 becomes 07 for instance */
function pad(colorString){
    while (colorString.length < 2){
        colorString = "0" + colorString;
    }
    return colorString;
}

/*      Returns an objects with 4 properties
        r, g, b -> 0-255 number
        hexa    -> string formatted representation of that color (eg. "#a8a8b2")   */
function getRandomColor(){
    var color = {};
    color.r = getRandomOctet();
    color.g = getRandomOctet();
    color.b = getRandomOctet();
    var redString = pad(color.r.toString(16));
    var greenString = pad(color.g.toString(16));
    var blueString = pad(color.b.toString(16));
    color.hexa = "#" + redString + greenString + blueString;
    return color;
}