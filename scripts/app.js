// PLAN FOR THE GAME LOGIC:
// - Make grid for the board: 10x10 (referencing mike's code), and enable the charachter across the board (referencing mike's code). DONE!
// - Make it start on the bottom row in the middle on load. DONE!
// - Win condition is getting a charachter to one home cell. DONE!
// - Make a simple obstacles that doesnt move. DONE!
// - Deal with collision - Use if statements with === to figure out whether two things are in the same cell? DONE!
// - Add different events for whether you charachter is "riding" on the element, or beeing "killed" by the element? DONE!
// - Make two logs and make them move. DONE!
// - Make the player jump. DONE!

// TO DO:  
// 7) Attach the player to the log with the interval.

// 8) Set up the water cells to be dangerous.

// 9) An if function for displaying you loose/win on the screen - remove grid.

// 10) Start game button that makes everything start moving.

// 11) Timer display storing best time. 

// 12) Auto generated scoreboard adding points as the charachter makes its way through the board;

// 13) Add higher difficulty level with more obstacles (moving at different paces and randomly changed (ie croc), 
//     and more charachters to move across the board to win (from one to three to five).

// 14) Add food items it can eat on the way to add extra points - reference Mike's code from the grid?

// 15) Style, sounds, and animations;

// 16) Refactor my code;


document.addEventListener('DOMContentLoaded', () => {

  const width = 11
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const resetButton = document.querySelector('#reset')
  const cells = []
  let playerIdx = 115
  
  let home1Idx = 0
  let home2Idx = 3
  let home3Idx = 6
  let home4Idx = 9
  
  let car1Idx = 97
  let car2Idx = 81
  let car3Idx = 73
  
  let log1Array = [35, 36, 37]
  let log2Array = [28, 29, 30, 31]

  let isOnLog = false

  // SETTING UP THE BOARD AND MAKING THE PLAYER MOVE AROUND ON IT:
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')

    grid.appendChild(cell)
    cells.push(cell)
  }

  cells[playerIdx].classList.add('player')

  cells[home1Idx].classList.add('home')
  cells[home2Idx].classList.add('home')
  cells[home3Idx].classList.add('home')
  cells[home4Idx].classList.add('home')

  cells[car1Idx].classList.add('car')
  cells[car2Idx].classList.add('car')
  cells[car3Idx].classList.add('car')


  // SETTING UP KEYSTROKE MOVEMENTS FOR THE PLAYER
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

        // SETTING UP MOVEMENT FOR ENABLING JUMPS WITH SPACEBAR
      case 32: if (y > 0) playerIdx -= width * 2
        break 
    } 
    cells[playerIdx].classList.add('player')
    checkLog()
    winCondition(playerIdx, home1Idx, home2Idx, home3Idx, home4Idx)
  })

  function checkLog() {
    // check if frogger is on a log now
    if (cells[playerIdx].classList.contains('log')) {
      // isOnLog = playerIdx
      // return isOnLog
      isOnLog = true
      
    // if he is, start moving him - 1 index at the same speed as the log
    //     do that in your log movement function, checking the isOnLog variable
    // if not, do nothing
    } else {
      isOnLog = false
    }
  }

  // // WIN CONDITION:
  function winCondition() {
    if (playerIdx === home1Idx) {
      cells[home1Idx].classList.remove('home')
      cells[playerIdx].classList.add('player')
      alert('You win!')
    } else if (playerIdx === home2Idx) {
      cells[home2Idx].classList.remove('home')
      cells[playerIdx].classList.add('player')
      alert('You win!')
    } else if (playerIdx === home3Idx) {
      cells[home3Idx].classList.remove('home')
      cells[playerIdx].classList.add('player')
      alert('You win!')
    } else if (playerIdx === home4Idx) {
      cells[home4Idx].classList.remove('home')
      cells[playerIdx].classList.add('player')
      alert('You win!')
    }
  }

  // START BUTTON - DOESNT WORK.
  // startButton.addEventListener('click', {

  // })
  // CAR MOVEMENT:
  const car1Movement = setInterval(() => {
    const x = car1Idx % width
    cells[car1Idx].classList.remove('car')
    if (x === 0) car1Idx += width
    car1Idx--
    cells[car1Idx].classList.add('car')
  }, 700)

  const car2Movement = setInterval(() => {
    const x = car2Idx % width
    cells[car2Idx].classList.remove('car')
    if (x === 0) car2Idx += width
    car2Idx--
    cells[car2Idx].classList.add('car')
  }, 700)

  const car3Movement = setInterval(() => {
    const x = car3Idx % width
    cells[car3Idx].classList.remove('car')
    if (x === 0) car3Idx += width
    car3Idx--
    cells[car3Idx].classList.add('car')
  }, 700)

  // LOG MOVEMENT:
  // log1Array.forEach((logIdx) => {
  //   const log1movement = setInterval(() => {
  //     const x = logIdx % width
  //     cells[logIdx].classList.remove('log')
  //     if (x === 0) logIdx += width
  //     logIdx--
  //     cells[logIdx].classList.add('log')
  //     console.log(isOnLog, playerIdx)
  //     if (isOnLog) {
  //       cells[playerIdx].classList.remove('log')
  //       cells[playerIdx].classList.add('player')
  //       playerIdx--
  //     }
  //     // if (playerIdx === logIdx) {
  //     //   cells[logIdx].classList.replace('log', 'player')
  //     //   playerIdx--
  //     // }
  //   }, 1000)
  // }) 

  // 
  const logTimer1 = setInterval(() => {
    console.log(1)
    cells.forEach(cell => cell.classList.remove('log'))
    log1Array.forEach((log) => {
      cells[log].classList.add('log')
    })
    log1Array = log1Array.map((log) => {
      if (log % width === 0) return log + width - 1
      return log - 1
    })
  }, 1000)
  
  const logTimer2 = setInterval(() => {
    console.log(2)
    cells.forEach(cell => cell.classList.remove('log'))
    log2Array.forEach((log) => {
      cells[log].classList.add('log')
    })
    log2Array = log2Array.map((log) => {
      if (log % width === 0) return log + width - 1
      return log - 1
    })
  }, 1000)


  // log2Array.forEach((logIdx) => {
  //   const log2movement = setInterval(() => {
  //     const x = logIdx % width
  //     cells[logIdx].classList.remove('log')
  //     if (x === 0) logIdx += width
  //     logIdx--
  //     cells[logIdx].classList.add('log')
  //   }, 1000)
  // }) 

  // COLLISION LOGIC:
  setInterval(checkCollision, 60)

  function checkCollision() {
    if (cells[playerIdx].classList.contains('car')) {
      alert('You lose!')
    }  
  } 







})


