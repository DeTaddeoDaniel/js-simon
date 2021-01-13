var btn_red = document.getElementById("red")
var btn_green = document.getElementById("green")
var btn_yellow = document.getElementById("yellow")
var btn_blue = document.getElementById("blue")

var punti = document.getElementById("punteggio")

var sequenza = []
var clickUtenteInseriti = []

// accendi lampadina
function accendiLampadina( numero ){

    console.log('---------------------------')
    console.log('Accendo lampadina: '+numero)

    if(numero == 1){
        btn_yellow.classList.add('active')
    } else if(numero == 2){
        btn_blue.classList.add('active')
    } else if(numero == 4){
        btn_red.classList.add('active')
    } else if(numero == 3){
        btn_green.classList.add('active')
    }

}

// spegni lampadina
function spegniLampadina(numero,resolve){

    console.log('Spengo lampadina: '+numero)

    if(numero == 1){
        btn_yellow.classList.remove('active')
    } else if(numero == 2){
        btn_blue.classList.remove('active')
    } else if(numero == 4){
        btn_red.classList.remove('active')
    } else if(numero == 3){
        btn_green.classList.remove('active')
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

// sequenza luci illuminate
async function sequenzaLuci(){
    
    console.log('inizio luci in sequenza')

    for ( let numero of sequenza ){
        await accendiSequenza(numero)
    };

    console.log('------------------------');
    console.log('fine luci in sequenza');

    attivaInput()
    
    return true;
}

// generatore numero random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

// aggiunge un elemento alla sequenza
async function allungaSequenza(){

    var number = getRandomInt(1,4)
    var sequenza = []

    console.log('allunga sequenza')       
    
    sequenza.push(number)
    console.log('sequenza: '+sequenza)

     clickUtenteInseriti = []
    
    return await sequenzaLuci()

}

// Attivazioni input
function disativaInput(){

    console.log('--- disattiva input ---')

    document.getElementById("green").removeEventListener("click", clickInput,false);
    document.getElementById("red").removeEventListener("click", clickInput,false);
    document.getElementById("yellow").removeEventListener("click", clickInput,false);
    document.getElementById("blue").removeEventListener("click", clickInput,false);

    document.getElementById("blue").classList.remove('mouse');  
    document.getElementById("red").classList.remove('mouse'); 
    document.getElementById("yellow").classList.remove('mouse'); 
    document.getElementById("green").classList.remove('mouse');

    document.getElementById("blue").classList.remove('active');  
    document.getElementById("red").classList.remove('active'); 
    document.getElementById("yellow").classList.remove('active'); 
    document.getElementById("green").classList.remove('active');  
}

// Input utente
function attivaInput(){

    console.log('attivazione input')

    document.getElementById("green").addEventListener("click", clickInput,false);  
    document.getElementById("red").addEventListener("click", clickInput,false);  
    document.getElementById("yellow").addEventListener("click", clickInput,false);  
    document.getElementById("blue").addEventListener("click", clickInput,false);

    document.getElementById("blue").classList.add('mouse');  
    document.getElementById("red").classList.add('mouse'); 
    document.getElementById("yellow").classList.add('mouse'); 
    document.getElementById("green").classList.add('mouse'); 
}

// sequenza utente
async function clickInput(e){
    
    console.log('**********************')

    numeroLampadina = parseInt(e.target.getAttribute('value'))
    console.log('numero lampadina click: '+numeroLampadina)
    
    clickUtenteInseriti.push(numeroLampadina)
    
    console.log('click utente array: '+clickUtenteInseriti)
    console.log('sequenza: '+sequenza)

    console.log('**********************')

    if(clickUtenteInseriti.length ==  sequenza.length){
        disativaInput()
        checkinputUtente()
    }
}

// controlla input utente
async function checkinputUtente(){

    let check = true;
    let i=0;

     console.log('checkinputUtente')


        for( i=0; i<sequenza.length && check; i++){

            console.log(sequenza)
            console.log(clickUtenteInseriti)


            if(sequenza[i] === clickUtenteInseriti[i]){
                console.log('** ramo true **')
                check = true;
            } else {
                console.log('** ramo false **')
                check = false;
            }
        }  

    if(check){
        console.log('** continua a giocare **')
        punti.textContent = sequenza.length
        await allungaSequenza()                
    } else {
        console.log('hai perso')
        alert('hai perso'+sequenza+'-'+clickUtenteInseriti)
    }    
}

allungaSequenza()