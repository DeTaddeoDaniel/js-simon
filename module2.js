
$(document).ready(function () {
startingEvent()
});


function startingEvent(){
    $("#modalModalita").modal({backdrop: 'static'});

    $('#continue').click(function (e) { 
        e.preventDefault();
        preGame()       
    });
}

async function preGame(){

    // VARIABILI DI GIOCO
    var modalita = ''

    // INPUT MODALITA DI GIOCO (CLASSICA, AVANZATA)

    var modalita = $('#modalita .active').attr('value');
    console.log(modalita)


    for (let index = 5; index >= 0 ; index--) {
        console.log('attesa numero: '+ index)
        await animazioneIniziale(index)        
    }

    // INIZIO GIOCO
    var endGame = false;
    var sequenza = [1,2,3,4];

    console.log('sequenza: '+sequenza.toString())

    while(!endGame){

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
        
        // accendi la sequenza
        await sequenzaLuci(sequenza);

        endGame = true;
    }

    // RISULTATI GIOCO ( PUNTI , RECORD, LIVELLO)


}

// sequenza luci illuminate
async function sequenzaLuci(sequenza){

    console.log('inizio luci in sequenza')

    for ( let numero of sequenza ){
        await accendiSequenza(numero)

    console.log('------------------------');
    console.log('fine luci in sequenza');

    }
}

// accendi lampadina
function accendiLampadina( numero ){

    console.log('---------------------------')
    console.log('Accendo lampadina: '+numero)

    console.log($("#btnYellow").attr('style'))

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

    console.log('Spengo lampadina: '+numero)

    if(numero == 1){
        $("#btnYellow").attr('style','fill: url(#gradient-3)')
    } else if(numero == 2){
        $("#btnBlue").attr('style','fill: url(#gradient-2)')
    } else if(numero == 4){
        $("#btnRed").attr('style','fill: url(#gradient-0)')
    } else if(numero == 3){
        $("#btnGreen").attr('style','fill: url(#gradient-1)')
    }

    setTimeout(resolve,600)

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

function animazioneIniziale(num){

    console.log('animazione iniziale: '+num)

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