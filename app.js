//element selection
const dice1 = document.querySelector('.dice-1');
const dice2 = document.querySelector('.dice-2');
const psum = document.querySelector('.dice-sum');
const btnRoll = document.querySelector('.btn-roll');
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');
const btnReset = document.querySelector('.btn-reset');
const totalScoreText = document.querySelector('.total-score');
const messageBox = document.querySelector('.message-box');

let knockoutNumber = null; // knockout-num
let totalScore = 0;

// display the selected knockout number
let numbers = "";

//Choose a knockout-number
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Sätt spelarens knockout-siffra
        knockoutNumber = parseInt(e.target.value, 10);
        screen.innerHTML = `You chose nr: ${knockoutNumber}`;

    });
});

// Roll dice button
btnRoll.addEventListener('click', () => {
    if (!knockoutNumber) {
        messageBox.innerText = "Please choose a Knockout number before rolling!";
        return;
    }
    else {
        messageBox.innerText = ""; // text disappears
    }

    btnRoll.disabled = true;

    //add animation + placement imp
    if (!dice1.classList.contains('animation'))
        dice1.classList.add('animation');
    if (!dice2.classList.contains('animation'))
        dice2.classList.add('animation');

    //to delay the roll
    setTimeout(() => {

        let d1 = GetRandomDice();
        let d2 = GetRandomDice();

        dice1.src = `img/dice-${d1}.png`;   //img/dice-4.png
        dice2.src = `img/dice-${d2}.png`;

        //Calculate the sum
        let sum = d1 + d2;
        psum.innerText = sum;

        // Kontroll Knockout-rules
        if (sum === knockoutNumber) {
            messageBox.innerText = `Game over! You hit your Knockout number (${knockoutNumber}). Click "Reset the Game" to play again.`;
        } else {

            // uppdate the total poäng
            totalScore += sum;
            totalScoreText.innerText = `Total score: ${totalScore}`;
        }

        //remove the animation
        if (dice1.classList.contains('animation'))
            dice1.classList.remove('animation');
        if (dice2.classList.contains('animation'))
            dice2.classList.remove('animation');

        if (sum !== knockoutNumber) {
            btnRoll.disabled = false;
        }
    }, 1000);

});

// Reset the game
btnReset.addEventListener('click', resetGame);

function resetGame() {
    totalScore = 0;
    psum.innerText = "Sum: 0";
    totalScoreText.innerText = "Total score: 0";
    dice1.src = "img/dice-1.png";
    dice2.src = "img/dice-1.png";
    screen.innerHTML = "?";
    knockoutNumber = null;
    messageBox.innerText = ""; // delete the message
    btnRoll.disabled = false; // Activate the btn
}

//generate random dices//

function GetRandomDice() {
    return Math.ceil(Math.random() * 6); // 1-6 //
}


