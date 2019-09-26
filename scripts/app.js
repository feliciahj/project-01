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
// - Something is screwed up with how to jump off the log - can't clear the interval properly, and the timer doesn't reset. DONE!
// - Cannot clear the timer interval for when in the water. DONE!
// - Display and remove Yoda at random? DONE!
// - Display Boba Fett at random? DONE!
// - Displaying win AND lose on win. FIX! DONE!
// - Add points for hitting Yoda. DONE!
// - Add kill condition for hitting Boba. DONE!
// - Auto-generated Yoda score. DONE!

//   TO DO:
// - Styling, animation, sounds

document.addEventListener('DOMContentLoaded', () => {

  const width = 11
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.start')
  const resetButton = document.querySelector('.reset')
  const win = document.querySelector('.win')
  const lose = document.querySelector('.lose')
  const screen = document.querySelector('.timer')
  const scoreBoard = document.querySelector('.scoreboard')
  const currentScore = document.querySelector('#amount')
  const logo = document.querySelector('.intro')
  const header = document.querySelector('header')
  const wrapper = document.querySelector('.wrapper')
  
  const cells = []
  let playing = false
  let playerIdx = 115
  let scoreCounter = 0

  const audioStart = new Audio('sounds/force.mp3')
  const audioWin = new Audio('sounds/awesome.mp3')
  const audioLose = new Audio('sounds/stupid.wav')
  const audioLlama = new Audio('sounds/alpaca_mating.wav')
  
  let homeArray = [0, 2, 4, 6, 8, 10]
  let carArray = [76, 80, 93]
  let trooperArray = [73, 89, 97]
  let logArray = [12, 13, 14, 15, 35, 36, 37, 28, 29, 30, 31]
  let wallArray = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65]
  let streetArray = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 
    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 
    92, 93, 94, 95, 96, 97, 98]
  let hellArray = [99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 
    109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
  let skyArray = [1, 3, 5, 7, 9]

  let isOnLog = false
  let timer = null

 
  header.addEventListener('mouseover', e => {
    logo.classList.add('animated')
    logo.classList.add('flip')
  })

  header.addEventListener('mouseout', e => {
    logo.classList.remove('animated')
    logo.classList.remove('flip')
  })

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
  trooperArray.forEach(trooper => {
    cells[trooper].classList.add('trooper')
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
  hellArray.forEach(fire => {
    cells[fire].classList.add('hell')
  })
  skyArray.forEach(cloud => {
    cells[cloud].classList.add('sky')
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
      case 32: {
        e.preventDefault()
        if (y > 0) playerIdx -= width * 2
      }
        break 
    } 
    cells[playerIdx].classList.add('player')

    // CHECKING CONDITIONS AT EACH PLAYER MOVE:
    winCondition(playerIdx, homeArray)
    checkIfInWater()
    updateScore()
    bobaCheck()
  })

  // TIMER:
  let milliseconds = 0
  function timerThing() {
    timer = setInterval(() => {
      milliseconds++
      const date = new Date(null)
      date.setSeconds(milliseconds)
      const timeString = date.toISOString().substr(11, 8)
      screen.innerHTML = timeString
    }, 17)
  }

  // SCORE:
  function updateScore() {
    if (cells[playerIdx].classList.contains('yoda')) {
      audioLlama.play()
      scoreCounter += 10
      currentScore.innerHTML = `${scoreCounter} points`
    }
  }

  // CHECKING FOR BOBA:
  function bobaCheck() {
    if (cells[playerIdx].classList.contains('boba')) {
      audioLose.play()
      clearInterval(timer) 
      playing = false  
      setTimeout(() => {
        grid.classList.add('hide')
      }, 200)
      setTimeout(() => {
        lose.classList.replace('hide', 'lose')
      }, 400)
    }
  }

  // CONDITION FOR PLAYER ON LOG:
  function checkLog() {
    if (cells[playerIdx].classList.contains('log')) {
      isOnLog = true
    } else {
      isOnLog = false
    }
  }

  // DROWN CONDITION
  function checkIfInWater() {
    if (cells[playerIdx].classList.contains('log')) {
      console.log('riding')
    } else if (cells[playerIdx].classList.contains('home')) {
      console.log('Win')
    } else if (playerIdx <= 55) {
      audioLose.play()
      clearInterval(timer) 
      playing = false  
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
    audioStart.play()

    resetButton.classList.remove('hide')
    grid.classList.remove('hide')
    screen.classList.remove('hide')
    scoreBoard.classList.remove('hide')
    wrapper.classList.add('hide')

    if (playing) return
    playing = true

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
          audioLose.play()
          clearInterval(timer)  
          playing = false 
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

    // TROOPER MOVEMENT:
    function moveTrooper() {
      cells.forEach(cell => cell.classList.remove('trooper'))
      trooperArray.forEach((trooper) => {
        cells[trooper].classList.add('trooper')
      })
      trooperArray = trooperArray.map((trooper) => {
        if (trooper % width === 0) return trooper + width - 1
        return trooper - 1
      })
      function checkCollision() {
        if (cells[playerIdx].classList.contains('trooper')) {
          audioLose.play()
          clearInterval(timer)  
          playing = false 
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
    moveTrooper()
    const trooperTimer = setInterval(moveTrooper, 1000)

    // LOG MOVEMENT
    function moveLogs() {
      checkLog()
      cells.forEach(cell => cell.classList.remove('log'))
      logArray.forEach((log) => {
        cells[log].classList.add('log')
      })
      logArray = logArray.map((log) => {
        if (log % width === 10) return log - width + 1
        return log + 1
      })
      if (isOnLog) {
        cells[playerIdx].classList.remove('player')
        playerIdx++
        cells[playerIdx].classList.add('player')
      }
      if (isOnLog && playerIdx % width === 10) {
        audioLose.play()
        clearInterval(timer)
        clearInterval(logTimer) 
        playing = false 
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

    // RANDOM YODA:
    const yodaSurprise = setInterval(() => {
      let randomYoda = wallArray[0] + Math.floor(Math.random() * width)

      cells[randomYoda].classList.add('yoda')

      setTimeout((yodaSurprise) => {
        cells[randomYoda].classList.remove('yoda')
      }, 1500)
    }, 1000)
    
    // RANDOM BOBA:
    const bobaThreat = setInterval(() => {
      let randomBoba = logArray[0] + Math.floor(Math.random() * width)

      cells[randomBoba].classList.add('boba')
      
      setTimeout(() => {
        cells[randomBoba].classList.remove('boba')
      }, 5000)
    }, 2000)
  })

  // // WIN CONDITION:
  function winCondition() {
    if (cells[playerIdx].classList.contains('home')) {
      audioWin.play()
      clearInterval(timer)  
      setTimeout(() => {
        grid.classList.add('hide')
      }, 200)
      setTimeout(() => {
        win.classList.replace('hide', 'win')
      }, 400)

      win.addEventListener('animationstart', e => {
        logo.classList.add('animated')
        logo.classList.add('flip')
      })

    }
  } 

  // RESET BUTTON:
  resetButton.addEventListener('click', () => {
    location.reload(1)
  })

})

