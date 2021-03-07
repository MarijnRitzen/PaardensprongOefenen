let wordString = "aandrang aanwinst aanrecht aanklaag aanstoot aandacht aambeeld aanduwen aanhoren aanmanen afvalzak afwasbak agitator afwassen afwezige alchemie allemaal afstoten algemeen allergie afwijzen alarmbel bekertje beklagen bedanken bedoelen behangen bedenken beginner bekeuren bekijken bekleden bedelaar biertent bierkaai bezwaren bijenwas bijholte bierbuik blikvoer bloesems bloembol bloedbad blaasjes bloedvat bladgoud bioritme bijziend bisschop blijheid bloemist bijstand bilspier biograaf bladhout bladhout blessure biologen bloempot blokkade bloembak buikwond brochure brandbom bullebak boxkleed broekrok broodmes breiwerk braadpan bungalow briljant charmant campagne buskaart bustocht ceintuur charisma chantage capsules centraal campings celibaat charmeur carillon carnaval catering celliste celstraf conditie comeback couveuse creaties creatief cursiste constant commotie collecte cyclamen crematie compleet criteria dansfilm dageraad dagdroom dakramen danspaal databank debutant debatten dankbaar dagtocht dageraad darmwand danseres dakkapel dartbord deegwaar deadline dagkaart dagtaken debiteur damsport dagomzet darkroom defensie diameter diabetes denkfout dezelfde deugniet delirium desolaat diagnose desnoods deurpost deeltaxi designer diefstal dierbaar directie dodencel doopceel donateur doelpunt digibeet dimensie dodenrit doopjurk doodziek doodslag dimlicht digitaal dievegge diepgang dirigent doorgang dominant dijbenen dienblad diffusie dijspier domotica doodstil document diervoer difterie dividend dompelen dompteur dikwijls drijfnat duikfles drukwerk drumstok dranghek driehoek drugtest duurzaam druppels drukfout dwangsom droogrek duinroos drumsolo drukinkt dressoir drukplek echtpaar economie eetkamer eisprong elleboog eigendom eekhoorn eerwraak eierdoos eerzucht eetpauze eiwitten ellendig elastiek eettafel eindnota eikentak eindzege eeltlaag ecologie economen eentonig eetbuien eicellen eierstok eigenaar eetgerei educatie empathie episodes epidemie enclaves ereteken ergernis explosie evenaren erewraak erfrente esdoorns ervaring ensemble energiek ereronde eurozone expansie eyeliner evolutie essentak erfzonde erelijst essentie failliet facelift favoriet fileleed flexibel filmster fijnstof festival farmacie fietsbel fietspad flapdrol fietsbus fantasie factoren feilbaar fietsrek filteren flaporen fanatiek feilloos fietstas filmdiva flamingo filmdoek facturen fabuleus feminist feedback fauteuil flaneren feestdag fungeren fotoblad fulltime frequent frietzak fraudeur fruitsap frikadel foutloos fractuur fruithap fragment frappant framboos gangetje gaskabel gastkoor gangkast gasmeter gasketel gaskraan gastvrij galsteen galajurk gastheer galwegen garnalen gebraden geborgen gebeente geestige gebulder geblader gebreken gedrocht gedroogd gedeelte gebruikt gebeuren geboorte gedaagde gegevens gedweild gebleekt gedaante gedonder geduldig gefocust gedachte gebitjes gekietel geldezel geldroof geldgids gekeuvel geldstuk geleider gelispel geintjes gekibbel geldkist geliefde gemeente gelovige geldlade gekroond geluiden geloftes gekwetst geluidje gesabbel gepoetst genezing genocide gentiaan gepieker geseling genodigd genereus gerommel geriater gerammel generiek geritsel geslaagd gerochel geneuzel genitaal geograaf geranium geroddel geslacht genetica";
let wordList = wordString.split(" ")

rightWay = [0, 4, 5, 1, 7, 3, 2, 6];
leftWay = [0, 6, 2, 3, 7, 1, 5, 4];

// box1 = document.querySelector('#one');
// box2 = document.querySelector('#two');
// box3 = document.querySelector('#three');
// box4 = document.querySelector('#four');
// box5 = document.querySelector('#five');
// box6 = document.querySelector('#six');
// box7 = document.querySelector('#seven');
// box8 = document.querySelector('#eight');

// boxes = [box1, box2, box3, box4, box5, box6, box7, box8];

let word;

boxes = $('.grid-item').map(function() {return $(this)}).get()

const TIME_FOR_PAARDENSPRONG = 20;
let timeElapsed;
let timerInterval;

function fillBoxes() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip('hide');
      })
    $('#answer').val("");
    $('#answer').focus();
    timeElapsed = 0;
    clearInterval(timerInterval);
    startTimer();
    word = wordList[Math.floor(Math.random() * wordList.length)]
    $('#answer').css("color", "black");
    $('.grid-item').each((index, element) => $(element).css("color", "black"));
    let rightWayRound = Math.random();
    let startPlace = Math.floor(Math.random() * 8); // [0..7]

    if (rightWayRound > 0.5) {
        for (let i = 0; i < 8; i++) {
            boxes[rightWay[(startPlace + i)%8]].html(word.charAt(i).toUpperCase());
        }
    } else {
        for (let i = 0; i < 8; i++) {
            boxes[leftWay[(startPlace + i)%8]].html(word.charAt(i).toUpperCase());
        }
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed += 0.05;
        timeLeft = TIME_FOR_PAARDENSPRONG - timeElapsed;
        
        let fraction = timeElapsed / TIME_FOR_PAARDENSPRONG;
        if (fraction < 1) {
            $('#circleTimer').attr('stroke-dasharray', `0 ${fraction * 283} 283`);
        }
    }, 50)
}

function checkAnswer(input) {
    if (input.key == "Enter") {
        if ($('#answer').val() == word) {
            $('#answer').css("color", "green");
            $('.grid-item').each((index, element) => $(element).css("color", "green"));
        } else {
            $('#answer').css("color", "red");
            $('.grid-item').each((index, element) => $(element).css("color", "red"));
        }
    } else if (input.key == "1") {
        resetTimer();
    } else if (input.key == "2") {
        fillBoxes();
    }
}

function resetTimer() {
    timeElapsed = 0;
    let input = $('#answer').val();
    $('#answer').val(input.slice(0,-1));
    $('#answer').focus();
}

$('#nieuwWoord').click(fillBoxes);
$('#resetTimer').click(resetTimer);
$('#answer').keyup(checkAnswer);

// Enable tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip('show')
  })