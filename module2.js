
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
    var sequenza = [1,2,3];

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
        
        return await sequenzaLuci()

        endGame = true;
    }

    // RISULTATI GIOCO ( PUNTI , RECORD, LIVELLO)


}

// sequenza luci illuminate
async function sequenzaLuci(){
    
    console.log('inizio luci in sequenza')

    for ( let numero of sequenza ){
        // await accendiSequenza(numero)
    };

    console.log('------------------------');
    console.log('fine luci in sequenza');

    // attivaInput()
    
    return true;
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