$('.grid-item:not(.center)').fitText(0.15);

let wordString = "aandrang aanwinst aanrecht aandacht aambeeld aanhoren afvalzak afwasbak afwassen afwezige alchemie allemaal afstoten algemeen allergie afwijzen alarmbel bekertje bedanken bedenken beginner bekeuren bekijken bekleden bedelaar biertent bezwaren bierbuik blikvoer bloembol bloedbad bloedvat bladgoud bioritme bijziend bisschop blijheid bloemist bijstand bilspier biograaf bladhout blessure biologen bloempot blokkade bloembak buikwond brochure brandbom bullebak broodmes breiwerk braadpan bungalow briljant charmant campagne buskaart bustocht ceintuur charisma chantage capsules centraal campings celibaat charmeur carillon carnaval catering celliste celstraf conditie comeback couveuse creaties creatief cursiste constant commotie collecte cyclamen crematie compleet criteria dansfilm dageraad dagdroom dakramen danspaal databank debutant debatten dankbaar dagtocht dageraad darmwand danseres dakkapel dartbord deegwaar deadline dagkaart dagtaken debiteur damsport dagomzet defensie diameter diabetes denkfout dezelfde deugniet delirium desolaat diagnose desnoods deurpost deeltaxi designer diefstal dierbaar directie dodencel doopceel donateur doelpunt digibeet dimensie dodenrit doopjurk doodziek doodslag dimlicht digitaal dievegge diepgang dirigent doorgang dominant dijbenen dienblad diffusie dijspier doodstil document diervoer difterie dividend dompelen dompteur dikwijls drijfnat duikfles drukwerk drumstok dranghek driehoek drugtest duurzaam druppels drukfout dwangsom droogrek duinroos drumsolo drukinkt dressoir drukplek echtpaar economie eetkamer eisprong elleboog eigendom eekhoorn eerwraak eierdoos eerzucht eetpauze eiwitten ellendig elastiek eettafel eindnota eikentak eindzege eeltlaag ecologie economen eentonig eetbuien eicellen eierstok eigenaar eetgerei educatie empathie episodes epidemie enclaves ereteken ergernis explosie evenaren erewraak erfrente ervaring ensemble energiek ereronde eurozone expansie eyeliner evolutie essentak erfzonde erelijst essentie failliet facelift favoriet fileleed flexibel filmster fijnstof festival farmacie fietsbel fietspad flapdrol fietsbus fantasie factoren feilbaar fietsrek filteren flaporen fanatiek feilloos fietstas filmdiva flamingo filmdoek facturen fabuleus feminist feedback fauteuil flaneren feestdag fungeren fotoblad fulltime frequent frietzak fraudeur fruitsap frikadel foutloos fractuur fruithap fragment frappant framboos gangetje gaskabel gastkoor gangkast gasmeter gasketel gaskraan gastvrij galsteen galajurk gastheer galwegen garnalen gebraden geborgen gebeente geestige gebulder geblader gebreken gedrocht gedroogd gedeelte gebruikt gebeuren geboorte gedaagde gegevens gedweild gebleekt gedaante gedonder geduldig gefocust gedachte gebitjes gekietel geldezel geldroof geldgids gekeuvel geleider gelispel geintjes gekibbel geldkist geliefde gemeente gelovige geldlade gekroond geluiden geloftes gekwetst geluidje gesabbel gepoetst genezing genocide gepieker geseling genodigd genereus gerommel geriater gerammel generiek geritsel geslaagd gerochel geneuzel genitaal geograaf geranium geroddel geslacht genetica gipswand gewricht gifbeker glaswand gezellig gewoonte glaswerk gitarist gladheid giebelen gitzwart glijvlak glorieus gijzelen gletsjer geweldig gewillig glansrol gisteren graffiti granaten golfclub golfbaan gradatie grafkist goedheid graficus grijparm groenbak groenten grasrand grachtenhaalbaar handdoek hangsnor hazenlip halslijn halfstok haartype haarverf handzaam harmonie hangkast haakneus handzeep hartzeer harpiste hardheid handboei halogeen haarwerk hagelbui handboek handpalm haarloos haarband haarstuk halsband handicap hartslag harttoon hangslot helemaal helpdesk hoektand hoefsmid hielprik historie hersenen hologram hematoom heilzaam heleboel herhalen hoestbui hoofdvak huisarts hulplijn huisbaas houtworm hoogstam hoektand huidarts houtzaag huismerk hulppost huilbaby houtlijm houtboor hoofdzin hooivork hopeloos houdbaar hulphond huiswerk huilerig hormonen hooiberg hoofdsom honkvast hondsmoe hotelbar huisraad hulpteam hotelbed hoestbui huwelijk humorist huurhuis humanist huurauto humeurig huurbaas ijsbeker ijssalon ijswafel infectie indeling ijspegel idealist inflatie illegaal identiek imposant inboedel illusies impotent infobord inclusie ijshoorn indianen individu inbreker inleider inspraak inruilen injectie inktvlek insuline insignes instinct innemend internet inlegvel inlander interval jaarnota jeeptour jongleur jeugdlid jachthut jaarplan jaarrede kaalslag kaasrasp kaasboer kaassaus jaargang judobond jongeman jointjes juffrouw jihadist jongetje journaal jubileum jaarloon jonagold kaaklijn kaderlid kaarsvet kaakklem kaakbeen kademuur juwelier kabouter";
let wordList = wordString.split(" ")

