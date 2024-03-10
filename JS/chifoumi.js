const imagePierre = document.getElementById("pierre");
const imagePapier = document.getElementById("papier");
const imageCiseaux = document.getElementById("ciseaux");
const message = document.getElementById("message")
const rejouer = document.getElementById("rejouer")

rejouer.addEventListener( "click", function(){init();})

let choixOrdi
const choixPossible = ["PIERRE", "PAPIER", "CISEAUX"]

function init(){
    ///Ajout des évenements
    imagePierre.addEventListener("click", clickPierre);
    imagePapier.addEventListener("click", clickPapier);
    imageCiseaux.addEventListener("click", clickCiseaux);

    ///Retour des bordures transparentes 
    imagePierre.style.borderColor="rgba(0,0,0,0)";
    imagePapier.style.borderColor="rgba(0,0,0,0)";
    imageCiseaux.style.borderColor="rgba(0,0,0,0)";

    choixOrdi = ((Math.random()*2)).toFixed(0);
    message.innerHTML = "Le choix de l'odinateur est fait, à vous de cliquez sur votre choix...";
}
    ///Affiche le choix
function clickPierre(){
    imagePierre.style.borderColor="red";
    verification(0);
}

function clickPapier(){
    imagePapier.style.borderColor="red";
    verification(1);
}

function clickCiseaux(){
    imageCiseaux.style.borderColor="red";
    verification(2);
}

function verification(choixJoueur){
    ///Qui est le gagnant ?
    let gagnant;
    if(choixJoueur == choixOrdi){
        gagnant = "Match nul"
    } else if (choixJoueur == 0 && choixOrdi == 2){
        gagnant = "Vous avez gagné ! La pierre à casser les ciseaux !"
    } else if (choixJoueur == 1 && choixOrdi == 0){
        gagnant = "Vous avez gagné ! Le papier à recouvert la  pierre !"
    } else if (choixJoueur == 2 && choixOrdi == 1){
        gagnant = "Vous avez gagné ! Les ciseaux ont coupé le papier !"
    } else {
        gagnant = "L'ordinateur a gagné !"
    }

    ///Affiche le message
    message.innerHTML="Le choix de l'ordinateur est " + choixPossible[choixOrdi] + "<br>"+ gagnant;

    ///Supression des événements
    imagePierre.removeEventListener("click", clickPierre);
    imagePapier.removeEventListener("click", clickPapier);
    imageCiseaux.removeEventListener("click", clickCiseaux);
}

init()