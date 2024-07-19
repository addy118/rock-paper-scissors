document.body.addEventListener('keydown', (event) => {
	if (event.key === 'r') {
		playGame('rock')
	} else if (event.key === 'p') {
		playGame('paper')
	} else if (event.key === 's') {
		playGame('scissor')
	} else if (event.key === 'n') {
		confirmNewGame()
	} else if (event.key === 'a') {
		autoPlay()
	}
})

document.querySelector('.js-rock')
	.addEventListener('click', () => playGame('rock'))
document.querySelector('.js-paper')
	.addEventListener('click', () => playGame('paper'))
document.querySelector('.js-scissor')
	.addEventListener('click', () => playGame('scissor'))
document.querySelector('.js-new')
	.addEventListener('click', () => confirmNewGame())
document.querySelector('.js-auto')
	.addEventListener('click', () => autoPlay())

const confirmNewGame = () => {
	document.querySelector('.js-new-confirm')
		.innerHTML = `
				<div class="confirmation-box">
				  <p>Are you sure you want to reset the score?</p>
				  
				  <div class="confirmation-buttons">
				    <button class="confirm js-yes">Yes</button>
				    <button class="confirm js-no">No</button>
		      </div>
				</div>
			`
	document.querySelector('.js-yes')
		.addEventListener('click', () => newGame())
	document.querySelector('.js-no')
		.addEventListener('click', () => document.querySelector('.js-new-confirm').innerHTML = "&nbsp")
	
	document.body.addEventListener('keydown', (event) => {
		if (event.key === '1') {
			newGame()
		} else if (event.key === '0') {
			document.querySelector('.js-new-confirm').innerHTML = "&nbsp"
		}
	})
}
