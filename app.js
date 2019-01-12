//europe trivia game

$(document).ready(function () {

    //function to keep earth gif moving
    function validateField() { 
        var docs = document.getElementById("img");
        docs.setAttribute("src", "gif_path");
        };

    //generates initial screen / home page
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block startbtn' href='#' role='button'>Click Here To Start</a></p>";
        $(".mainDiv").html(startScreen);
    }

    initialScreen();

    //when the user clicks 'start'
    $("body").on("click", ".startbtn", function (event) {
        event.preventDefault();  // added line to test scrolling issue
        clickSound.play();
        generateHTML();
        timerWrapper();
    });

    //when the user clicks on an answer
    $("body").on("click", ".answer", function (event) {
        //correct answer
        // clickSound.play();    
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        }
        else {
            //wrong answer
            clearInterval(theClock);
            generateLoss();
        }
    });

    //when user clicks 'play again' after a game ends
    $("body").on("click", ".resetBtn", function (event) {
        clickSound.play();
        resetGame();
    });

});

//if the user does not select an answer before the timer runs out
function userLossTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's Up!  The country was: " + correctAnswers[questionCounter] + "</p>" + losingImages[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 4000); 
}

//if the user selects the correct answer
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timerText'>With <span class='timer'>" + counter + " seconds to spare!</span></p>" + "<p class='text-center'>You're correct! The country is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 4000); 
}

//if the user selects the wrong answer
function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>No, the correct answer was: " + correctAnswers[questionCounter] + "</p>" + losingImages[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 4000); 
}

//function to generate possible answers for each question
function generateHTML() {
    gameHTML = "<p class='text-center timerText'>Countdown: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='firstAnswer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainDiv").html(gameHTML);
}

//function to check if there are more questions
//after each question, it will either show the next question or generate the final 'game-over' page
function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 20;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

//function to give each question 20 seconds, show countdown in html, and generate loss if player does not select an answer in time
function timerWrapper() {
    theClock = setInterval(twentySeconds, 1000);
    function twentySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            userLossTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}


//function for when it's game over
function finalScreen() {

    // unique end-game message if the user got a perfect score of 8
    if (correctTally === 8) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>100%! You got a perfect score!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Can You Do It Again?</a></p>";
        $(".mainDiv").html(gameHTML);
    } 
    //if correct tally is 5-7 out of 8
    else if (correctTally < 8 && correctTally > 4) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You did great!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Play Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if tally is 4 out of 8
    else if (correctTally === 4) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You scored 50%." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Play Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if correct tally is between 1-3
    else if (correctTally < 4 && correctTally != 0) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You need to stay in school." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Try Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if the correct tally is zero
    else { 
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You are horrible at this." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Try Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
}

//function to reset game (function called when player presses button to restart the game)
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 20;
    generateHTML();
    timerWrapper();
}



//set counter to 20
var counter = 20;

//set questions (in the form of an image) inside array
var questionArray = ["<img src='images/eurUK1.png'></img>", "<img src='images/eurFrance1.png'></img>", "<img src='images/eurSpain1.png'></img>", "<img src='images/eurUkraine1.png'></img>", "<img src='images/eurItaly1.png'></img>", "<img src='images/eurSweeden1.png'></img>", "<img src='images/eurBulgaria1.png'></img>", "<img src='images/eurGermany1.png'></img>"];

//set possible answers inside array, matching each object's index number to the correlating question image
var answerArray = [["United Kingdom", "Iceland", "Greenland", "Ireland"], ["Germany", "France", "Poland", "Denmark"], ["Portugal", "Italy", "Spain", "Turkey"], ["Russia", "Croatia", "Ukraine", "Czech Republic"], ["Hungary", "Switzerland", "Andorra", "Italy"], ["Sweeden", "Norway", "Finland", "Greece"], ["Cyprus", "Bulgaria", "Austria", "Romania"], ["France", "Netherlands", "Spain", "Germany"]];

//array of images to display after the user selects a right answer
var imageArray = ["<img class='center-block img-right' src='images/ukimage1.png'>", "<img class='center-block img-right' src='images/franceimage1.png'>", "<img class='center-block img-right' src='images/spainimage1.png'>", "<img class='center-block img-right' src='images/ukraineimage1.png'>", "<img class='center-block img-right' src='images/italyimage1.png'>", "<img class='center-block img-right' src='images/sweeden1.png'>", "<img class='center-block img-right' src='images/bulgariaimage1.png'>", "<img class='center-block img-right' src='images/germanyimage1.png'>"];

//array of images to display after the user selects a wrong answer
var losingImages = ["<img class='center-block img-right' src='images/wrongukimage1.png'>", "<img class='center-block img-right' src='images/wrongfranceimage1.png'>", "<img class='center-block img-right' src='images/wrongspainimage1.png'>", "<img class='center-block img-right' src='images/wrongukraineimage1.png'>", "<img class='center-block img-right' src='images/wrongitalyimage1.png'>", "<img class='center-block img-right' src='images/wrongsweeden1.png'>", "<img class='center-block img-right' src='images/wrongbulgariaimage1.png'>", "<img class='center-block img-right' src='images/wronggermanyimage1.png'>"];

//set correct answers inside array, index numbers matching the correlating question
var correctAnswers = ["A. United Kingdom", "B. France", "C. Spain", "C. Ukraine", "D. Italy", "A. Sweeden", "B. Bulgaria", "D. Germany"];

//other empty variables or number variables set to zero
var questionCounter = 0;
var startScreen;
var gameHTML;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

//variable to store audio for the game
var clickSound = new Audio("BuildThatWallRMX2.mp3");



