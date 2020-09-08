const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.game-area'),
  car = document.createElement('div');

car.classList.add('car')

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
}

const setting = {
  start: false,
  score: 0,
  speed: 3
}

function startGame() {
  start.classList.add('hide')
  setting.start === true
  gameArea.appendChild(car)
  requestAnimationFrame(playGame)

}

function playGame() {
  console.log(123);
  if (setting.start) {
    requestAnimationFrame(playGame)
  }

}

playGame()

function startRun(e) {

  e.preventDefault()
  keys[event.key] = true

}

function stopRun(e) {

  e.preventDefault()
  keys[event.key] = false

}


document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stopRun)
start.addEventListener('click', startGame)