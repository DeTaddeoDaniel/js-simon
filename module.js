// Un alert espone 5 numeri casuali.
// Da li parte un timer di 30 secondi.
// Dopo 30 secondi l'utente deve inserire un prompt
// alla volta i numeri che ha visto precedentemente.
// Dopo che sono stati inseriti i 5 numeri, il software
// dice quanti e quali dei numeri da indovinare sono
// stati individuati

// array campo minato
var arrayNumeriEstratti = [];
var arrayNumeriInseriti = [];
var arrayNumeriCorretti = [];

var min = 1;
var max = 100;
var dimensione = 5;

// genera numeri casuali con min e max complessi
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// genera array numeri random
function generazioneNumeriRandom( dimensione){

    var numeroRipetuto = false;
    var numero = -1;

    for (let i = 0; i < dimensione; i++) {

        //genera numero casuale
        numero = getRndInteger(min,max);

        // inserisci numero array
        addNumber(arrayNumeriEstratti, numero);  

        // numero uscito
        // console.log("- Numero estratto: " + numero);
        
    }
}

// alert numeri estratti
function alertNumeriEstratti(){

    console.log("Mostra alert dei numeri estratti");

    var messaggio = " I numeri da memorizzare sono: ";

    arrayNumeriEstratti.forEach(numero => {
        messaggio = messaggio + numero + ", ";
    });

    alert(messaggio);

}

// inizia timer
function timerAttesa(millisecondi){

    console.log("Start countdown di " + millisecondi + " ms");
    setTimeout(numeriUtente, millisecondi);

}

// numeri inseriti utente
function numeriUtente(){

    console.log("----------------");
    console.log("inizio richiesta input giocatore");

    for (let i = 0; i < dimensione; i++) {
        
        // inserisci numero
         var numeroInserito = inputNumero(min , max);

         // inserisci numero del array
         addNumber(arrayNumeriInseriti, numeroInserito);

         // numeri del giocatore
         console.log("* il numero inserito è: " + arrayNumeriInseriti[i]);
        
    }

    var punteggio = checkNumeriCorretti();
    endGame(punteggio);

}

// richiedi numero utente
function inputNumero(min, max){

    var checkInput = false;
    var numero = 0;

    console.log("----------------------");

    do{

        numero = parseInt(prompt("Inserisci i numeri che ricordi uno alla volta"));

        if( numero == false ){

            /* input non valido */
            console.log("Input non valido");
            checkInput = false;

        } else{

            /* input valido*/
            console.log("Input valido");
            
            /* Valore tra min e max complessi*/
            if(numero >= min && numero <= max ){

                console.log("Numero complesso tra " + min + " e " + max + " complesso: " + numero);
                checkInput = true;

            } else{

                console.log("Numero non complesso tra 1 e 100 complesso: " + numero);
            }

        }

        console.log("-------------");

    } while( !checkInput)

    return numero;

}

// aggiungi numeri estratti
function addNumber(array, numero){

    array.push(numero);
    console.log(" - aggiunto numeri estratti: " + numero);
    
}

// controlla quanti numeri sono corretti
function checkNumeriCorretti(){

    console.log("----------------");

    var punteggio = 0;

    for (let i = 0; i < dimensione; i++) {
        
        if(arrayNumeriInseriti[i] == arrayNumeriEstratti[i]) {
            arrayNumeriCorretti[i] = arrayNumeriEstratti[i];
            console.log("Numero corretto: " + arrayNumeriCorretti[i]);
            punteggio++;
        
        } else {
            console.log("Numero non corretto: "+ arrayNumeriInseriti[i]);
        } 
    
    }

    return punteggio;
}

// messaggio punti ottenuti
function endGame(punteggio){

    console.log("----------------");

    console.log(" Hai totalizzato " + punteggio + " punti");
    var messaggio = " Ti sei ricordato: ";
    
    if(punteggio != 0){
        arrayNumeriCorretti.forEach(numero => {
            messaggio = messaggio + numero + ", ";
        });
    
    } else {
        messaggio = "Non ti sei ricordato alcun numero";
    }

    console.log(messaggio);

}

// programma
function programma(){

    console.log("Crea numeri random");
    generazioneNumeriRandom( dimensione);

    console.log("----------------");
    alertNumeriEstratti();

    console.log("----------------");
    timerAttesa(30000);

}

programma();
