// Game word list
let wordList = ['sonic', 'tails', 'emeralds', 'robotnik', 'eggman', 'zone', 'act',
    'rings', 'shield', 'mobius', 'amy', 'shadow', 'knuckles', 'silver', 'rouge'
];

// Game counters
let wins = 0;
let losses = 0;
let guessesRemaining = 9;

// Other global variables
let wordToGuess = '';
let lettersInWord = []; // Empty array to hold the letters in word
let numOfBlanks = []; // Empty array that has the number of blanks
let underscores = document.getElementById('underscores'); // Grabbing underscores id and setting to variable
let underScores = []; // Array that holds the undescores
let guessesremaining = document.getElementById('guesses-remaining'); // Grabbing guesses-remaining id and setting to variable
let wrongguesses = document.getElementById('wrong-guesses'); // Grabbing wrong-guesses id and setting to variable
let wrongGuesses = []; // Array for holding wrong guesses


// Functions to dynamically create keys
keyConfig = (letter, keyboardRow) => {
    let key = document.createElement('button');
    let keyLetter = document.createElement('p');
    key.className = 'key';
    keyLetter.className = 'key-letter';
    document.getElementById(keyboardRow).appendChild(key);
    key.appendChild(keyLetter).textContent = letter;
    key.addEventListener('click', () => {
        let lettersGuessed = key.textContent.toLowerCase();
        checkLetters(lettersGuessed);
        roundOver();
    })
}

createKeys = () => {
    // Alphabet array
    let alphabet = 
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
    
    alphabet.slice(0, 10).forEach((letter) => {
        keyConfig(letter, 'first-row');
    })

    alphabet.slice(10, 19).forEach((letter) => {
        keyConfig(letter, 'second-row');
    })

    alphabet.slice(19, 26).forEach((letter) => {
        keyConfig(letter, 'third-row');
    })
}

// Function for starting the game
startGame = () => {
    // Determines which word will be randomly guessed from the word list array
    let random = Math.floor(Math.random() * wordList.length);
    wordToGuess = wordList[random];

    lettersInWord = wordToGuess.split('');
    numOfBlanks = lettersInWord.length;

    guessesRemaining = 10;
    wrongGuesses = [];
    underScores = [];

    for (let l = 0; l < wordToGuess.length; l++) {
        underScores.push("_");
    }

    underscores.textContent = underScores.join(' ');
    guessesremaining.textContent = guessesRemaining;
    document.getElementById('wins').textContent = wins;
}

// Function for checking the letters
checkLetters = (letter) => {
    let correctLetter = false;

    for (let l = 0; l < numOfBlanks; l++) {
        if (wordToGuess[l] === letter) {
            correctLetter = true;
        }
    }

    if (correctLetter) {
        for (let j = 0; j < numOfBlanks; j++) {
            if (wordToGuess[j] === letter) {
                underScores[j] = letter;
            }
        }
    } 
    
    else if (!correctLetter && wrongGuesses.includes(letter)) {
        return;
    } 
    
    else {
        wrongGuesses.push(letter);
        guessesRemaining--
    }
}

// Function for selecting a letter with the keyboard
keyUp = () => {
    document.onkeyup = (event) => {
        let lettersGuessed = event.key;
        
        if (event.key >= 65 && event.key <= 90) {
            lettersGuessed = event.key;
            checkLetters(lettersGuessed);
        } 
        
        roundOver();
    };
}

// Functions for handling the end of the round
handleResult = (resultMessage) => {
    let modal = document.getElementById('modal');

    modal.style.display = 'block';
    document.getElementById('modal-text').textContent = resultMessage;
    document.onkeyup = null; // Prevents keys from being pressed after round is over
    playAgain();
}

roundOver = () => {
    let winMessage = 'Way past cool!  You guessed ' + wordToGuess.toUpperCase() + ' correctly!  Go again?';
    let loseMessage = 'Not cool! You\'re\ out of guesses!  The word was ' + wordToGuess.toUpperCase() + '.  Try again?';
    let resultImageWin = document.getElementById('modal-image-win');
    let resultImageLose = document.getElementById('modal-image-lose');
    
    guessesremaining.textContent = guessesRemaining;
    underscores.textContent = underScores.join(' ');
    wrongguesses.textContent = wrongGuesses.join(' ');
    
    // If the users wins...
    if (lettersInWord.toString() == underScores.toString()) {
        wins++;
        document.getElementById('wins').textContent = wins;
        handleResult(winMessage);
        resultImageLose.style.display = 'none';
        resultImageWin.style.display = 'block';
    }
    
    // If the user loses...
    else if (guessesRemaining == 0) {
        losses++;
        document.getElementById('losses').textContent = losses;
        handleResult(loseMessage);
        resultImageWin.style.display = 'none';
        resultImageLose.style.display = 'block';
    }
}

// Function for moving to next round
playAgain = () => {
    let yes = document.getElementById('yes');
    let no = document.getElementById('no');

    selectYes = yes.addEventListener('click', () => {
        modal.style.display = 'none';
        startGame();
        wrongguesses.textContent = ''
        keyUp();
    })

    selectNo = no.addEventListener('click', () => {
        modal.style.display = 'none';
        document.onkeyup = null; // Prevents keys from being pressed after selecting no
        document.getElementById('keys').style.display = 'none';
    })
}

// Function calls
createKeys();
startGame();
keyUp();