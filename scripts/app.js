//   STEPS TO COMPLETE GAME:
// - Make grid for the board: 10x10 (referencing mike's code), and enable the charachter across the board (referencing mike's code). DONE!
// - Make it start on the bottom row in the middle on load. DONE!
// - Win condition is getting a charachter to one home cell. DONE!
// - Make a simple obstacles that doesnt move. DONE!
// - Deal with collision - Use if statements with === to figure out whether two things are in the same cell? DONE!
// - Add different events for whether you charachter is "riding" on the element, or beeing "killed" by the element? DONE!
// - Make two logs and make them move. DONE!
// - Make the player jump. DONE!
// - Start game button that makes everything start moving. DONE!
// - Reset button resetting the game. DONE!
// - Move logs. DONE!
// - Attach player to the logs. DONE!
// - Timer and display counter. DONE!
// - Set up so that if the player rides to the end of the board on the log you lose. DONE!
// - Set up the water cells properly. DONE!

//   WEDNESDAY:  
// - Something is screwed up with how to jump off the log - can't clear the interval properly.
// - Stop the timer when win and loose. 
// - Display final time on winning screen, and rank the best three.
// - Styling (+ sounds and animations).

//   WEDNESDAY/THURSDAY:
// - Auto generated scoreboard adding points as the charachter makes its way through the board.
// - Add higher difficulty level with more obstacles (moving at different paces and randomly changed (ie croc), 
//     and more charachters to move across the board to win (from one to three to five).
// - Add food items it can eat on the way to add extra points.
// - Refactor my code.

document.addEventListener('DOMContentLoaded', () => {

  const width = 11
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.start')
  const resetButton = document.querySelector('.reset')
  const win = document.querySelector('.win')
  const lose = document.querySelector('.lose')
  const screen = document.querySelector('.screen')

  const cells = []
  let playerIdx = 115
  
  let homeArray = [0, 3, 6, 9]
  let carArray = [73, 80, 89, 93, 97]
  let logArray = [12, 13, 14, 15, 35, 36, 37, 28, 29, 30, 31]
  let wallArray = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65]
  let streetArray = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 
    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 
    92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 
    106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]

  let isOnLog = false

  // SETTING UP THE BOARD:
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')

    grid.appendChild(cell)
    cells.push(cell)
  }

  cells[playerIdx].classList.add('player')

  homeArray.forEach(house => {
    cells[house].classList.add('home')
  })
  carArray.forEach(car => {
    cells[car].classList.add('car')
  })
  logArray.forEach(log => {
    cells[log].classList.add('log')
  })
  wallArray.forEach(brick => {
    cells[brick].classList.add('wall')
  })
  streetArray.forEach(pebble => {
    cells[pebble].classList.add('street')
  })

  win.classList.add('hide')
  lose.classList.add('hide')


  // KEYSTROKE MOVEMENTS FOR THE PLAYER:
  document.addEventListener('keyup', (e) => {

    cells[playerIdx].classList.remove('player')
    const x = playerIdx % width
    const y = Math.floor(playerIdx / width)

    switch (e.keyCode) {
      case 37: if (x > 0) playerIdx -= 1
        break
      case 38: if (y > 0) playerIdx -= width
        break
      case 39: if (x < width - 1) playerIdx += 1
        break
      case 40: if (y < width - 1) playerIdx += width
        break

        // ALLOWING THE PLAYER TO JUMP:
      case 32: if (y > 0) playerIdx -= width * 2
        break 
    } 
    cells[playerIdx].classList.add('player')

    // CHECKING CONDITIOND AT EACH PLAYER MOVE:
    winCondition(playerIdx, homeArray)
    checkIfInWater()
    checkLog()
  })

  function checkLog() {
    if (cells[playerIdx].classList.contains('log')) {
      isOnLog = true
    } else {
      isOnLog = false
    }
  }

  function checkIfInWater() {
    if (cells[playerIdx].classList.contains('log')) {
      console.log('Riding')
    } else if (playerIdx > 0 && playerIdx < 55) {
      setTimeout(() => {
        grid.classList.add('hide')
      }, 200)
      setTimeout(() => {
        lose.classList.replace('hide', 'lose')
      }, 400)
    }
  }

  // START THE GAME:
  startButton.addEventListener('click', () => {

    // CAR MOVEMENT:
    function moveCars() {
      cells.forEach(cell => cell.classList.remove('car'))
      carArray.forEach((car) => {
        cells[car].classList.add('car')
      })
      carArray = carArray.map((car) => {
        if (car % width === 0) return car + width - 1
        return car - 1
      })
      function checkCollision() {
        if (cells[playerIdx].classList.contains('car')) {
          setTimeout(() => {
            grid.classList.add('hide')
          }, 200)
          setTimeout(() => {
            lose.classList.replace('hide', 'lose')
          }, 400)
        }  
      } 
      setInterval(checkCollision, 60)
    }
    moveCars()
    const carTimer = setInterval(moveCars, 1000)

    // LOG MOVEMENT
    function moveLogs() {
      checkLog()
      cells.forEach(cell => cell.classList.remove('log'))
      logArray.forEach((log) => {
        cells[log].classList.add('log')
      })
      logArray = logArray.map((log) => {
        if (log % width === 0) return log + width - 1
        return log - 1
      })
      if (isOnLog) {
        clearInterval(moveLogs)
        cells[playerIdx].classList.remove('player')
        playerIdx--
        cells[playerIdx].classList.add('player')
      }
      if (isOnLog && playerIdx % width === 0) {
        setTimeout(() => {
          grid.classList.add('hide')
        }, 200)
        setTimeout(() => {
          lose.classList.replace('hide', 'lose')
        }, 400)
      }
    }
    moveLogs()
    const logTimer = setInterval(moveLogs, 1000)
    timerThing()
  })

  // // WIN CONDITION:
  function winCondition() {
    if (cells[playerIdx].classList.contains('home')) {
      // clearInterval(timerThing)  
      setTimeout(() => {
        grid.classList.add('hide')
      }, 200)
      setTimeout(() => {
        win.classList.replace('hide', 'win')
      }, 400)
    }
  } 

  // TIMER:
  let milliseconds = 0
  function timerThing() {
    setInterval(() => {
      milliseconds++
      const date = new Date(null)
      date.setSeconds(milliseconds)
      const timeString = date.toISOString().substr(11, 8)
      screen.innerHTML = timeString
    }, 17)
  }

  // RESET BUTTON:
  resetButton.addEventListener('click', () => {
    location.reload(1)
  })

})


