// PLAN FOR THE GAME LOGIC:
// 1) Make grid for the board: 10x10 (referencing mike's code), and enable the charachter across the board (referencing mike's code). DONE!
// 2) Make it start on the bottom row in the middle on load. DONE!
// 3) Win condition is getting a charachter to one home cell. DONE!
// 4) Make a simple obstacles that doesnt move. DONE!
// 5) Deal with collision - Use if statements with === to figure out whether two things are in the same cell? DONE!
// 6) Add different events for whether you charachter is "riding" on the element, or beeing "killed" by the element? DONE!

// TO DO:  
// 7) Figure out how to move a log as one element.

// 8) Add more homes, obstacles, and logs of different sizes and speeds.

// 10) Game reset animation for when charachter is killed.

// 11) Start game button that makes everything start moving.

// 12) Auto generated scoreboard adding points as the charachter makes its way through the board;

// 13) Figure out how to move the charachter across by jumping over things. Use if statements related to the keycodes?

// POTENTIAL EXTRAS:
// - Add sounds and animations;
// - Add food items it can eat on the way to add extra points - reference Mike's code from the grid?
// - Add more obstacles, moving at different paces, and possibly randomly animated, think crocodile open mouth;
// - Add higher difficulty level with more items and more charachters to move across the board to win (from three to five);


document.addEventListener('DOMContentLoaded', () => {

  const width = 11
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 115
  let homeIdx = 0

  let car1Idx = 97
  let car2Idx = 81
  let car3Idx = 73
  
  let log1Array = [35, 36, 37]
 
  // function handleClick(e) {
  //   e.target.classList.add('player')
  // }

  // SETTING UP THE BOARD AND MAKING THE PLAYER MOVE AROUND ON IT:
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')

    // cell.addEventListener('click', handleClick)

    grid.appendChild(cell)
    cells.push(cell)
  }

  cells[playerIdx].classList.add('player')
  cells[homeIdx].classList.add('home')
  cells[car1Idx].classList.add('car')
  cells[car2Idx].classList.add('car')
  cells[car3Idx].classList.add('car')

  log1Array.forEach(logIdx => cells[logIdx].classList.add('log'))

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
    }
    cells[playerIdx].classList.add('player')

    winCondition(playerIdx, homeIdx)
  })


  // // WIN CONDITION:
  function winCondition() {
    if (playerIdx === homeIdx) {
      cells[homeIdx].classList.remove('home')
      cells[playerIdx].classList.add('player')
      alert('You win!')
    } 
  }


  // CAR MOVEMENT:
  const car1Movement = setInterval(() => {
    const x = car1Idx % width
    cells[car1Idx].classList.remove('car')
    if (x === 0) car1Idx += width
    car1Idx--
    cells[car1Idx].classList.add('car')
  }, 500)

  const car2Movement = setInterval(() => {
    const x = car2Idx % width
    cells[car2Idx].classList.remove('car')
    if (x === 0) car2Idx += width
    car2Idx--
    cells[car2Idx].classList.add('car')
  }, 500)

  const car3Movement = setInterval(() => {
    const x = car3Idx % width
    cells[car3Idx].classList.remove('car')
    if (x === 0) car3Idx += width
    car3Idx--
    cells[car3Idx].classList.add('car')
  }, 500)


  // LOG MOVEMENT: NOT WORKING!
  log1Array.forEach(() => {
    const log1movement = setInterval(() => {
      const x = log1Array % width
      cells[log1Array].classList.remove('log')
      if (x === 0) log1Array += width
      log1Array--
      cells[log1Array].classList.add('log')
    }, 500)
  })

  // COLLISION logic:
  setInterval(checkCollision, 60)

  function checkCollision() {
    if (cells[playerIdx].classList.contains('car')) 
      alert('You lose!')
  } 

  // // LOG RIDING LOGIC: 
  // function checkIfLog() {
  //   if (cells[playerIdx].classList.contains('log')) 
    
  // }








})








