const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.game-area'),
  car = document.createElement('div');

car.classList.add('car')

const keys = {
  w: false,
  s: false,
  d: false,
  a: false,
}

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 4
}

function getQuantityElements(heightElem) {
  return Math.floor(document.documentElement.clientHeight / heightElem + 1)
}

function startGame() {
  start.classList.add('hide')

  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div')
    line.classList.add('line')
    line.style.top = (i * 90) + 'px'
    line.y = i * 100
    gameArea.appendChild(line)
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div')
    enemy.classList.add('enemy')
    enemy.y = -100 + setting.traffic * (i + 1)
    enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px'
    enemy.style.top = enemy.y + 'px'
    enemy.style.background = 'transparent url("image/enemy2.png") center/cover no-repeat'
    gameArea.appendChild(enemy)
  }

  setting.start = true
  gameArea.appendChild(car)
  setting.x = car.offsetLeft
  setting.y = car.offsetTop
  requestAnimationFrame(playGame)

}

function moveRoad() {
  let lines = document.querySelectorAll('.line')
  lines.forEach(line => {
    line.y += setting.speed
    line.style.top = line.y + 'px'

    if (line.y > gameArea.offsetHeight) {
      line.y = -100
    }
  })
}

function moveEnemy() {
  let enemies = document.querySelectorAll('.enemy')
  enemies.forEach(item => {
    item.y += setting.speed / 2
    item.style.top = item.y + 'px'
    

    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic
      item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px'
    }
  })
}

function playGame() {
  if (setting.start) {
    moveRoad()
    moveEnemy()
    if (keys.a && setting.x > 0) {
      setting.x -= setting.speed
    }
    if (keys.d && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed
    }
    if (keys.w && setting.y > 0) {
      setting.y -= setting.speed
    }
    if (keys.s && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed
    }
    car.style.left = setting.x + 'px'
    car.style.top = setting.y + 'px'
    requestAnimationFrame(playGame)
  }

}


function startRun(e) {

  e.preventDefault()
  keys[e.key] = true

}

function stopRun(e) {

  e.preventDefault()
  keys[e.key] = false
}


document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stopRun)
start.addEventListener('click', startGame)

playGame()