var modalita = ''
var endGame = false;
var sequenza = [];
var clickUtenteInseriti = []
var punteggio = 0
var best = 0
var timerLampadina = 300;

$(document).ready(function () {

    $('#modalModalitaWindows').modal('toggle');

    // event listener personalizzato
    $('#continue').on("playGameStart", function(e , origin){
        console.log('-- Event listern origine: '+ origin +'--');
        resetGameVariables();
        preGame().then(game);
    });

    // event listener playGameStart
    $("#continue").click(function(){
        $("#continue").trigger("playGameStart", ['module start']);
    });
    
    $('#again').click(function (e) { 
        $("#continue").trigger("playGameStart", ['module end']);
    });

    // modale inziale
    $('#changeModalita').click(function (e) { 
        $('#modalModalitaWindows').modal('toggle');
    });

});

//Se cambiamo modalitÃ  o decidiamo di ricominciare, resettiamo le variabili
function resetGameVariables()
{
    endGame = false;
    sequenza = [];
    clickUtenteInseriti = []
    punteggio = 0   

}

async function preGame(){

    // INPUT MODALITA DI GIOCO (CLASSICA, AVANZATA)
    modalita = $('#modalita .active').attr('value');
    console.log(modalita)

    for (let index = 5; index >= 0 ; index--) {
        // console.log('attesa numero: '+ index)
        await animazioneIniziale(index)        
    }
}

// round function
async function game(){
        
        // aggiorna livello attuale e prev
        $('.livelloNow').text(sequenza.length+1);
        $('.livelloNext').text(sequenza.length+2);
        $('.progress-bar').attr('aria-valuenow', 0)

        // inserimento valori
        if(modalita == 'classica'){

            console.log('game modalità classica')
            const number = getRandomInt(1,4)
            sequenza.push(number)

        
        } else {
            console.log('game modalita avanzata')
            
            const livello = sequenza.length
            sequenza = []
            for (let index = 0; index < livello + 1; index++) {
                var number = getRandomInt(1,4)
                sequenza.push(number)
            }
        }

        // operazioni css primo round
        $('.progress-bar')
            .addClass('first')
            .removeClass('bg-success')
            .addClass('bg-info');

        // accendi la sequenza
        await flashText('Memorizza la sequenza');
        await sequenzaLuci(sequenza)
        await flashText('');

        
        // accendi la sequenza
        console.log('modalita: '+modalita)
        console.log('sequenza: '+sequenza.toString())
        console.log('sequenzautente: '+clickUtenteInseriti.toString())
        attivaInput()
}

// sequenza utente
async function clickInput(e){

    numeroLampadina = parseInt(e.target.getAttribute('value'))
    console.log('numero lampadina click: '+numeroLampadina)
    
    clickUtenteInseriti.push( numeroLampadina )

    // progress bar click
    var progressNumber = (clickUtenteInseriti.length / sequenza.length) * 100;
    $('.progress-bar')
        .attr('aria-valuenow', clickUtenteInseriti.length)
        .attr('aria-valuemax', sequenza.length)
        .css('width', progressNumber+'%');

    console.log('sequenza: '+sequenza.toString())
    console.log('sequenzautente: '+clickUtenteInseriti.toString())

    if(checkinputUtente()){

        console.log(
            'ancora player game'+
            checkinputUtente()+
            sequenza.length+
            clickUtenteInseriti.length)

        punteggio++
        attivaInput()

        // aggiorna valori
        $('#punteggioAttuale').text(punteggio);
        $('.progress-bar .inseriti').text(clickUtenteInseriti.length);
        $('.progress-bar .totali').text(sequenza.length);

        // rimozione css primo round con elementi non click
        $('.progress-bar')
            .removeClass('first')
            .removeClass('bg-info')
            .addClass('bg-success');      


        if(sequenza.length == clickUtenteInseriti.length){
            
            console.log('** continua a giocare **')  ;
            clickUtenteInseriti = [] ;
            
            // reset progress bar
            $('.progress-bar .inseriti').text(0);
            $('.progress-bar .totali').text(sequenza.length+1);

            await flashText('Bravo');
            rimuoviInput()
            await flashText('');
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

// controlla input utente
function checkinputUtente(){

    let num = clickUtenteInseriti.length-1

    // console.log('lungh: '+num+', sequenza: '+sequenza[num]+', click: '+clickUtenteInseriti[num])

    if(sequenza[num] == clickUtenteInseriti[num]){
        return true;
    } else {
        return false;
    }
}

// Input utente
function attivaInput(){

    console.log('attivazione input')

    $('svg path').on('click', e => { 
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

    for ( let numero of sequenza ){
        await accendiSequenza(numero)
    }
}

// accendi la sequenza di luci
 async function accendiSequenza(numero){

    console.log('accendi sequenza');
    
    await accendiLampadina( numero )
    await spegniLampadina( numero )      

}

// accendi lampadina
function accendiLampadina( numero ){

    if(numero == 1){
        $("#btnYellow").attr('style','fill: url(#gradient-3-active)')
    } else if(numero == 2){
         $("#btnBlue").attr('style','fill: url(#gradient-2-active)')
    } else if(numero == 4){
        $("#btnRed").attr('style','fill: url(#gradient-0-active)')
    } else if(numero == 3){
       $("#btnGreen").attr('style','fill: url(#gradient-1-active)')
    }

    return new Promise(resolve => setTimeout( resolve, timerLampadina ));

}

// spegni lampadina
function spegniLampadina(numero){

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

    return new Promise(resolve => setTimeout( resolve, timerLampadina ));

}

async function flashText( text ){
    $('.center-game').text( text );
    return new Promise(resolve => setTimeout( resolve, 1000 ));
}

// animazione partita
function animazioneIniziale(num){

    // console.log('animazione iniziale: '+num)

     switch(num){

        case 0:
            $('.center-game').text('');
            break;

        case 1:

            $('.center-game').text('Start');
            break;

        default:
            $('.center-game').text( num-1 );
    } 

    return new Promise( (resolve) => {
        setTimeout( resolve, 1000 );
    });

}

// generatore numero random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

function refleshProgress(e, tipologia){
    // $("svg path").trigger("refleshProgressBar", ['info']);

    // $('svg path').on("refleshProgressBar", function(e , info){
       //codice
    // });
}