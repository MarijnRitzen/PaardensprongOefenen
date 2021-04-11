$('.letter, .answer-letter').fitText(0.12);
$('.number').fitText(0.25);

let wordString = "afprijzingen afhaalmoment afluisteraar adviestarief alcoholsmaak afvalfactuur autodidacten";
let wordList = wordString.split(" ");
let word;
let squareUpdater;

letters = $('.letter').map(function() {return $(this)}).get();
answerLetters = $('.answer-letter').map(function() {return $(this)}).get();

function shuffleArray() {
    let indices = Array.from(Array(12).keys());
    for (let i = indices.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = indices[i];
        indices[i] = indices[j];
        indices[j] = temp;
    }
    return indices;
}

function fillLetters() {
    resetValues();
    setTimer(window.performance.now());
    word = wordList[Math.floor(Math.random() * wordList.length)];
    var indices = shuffleArray();
    for (let i = 0; i < 12; i++) {
        letters[i].html(word.charAt(indices[i]).toUpperCase());
        letters[i].off("click");
        letters[i].click(() => {
            if (letters[i].html() != "") {
                answerLetters[indices[i]].html(letters[i].html());
                letters[i].html("");
            };
        });
    }
}

function setTimer(startTime) {
    squareUpdater = setInterval(() => {
        let difference = window.performance.now() - startTime;
        let fraction = 1 - difference / 120000;
        $('#timer').width(`${fraction * 100}%`);
        $('#timer').data('timer', difference);
    }, 50);
}

function pauseTimer() {
    clearInterval(squareUpdater);
}

function unPauseTimer() {
    startTime = window.performance.now() - $('#timer').data('timer');
    squareUpdater = setInterval(() => {
        let difference = window.performance.now() - startTime;
        let fraction = 1 - difference / 120000;
        $('#timer').width(`${fraction * 100}%`);
        $('#timer').data('timer', difference);
    }, 50);
}

function resetTimer() {
    clearInterval(squareUpdater);
    $('#timer').width(`100%`);
    startTime = window.performance.now();
    squareUpdater = setInterval(() => {
        let difference = window.performance.now() - startTime;
        let fraction = 1 - difference / 120000;
        $('#timer').width(`${fraction * 100}%`);
        $('#timer').data('timer', difference);
    }, 50);
}

function checkAnswer(ev) {
    if (ev.key == "Enter") {
        if ($('#answer').val().toUpperCase() == word.toUpperCase()) { // Correct
            $('#answer').css("color", "green");
            pauseTimer();
            showSolution();
        } else { // Incorrect
            $('#answer').css("color", "red");
            pauseTimer();
            showSolution();
        }
    }
}

function showSolution() {
    $('.letter').each((_ ,element) => $(element).click());
}

function resetValues() {
    $('#answer').val("");
    resetTimer();
    $('.answer-letter').each((index, element) => $(element).html(""));
}

$('#answerbox').click(() => {
    $('#answer').focus(); 
    pauseTimer();
});
$('#answer').focusout(unPauseTimer);

$('#nieuwWoord').click(fillLetters);
$('#resetTimer').click(resetTimer);
$('#showSolution').click(showSolution);
$('#answer').keyup(checkAnswer);