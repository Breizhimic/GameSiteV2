// Initialisation du joueur actuel
let currentPlayer = 'X';

// Initialisation du tableau représentant l'état du plateau de jeu
let board = ['', '', '', '', '', '', '', '', ''];


//Fonction appelée lorsqu'une cellule de la grille est cliquée
function cellClicked(index) {
    // Vérifie si la cellule cliquée est vide
    if (board[index] === '') {
        // Met à jour le contenu de la cellule cliquée avec le symbole du joueur actuel (X ou O)
        document.getElementById('board').children[index].innerText = currentPlayer;
        // Met à jour le tableau pour refléter le symbole placé dans la cellule cliquée
        board[index] = currentPlayer;
        // Vérifie s'il y a un gagnant
        if (checkWinner()) {
            // Affiche le message indiquant que le joueur actuel a gagné
            document.getElementById('result').innerHTML='Player ' + currentPlayer + ' wins!';
        } else if (board.every(cell => cell !== '')) {
            // Si toutes les cellules sont remplies et qu'il n'y a pas de gagnant, affiche "match nul"
            document.getElementById('result').innerHTML="It's a draw!";
        } else {
            // Passe au joueur suivant si aucun gagnant n'est trouvé et que le match n'est pas nul
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

//Fonction qui vérifie s'il y a un gagnant
function checkWinner() {
    // Conditions de victoire possibles
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    // Vérifie chaque condition de victoire
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        // Si les cellules a, b et c ont le même symbole (X ou O), il y a un gagnant
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    // Aucun gagnant trouvé
    return false;
}

//Fonction qui réinitialise le plateau de jeu et le résultat
function resetBoard() {
    // Réinitialise le tableau représentant l'état du plateau de jeu
    board = ['', '', '', '', '', '', '', '', ''];
    // Réinitialise le joueur actuel
    currentPlayer = 'X';
    // Efface le contenu de toutes les cellules du plateau de jeu
    for (let i = 0; i < 9; i++) {
        document.getElementById('board').children[i].innerText = '';
        // Efface le résultat
        document.getElementById('result').innerHTML='';
    }
}