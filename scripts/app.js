// PLAN FOR THE GAME LOGIC:

// 1) Make grid for the board: 10x10 (referencing mike's code);

// 2) Enable the charachter across the board (referencing mike's code);

// 9) Win condition is getting three charachters to the other side unscathed.

//  make a simple obstacles that doesnt move. if it hits the obstacle, it dies. Use if statements with === to figure out whether two things are in the same cell? 

// 3) Animate obstables to look like they are moving across the screen using same logic for moving the main charachter + setInterval loops? 
//   
 // Or can/should it be done in CSS with keyframes and transform (like we did with the red car in week one)? Perhaps put them in classes to make them move together at some pace?

// 4) Auto-generate the board with the elements ready to start moving on load - setInterval loop and add event listener to 'load?' (how was that part of the HW done?);

// 7) Once figured out how to do step 5, add event if true? But then add different events for whether you charachter is "riding" on the element, 
//    or beeing "killed" by the element? Not sure how to do that. Also think about how to visually allow two things to be on top of each other? 
// think about both what the frog has jumped onto, but also if something 'runs over the frog.  if statement that involves a time loop, checking where the frog is every second ticks or something has changed.

// 8) Automatic game reset upon charachter either being killed or getting to the other side.

// 10) Loose condition when charachter ir killed, even if player has managed to get one or two charachters over to the other side before.


// POTENTIAL EXTRAS:
// - Auto generated scoreboard adding points as the charachter makes its way through the board;
// 5) Figure out how to move the charachter across by jumping over things. Use if statements related to the keycodes?
// - Add sounds and animations;
// - Add food items it can eat on the way to add extra points - reference Mike's code from the grid?
// - Add more obstacles, moving at different paces, and possibly randomly animated, think crocodile open mouth;
// - Add higher difficulty level with more items and more charachters to move across the board to win (from three to five);
























// Mike's grid code:

document.addEventListener('DOMContentLoaded', () => {
  // this determines the square size of the board:
  const width = 10
  // reference the grid in html:
  const grid = document.querySelector('.grid')
  // put the cells into an array:
  const cells = []
  // define the starting point: 
  let playerIdx = 0

  // function to attach the player-symbol to the (starting) target:
  function handleClick(e) {
    e.target.classList.add('player')
  }

  // I'm not quite sure what this really does... defining the barriers of the board?
  for(let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')

    cell.addEventListener('click', handleClick)

    grid.appendChild(cell)
    cells.push(cell)
  }

  // Attaches an element (in this case the charachter) to the cell you have clicked on:
  cells[playerIdx].classList.add('player')

  // Defines the way to make the charachter move with keyup: 
  document.addEventListener('keyup', (e) => {

    // Sets out the logic for how the charachter is allowed to move on the board without falling off it. 
    // Also defines how to remove and add the player from one cell to another so that he can actually move:
    cells[playerIdx].classList.remove('player')
    const x = playerIdx % width
    const y = Math.floor(playerIdx / width)

    switch(e.keyCode) {
      case 37: if(x > 0) playerIdx -= 1
        break
      case 38: if(y > 0) playerIdx -= width
        break
      case 39: if(x < width - 1) playerIdx += 1
        break
      case 40: if(y < width - 1)playerIdx += width
        break
    }

    cells[playerIdx].classList.add('player')
  })
})