rightWay = [0, 4, 5, 1, 7, 3, 2, 6];
leftWay = [0, 6, 2, 3, 7, 1, 5, 4];

let word;

boxes = $('.grid-item:not(.center)').map(function() {return $(this)}).get()

const TIME_FOR_PAARDENSPRONG = 20;
let timeElapsed;
let timerInterval;
let rightWayRound;
let startPlace;
let paused = false;
let showingSolution = false;

function fillBoxes() {
    resetValues();
    startTimer();
    word = wordList[Math.floor(Math.random() * wordList.length)]
    rightWayRound = Math.random();
    startPlace = Math.floor(Math.random() * 8); // [0..7]
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

function resetValues() {
    $('#answerDiv').css('display', 'none');
    timeElapsed = 0;
    paused = false;
    clearInterval(timerInterval);
    $('#answer').css("color", "white");
    $('#answer').val("");
    $('#giveSolution').html("Ik weet het!");
    $('.grid-item:not(.center)').each((index, element) => $(element).css({"color": "black", "background-color":"white"}));
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (!paused) {
            timeElapsed += 0.05;
            timeLeft = TIME_FOR_PAARDENSPRONG - timeElapsed;
            
            let fraction = timeElapsed / TIME_FOR_PAARDENSPRONG;
            if (fraction < 1) {
                $('#circleTimer').attr('stroke-dasharray', `0 ${fraction * 283} 283`);
            }
        }
    }, 50)
}

function checkAnswer(input) {
    if (input.key == "Enter") {
        if ($('#answer').val().toUpperCase() == word.toUpperCase()) { // Correct
            $('#answer').css("color", "green");
            $('ul#times').append(`<li class="list-group-item list-group-item-success">Tijd gebruikt: ${timeElapsed.toFixed(2)}s</li>`);
            $('.grid-item').each((index, element) => $(element).css("color", "green"));
            showSolution();
        } else { // Incorrect
            $('#answer').css("color", "red");
            $('ul#times').append(`<li class="list-group-item list-group-item-danger">Tijd gebruikt: ${timeElapsed.toFixed(2)}s</li>`);
            $('.grid-item').each((index, element) => $(element).css("color", "red"));
            showSolution();
        }
    }
}

function giveSolution() {
    if (paused) {
        $('#giveSolution').html("Ik weet het!");
        paused = false;
    } else {
        $('#giveSolution').html("Laat tijd verder gaan.");
        $('#answerDiv').css('display', 'flex');
        $('#answer').val("");
        $('#answer').focus();
        $('#answer').trigger('click');
        paused = true;
    }
}

function resetTimer() {
    timeElapsed = 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showSolution() {
    if (showingSolution || word == undefined) {
        return;
    }
    paused = true;
    let currentWord = word;
    showingSolution = true;
    $('.grid-item:not(.center)').each((index, element) => $(element).css({"color": "black", "background-color":"white"}));
    if (rightWayRound > 0.5) {
        for (let i = 0; i < 8; i++) {
            if (currentWord != word) {
                break;
            }
            boxes[rightWay[(startPlace + i)%8]].css({"color": "white", "background-color": "black"});
            if (i < 3) {
                await sleep(1000);
            } else {
                await sleep(600);
            }
        }
    } else {
        for (let i = 0; i < 8; i++) {
            if (currentWord != word) {
                break;
            }
            boxes[leftWay[(startPlace + i)%8]].css({"color": "white", "background-color": "black"});
            if (i < 3) {
                await sleep(1000);
            } else {
                await sleep(600);
            }
        }
    }
    showingSolution = false;
}

$('#nieuwWoord').click(fillBoxes);
$('#resetTimer').click(resetTimer);
$('#showSolution').click(showSolution);
$('#giveSolution').click(giveSolution);
$('#answer').keyup(checkAnswer);
