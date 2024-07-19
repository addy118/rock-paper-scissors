const score = JSON.parse(localStorage.getItem('ls-score')) || {wins: 0, losses: 0, ties: 0}
let intervalId, isAutoPlaying = false

updateScore()


// when the player taps on one of the three move buttons
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  
  // result when computer chooses rock
  if (computerMove === 'rock') {
    if (playerMove === 'rock') {
      result = 'Tie'
    }
    else if (playerMove === 'paper') {
      result = 'You Win!'
    }
    else if (playerMove === 'scissor') {
      result = 'You Lose!'
    }
  }
  
  // result when computer chooses paper
  else if (computerMove === 'paper') {
    if (playerMove === 'rock') {
      result = 'You Lose!'
    }
    else if (playerMove === 'paper') {
      result = 'Tie'
    }
    else if (playerMove === 'scissor') {
      result = 'You Win!'
    }
  }
  
  // result when computer chooses scissor
  else if (computerMove === 'scissor') {
    if (playerMove === 'rock') {
      result = 'You Win!'
    }
    else if (playerMove === 'paper') {
      result = 'You Lose!'
    }
    else if (playerMove === 'scissor') {
      result = 'Tie'
    }
  }
  
  // updating the score on server side
  if (result === 'You Win!') {
    score.wins += 1;
  }
  else if (result === 'You Lose!') {
    score.losses += 1;
  }
  else if (result === 'Tie') {
    score.ties +=1;
  }
  
  localStorage.setItem('ls-score', JSON.stringify(score))
  
  // updates the score on page
  updateScore()
  
  document.querySelector('.js-result').innerHTML = `${result}`
  
  document.querySelector('.computer')
    .innerHTML = `<p>Computer</p><img src="${computerMove}-emoji.png" alt="computer" class="emoji">`
  document.querySelector('.player')
    .innerHTML = `<p>You</p><img src="${playerMove}-emoji.png" alt="player" class="emoji">`
}


function updateScore() {
  document.querySelector('.js-wins').innerHTML = score.wins;
  document.querySelector('.js-losses').innerHTML = score.losses;
  document.querySelector('.js-ties').innerHTML = score.ties;
}


// decides the move for computer
function pickComputerMove() {
  let randomNum = Math.random();
  let computerMove
  
  if (randomNum >= 0 && randomNum <= 1/3) {
    computerMove = 'rock'
  }
  else if (randomNum >= 1/3 && randomNum <= 2/3) {
    computerMove = 'paper'
  }
  else {
    computerMove = 'scissor'
  }
  
  randomNum = Math.random()
  return computerMove;
}


// deletes the current score and resets to zero
function newGame() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('ls-score');
  updateScore();
  document.querySelector('.computer')
    .innerHTML = `<p>Computer</p><img src="tleft-emoji.png" alt="computer" class="emoji">`
  document.querySelector('.player')
    .innerHTML = `<p>You</p><img src="tright-emoji.png" alt="player" class="emoji">`
  document.querySelector('.js-result').innerHTML = '&nbsp'
  
  if (isAutoPlaying) {
    isAutoPlaying = false
    document.querySelector('.auto-play').innerHTML = 'Auto Play'
    clearInterval(intervalId)
  }
  document.querySelector('.js-new-confirm').innerHTML = "&nbsp"
}


// automatically chooses the moves for player
function autoPlay() {
	let autoPlayElement = document.querySelector('.auto-play')
  const playerMove = () => playGame(pickComputerMove())
  
  if (!isAutoPlaying) {
    isAutoPlaying = true
    autoPlayElement.innerHTML = 'Stop Play'
    intervalId = setInterval(playerMove, 1000)
  } else {
    isAutoPlaying = false
	  autoPlayElement.innerHTML = 'Auto Play'
    clearInterval(intervalId)
  }
}
