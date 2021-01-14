var modalita = ''
var endGame = false;
var sequenza = [];
var clickUtenteInseriti = []
var punteggio = 0

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


    // RISULTATI GIOCO ( PUNTI , RECORD, LIVELLO)


}

// round function
async function game(){

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

        // stampa sequenza
        console.log('sequenza: '+sequenza.toString())
        console.log('sequenzautente: '+clickUtenteInseriti.toString())
        
        // accendi la sequenza
        await sequenzaLuci(sequenza)

        console.log('sequenza: '+sequenza.toString())
        console.log('sequenzautente: '+clickUtenteInseriti.toString())
        await attivaInput()
}


///////////////////////////////////////////////////////////////////////////////////////

// sequenza utente
async function clickInput(e){
    
    console.log('**********************')


    numeroLampadina = parseInt(e.target.getAttribute('value'))
    console.log('numero lampadina click: '+numeroLampadina)
    
    clickUtenteInseriti.push(numeroLampadina)
    
    console.log('click utente array: '+clickUtenteInseriti)
    console.log('sequenza: '+sequenza)

    console.log('**********************')

    if(checkinputUtente()){

        console.log('ancora player game'+checkinputUtente()+sequenza.length+clickUtenteInseriti.length)
        punteggio++

        if(sequenza.length == clickUtenteInseriti.length){
            console.log('** continua a giocare **')  
            clickUtenteInseriti = [] 
            rimuoviInput()
            game();
        }
    } else {
        rimuoviInput()
        $('.center-game').text('');
        $('#punteggio').text(punteggio);
        $('#livello').text(sequenza.length);
        $("#endGameWindows").modal({backdrop: 'static'});
    }

}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// Input utente
function attivaInput(){

    console.log('attivazione input')
    $('.center-game').text('Sequenza');

    $('svg path').click((e) => { 
        // console.log(e.target)
        clickInput(e)
    });

    // $('svg path').mouseenter( (e) => { 
    //     console.log('accendi lamp:' + $(e.target).attr('value') )
    //     StrokeAccendiLampadina($(e.target).attr('value'))
    // });

    // $('svg path').mouseout( (e) => { 
    //     console.log('spengo lamp: '+ $(e.target).attr('value'))
    //     StrokeSpegniLampadina($(e.target).attr('value'))
    // });



}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////

// sequenza luci illuminate
async function sequenzaLuci(sequenza){

    console.log('inizio luci in sequenza'+sequenza.toString())

    for ( let numero of sequenza ){
        await accendiSequenza(numero)

    // console.log('------------------------');
    // console.log('fine luci in sequenza');

    }
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
     $('.center-game').text('Memorizza');

    return new Promise( (resolve, reject) => {

             accendiLampadina(numero)
            
            setTimeout( () => {
                spegniLampadina(numero, resolve)
            }, 1000)
    })

}
///////////////////////////////////////////////////////////////////////////////////////
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

    console.log('** '+check+' **')
    return check

}

/////////////////////////////////////////////////////////////////////////////////////// 

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