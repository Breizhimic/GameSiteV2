const imagePierre = document.getElementById("pierre");
const imagePapier = document.getElementById("papier");
const imageCiseaux = document.getElementById("ciseaux");
const message = document.getElementById("message");
const rejouer = document.getElementById("rejouer");

rejouer.addEventListener( "click", function(){init();});

let choixOrdi;
const choixPossible = ["PIERRE", "PAPIER", "CISEAUX"];

function init(){
    choixOrdi = ((Math.random()*2)).toFixed(0);
    message.innerHTML= "Le choix de l'odinateur est fait, à vous de cliquez sur votre choix..."
}

init();