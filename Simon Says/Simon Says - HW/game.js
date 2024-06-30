const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.addEventListener('keypress', () => {
    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`;
        nextSequence();
        started = true;
    }
});

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        const userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = `Level ${level}`;

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    gamePattern.forEach((color, index) => {
        setTimeout(() => {
          playSound(color);
          animatePress(color); 
        }, 1000 * index); 
      });
    }
    
  

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(color) {
    document.getElementById(color).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(color).classList.remove("pressed");
    }, 100);
}

function animateSequence(color) {
    document.getElementById(color).classList.add("sequence-highlight");
    setTimeout(() => {
        document.getElementById(color).classList.remove("sequence-highlight");
    }, 500);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 200);
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
    started = false;
    level = 0;
    gamePattern = [];
}
