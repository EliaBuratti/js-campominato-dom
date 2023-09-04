/* Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Consigli del giorno: :party_wizard:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
pensiamo a queli strumenti ci servono, ad esempio: Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Eventuali validazioni e i controlli possiamo farli anche in un secondo momento.
*/

const startGame = document.querySelector('.start-game button');
const difficultSelect = document.querySelector('#difficult');
const startMarkup = document.querySelector('section.start-game');
const gridFieldSection = document.querySelector('section.grid-field');
const gameMission = 'Clicca su una casella'

//variabili che determinano la difficltà, se cambio il numero modifico anche la difficoltà. si consiglia per una griglia quadrata di uilizzare numeri multipli per se stessi es: 7 x 7 = 49 
const easyGrid = 100;
const mediumGrid = 81;
const hardGrid = 49;

//decido quante bombe mettere
const bombNum = 16;
const loserNumber = [];
let userClickNum = [];


//variabili che utilizzo per tracciare e verificare se l'utente non clicca su una bomba


//al click del pulsante
startGame.addEventListener('click', function(){

    //ottengo la difficolta
    switch (difficultSelect.value) {
        case 'easy':
            gridTarghet = easyGrid;
            gridTemplate = Math.floor(Math.sqrt(easyGrid));
            break;
        
        case 'medium':
            gridTarghet = mediumGrid;
            gridTemplate = Math.floor(Math.sqrt(mediumGrid));
            break;

        case 'hard':
            gridTarghet = hardGrid;
            gridTemplate = Math.floor(Math.sqrt(hardGrid));
            break;

    };

    
    
    //rimuovo markup iniziale
    removeMarkup(startMarkup);
    
    //genero un nuovo markup con il titolo del gioco
    gridFieldSection.innerHTML = `<h1 class="w-100 mb-4" >${gameMission}</h1>`; // 'Clicca su una casella'
    
    //genero numeri bomba e resto in attesa
    //loserNumber.push(cardBomb(gridTarghet, bombNum));
    cardBomb(gridTarghet, bombNum);
    console.log(loserNumber.length);
    
    //uso una funzione per creare delle card cliccabili
    genCardEvent(gridFieldSection, gridTarghet, gridTemplate); 
    
    
    
});



//funzione per rimuovere il markup interno ad una selezione
function removeMarkup (markup) {

    markup.innerHTML = '';
};

// funzione per generare le card con un eventlistener con input: dove(domElement) e quante card da creare numero (targhet)
function genCardEvent (domElement, targhet, gridColumn) {

    for (let i = 0; i < targhet; i++) {

        //genero la card
        const genElement = document.createElement('div');
        genElement.className = 'eb_card';
        genElement.append(i + 1);
        domElement.append(genElement);
        genElement.style.width = `calc(100% / ${gridColumn})`;
        //console.log(genElement);

        //genero eventlistener per ogni card creata
        genElement.addEventListener('click', function(){

            this.classList.toggle('eb_active');//attiva o disattiva classe

            // se la card non è stata cliccata, aggiungila all'array
           if (!userClickNum.includes(i + 1)) {

                //pusho il tasto cliccato nell'array
                userClickNum.push(i + 1);

                //verifico il numero se è una bomba
                if (checkClick(userClickNum, loserNumber, this)) {
                    
                    //aggiungo la classe rossa
                    this.classList.add('eb_game-over');
                    
                    //comunico il punteggio e blocco i click 
                    gridFieldSection.innerHTML += `<h1 class="w-100 mb-4" >Game over!  Hai totalizzato ${userClickNum.length} punti</h1>`;

                }              
            };

            //stampo in console la card cliccata
            console.log('Hai cliccato nella casella', i + 1);

            
        
        }); 
        
    };


};

//funzione per creare numeri bomba

function cardBomb (NumCard, bombNum){

    for (let i = 0; i < bombNum; i++) {

        bomb = Math.floor(Math.random() * NumCard + 1);
        
        //creo un ciclo affinchè i numeri generati siano tutti diversi
        if (loserNumber.includes(bomb)) {
            i--;
        } else {
            loserNumber.push(bomb);
        };

    };
    
    console.log('numeri generati dalla funzione ' + loserNumber);
    return;
    
};

function checkClick (userClick, loser) {

    
    for (let i = 0; i < loser.length; i++) {

        if (loser.includes(userClick[i])){

            return true;

        } else {
            console.log('sono diversi');
        }
    }
    console.log(loser.length);

    return;
}

