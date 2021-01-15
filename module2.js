var modalita = ''
var endGame = false;
var sequenza = [];
var clickUtenteInseriti = []
var punteggio = 0
var best = 0

$(document).ready(function () {

    // staring page
    $('#modalModalitaWindows').modal('toggle');

    $('#continue').click(function (e) {
        modalita = ''
        endGame = false;
        sequenza = [];
        clickUtenteInseriti = []
        punteggio = 0
        modalita = '';
        preGame()
        
    });

    $('#again').click(function (e) { 
        endGame = false;
        sequenza = [];
        clickUtenteInseriti = []
        punteggio = 0
        preGame()
    });

    $('#changeModalita').click(function (e) { 
        modalita = ''
        endGame = false;
        sequenza = [];
        clickUtenteInseriti = []
        punteggio = 0
        modalita = '';
        $('#modalModalitaWindows').modal('toggle');
        
    });

});


async function preGame(){

    // INPUT MODALITA DI GIOCO (CLASSICA, AVANZATA)
    modalita = $('#modalita .active').attr('value');
    console.log(modalita)

    for (let index = 5; index >= 0 ; index--) {
        // console.log('attesa numero: '+ index)
        await animazioneIniziale(index)        
    }


    console.log('sequenza: '+sequenza.toString())

    game()
}

// round function
async function game(){
        
        $('.livelloNow').text(sequenza.length+1);
        $('.livelloNext').text(sequenza.length+2);

        // inserimento valori
        if(modalita == 'classica'){

            console.log('game modalità classica')
            var number = getRandomInt(1,4)
            sequenza.push(number)

        
        } else {
            console.log('game modalita avanzata')
            
            var livello = sequenza.length
            sequenza = []
            for (let index = 0; index < livello + 1; index++) {
                var number = getRandomInt(1,4)
                sequenza.push(number)
            }
        }

        // operazioni css primo round
        $('.progress-bar').addClass('first');
        $('.progress-bar').removeClass('bg-success');
        $('.progress-bar').addClass('bg-info');

        // stampa sequenza
        console.log('sequenza: '+sequenza.toString())
        console.log('sequenzautente: '+clickUtenteInseriti.toString())
        
        $('.center-game').text('memorizza');
        await sequenzaLuci(sequenza).then(attivaInput())
        $('.center-game').text('sequenza');
}

// sequenza utente
function clickInput(e){

    numeroLampadina = parseInt(e.target.getAttribute('value'))
    // console.log('numero lampadina click: '+numeroLampadina)
    clickUtenteInseriti.push(numeroLampadina)
    
    console.log('click utente array: '+clickUtenteInseriti)
    console.log('sequenza: '+sequenza)

    // progress bar click
    var progressNumber = (clickUtenteInseriti.length / sequenza.length) * 100;
    $('.progress-bar').attr('aria-valuenow', clickUtenteInseriti.length);
    $('.progress-bar').attr('aria-valuemax', sequenza.length);
    $('.progress-bar').css('width', progressNumber+'%');

    if(checkinputUtente()){

        // console.log('ancora player game'+checkinputUtente()+sequenza.length+clickUtenteInseriti.length)
        punteggio++
        attivaInput()

        // aggiorna progress bar valori
        $('.progress-bar .inseriti').text(clickUtenteInseriti.length);
        $('.progress-bar .totali').text(sequenza.length);

        // rimozione css primo round con elementi non clicc
        $('.progress-bar').removeClass('first')
        $('.progress-bar').removeClass('bg-info');
        $('.progress-bar').addClass('bg-success');      


        if(sequenza.length == clickUtenteInseriti.length){
            // console.log('** continua a giocare **')  
            clickUtenteInseriti = [] 
            
            // reset progress bar
            $('.progress-bar .inseriti').text(0);
            $('.progress-bar .totali').text(sequenza.length+1);

            rimuoviInput()
            game();
        }
    } else {

        $('.center-game').text('');
        $('#punteggio').text(punteggio);
        $('#livello').text(sequenza.length);
        if(punteggio > best){
            $('#best').text(punteggio);
        }
        $("#endGameWindows").modal({backdrop: 'static'});
        
        rimuoviInput()
    }

}

// Input utente
function attivaInput(){

    console.log('attivazione input')

    // pulsanti colori
    $('svg path').click((e) => { 
        rimuoviInput()
        clickInput(e)
    });

}

// rimuovi input
function rimuoviInput(){

    console.log('rimuovi input')

    $('svg path').off('click');
    $('svg path').off('mouseenter');
    $('svg path').off('mouseout');

    $("#btnYellow").attr('style','fill: url(#gradient-3)')
    $("#btnBlue").attr('style','fill: url(#gradient-2)')
    $("#btnRed").attr('style','fill: url(#gradient-0)')
    $("#btnGreen").attr('style','fill: url(#gradient-1)')

}

// sequenza luci illuminate
async function sequenzaLuci(sequenza){

    console.log('inizio luci in sequenza'+sequenza.toString())

    for ( let numero of sequenza ){
        await accendiSequenza(numero)
    }
    // console.log('fine luci in sequenza');
}

// accendi lampadina
function accendiLampadina( numero ){

    // console.log('---------------------------')
    // console.log('Accendo lampadina: '+numero)

    // console.log($("#btnYellow").attr('style'))

    if(numero == 1){
        $("#btnYellow").attr('style','fill: url(#gradient-3-active)')
    } else if(numero == 2){
         $("#btnBlue").attr('style','fill: url(#gradient-2-active)')
    } else if(numero == 4){
        $("#btnRed").attr('style','fill: url(#gradient-0-active)')
    } else if(numero == 3){
       $("#btnGreen").attr('style','fill: url(#gradient-1-active)')
    }

}

// spegni lampadina
function spegniLampadina(numero,resolve){

    // console.log('Spengo lampadina: '+numero)

    if(numero == 1){
        $("#btnYellow").attr('style','fill: url(#gradient-3)')
    } else if(numero == 2){
        $("#btnBlue").attr('style','fill: url(#gradient-2)')
    } else if(numero == 4){
        $("#btnRed").attr('style','fill: url(#gradient-0)')
    } else if(numero == 3){
        $("#btnGreen").attr('style','fill: url(#gradient-1)')
    }

    setTimeout(resolve,1000)

}

// accendi la sequenza di luci
 async function accendiSequenza(numero){

     console.log('accendi sequenza')

    return new Promise( (resolve, reject) => {

             accendiLampadina(numero)
            
            setTimeout( () => {
                spegniLampadina(numero, resolve)
            }, 1000)
    })

}

// controlla input utente
function checkinputUtente(){

    let check = true;
    let num = clickUtenteInseriti.length-1

    console.log('lungh: '+num+', sequenza: '+sequenza[num]+', click: '+clickUtenteInseriti[num])

    if(sequenza[num] == clickUtenteInseriti[num]){
        check = true;
    } else {
        check = false;
    }

    // console.log('** '+check+' **')
    return check

}

// animazione partita
function animazioneIniziale(num){

    // console.log('animazione iniziale: '+num)

    if(num == 5){
       console.log('wait 1 s')
    } else if(num == 0){
        $('.center-game').text('');
    } else if(num != 1){
        $('.center-game').text(num-1);
    } else {
        $('.center-game').text('Start');
    }

    return new Promise( (resolve, reject) => {
        setTimeout( () => { resolve(); }, 1000);
    });

}

// generatore numero random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}