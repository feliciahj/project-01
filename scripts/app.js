//*************************************************************************** MY STEP BY STEP GUIDE *********************************************************

// - Make grid for the board: 10x10 (referencing mike's code), and enable the charachter across the board (referencing mike's code). DONE!
// - Make it start on the bottom row in the middle on load. DONE!
// - Win condition is getting a charachter to one alien cell. DONE!
// - Make a simple obstacles that doesnt move. DONE!
// - Deal with collision - Use if statements with === to figure out whether two things are in the same cell? DONE!
// - Add different events for whether you charachter is "riding" on the element, or beeing "killed" by the element? DONE!
// - Make two unicorns and make them move. DONE!
// - Make the player jump. DONE!
// - Start game button that makes everything start moving. DONE!
// - Reset button resetting the game. DONE!
// - Move unicorns. DONE!
// - Attach player to the unicorns. DONE!
// - Timer and display counter. DONE!
// - Set up so that if the player rides to the end of the board on the unicorn you lose. DONE!
// - Set up the water cells properly. DONE!
// - Something is screwed up with how to jump off the unicorn - can't clear the interval properly, and the timer doesn't reset. DONE!
// - Cannot clear the timer interval for when in the water. DONE!
// - Display and remove Llama at random? DONE!
// - Display monster at random? DONE!
// - Displaying win AND lose on win. FIX! DONE!
// - Add points for hitting Llama. DONE!
// - Add kill condition for hitting monster. DONE!
// - Auto-generated Llama score. DONE!
// - Styling. DONE!
// - Animation. DONE! 
// - Sounds. DONE!

//   STILL TO FIX:
// - Collision with monster isn't triggering loose condition;
// - Would like to move the timer into keystrokes as trigger, but then the lose conditions don't stop the timer properly because they are all in a different function?

//*************************************************************************** THE BEGINNING *****************************************************************

document.addEventListener('DOMContentLoaded', () => {

  const width = 11
  const grid = document.querySelector('.grid')
  const table = document.querySelector('.table')
  const tableTwo = document.querySelector('.tableTwo')
  const startButton = document.querySelector('.start')
  const resetButton = document.querySelector('.reset')
  const win = document.querySelector('.win')
  const lose = document.querySelector('.lose')
  const screen = document.querySelector('.timer')
  const scoreBoard = document.querySelector('.scoreboard')
  const currentScore = document.querySelector('#amount')
  const instructions = document.querySelector('.instructions')
  const game = document.querySelector('.game')
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
  
  let alienArray = [1, 3, 5, 7, 9]
  let harryArray = [76, 80, 93]
  let ghostArray = [73, 89, 97]
  let unicornArray = [12, 13, 14, 15, 35, 36, 37, 28, 29, 30, 31]
  let grassArray = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65]
  let icebergArray = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 
    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 
    92, 93, 94, 95, 96, 97, 98]
  let antarcticaArray = [99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 
    109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
  let fireArray = [0, 2, 4, 6, 8, 10]

  let isOnUnicorn = false
  let timer = null

  //  *****************************************************************************************************************************************************

  header.addEventListener('mouseover', e => {
    logo.classList.add('animated')
    logo.classList.add('flip')
  })

  header.addEventListener('mouseout', e => {
    logo.classList.remove('animated')
    logo.classList.remove('flip')
  })

  //  *************************************************************************** SETTING UP THE BOARD *****************************************************

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')

    grid.appendChild(cell)
    cells.push(cell)
  }

  cells[playerIdx].classList.add('player')

  alienArray.forEach(house => {
    cells[house].classList.add('alien')
  })
  harryArray.forEach(harry => {
    cells[harry].classList.add('harry')
  })
  ghostArray.forEach(ghost => {
    cells[ghost].classList.add('ghost')
  })
  unicornArray.forEach(unicorn => {
    cells[unicorn].classList.add('unicorn')
  })
  grassArray.forEach(brick => {
    cells[brick].classList.add('grass')
  })
  icebergArray.forEach(pebble => {
    cells[pebble].classList.add('iceberg')
  })
  antarcticaArray.forEach(fire => {
    cells[fire].classList.add('antarctica')
  })
  fireArray.forEach(cloud => {
    cells[cloud].classList.add('fire')
  })

  win.classList.add('hide')
  lose.classList.add('hide')

  //  *************************************************************************** KEYSTROKE MOVEMENTS FOR THE PLAYER *****************************************

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
    winCondition(playerIdx, alienArray)
    checkIfInWater()
    updateScore()
    monsterCheck()
  })

  //*************************************************************************** TIMER **********************************************************************

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

  //*************************************************************************** SCORE ***********************************************************************
  
  function updateScore() {
    if (cells[playerIdx].classList.contains('llama')) {
      audioLlama.play()
      scoreCounter += 10
      currentScore.innerHTML = `${scoreCounter} points`
    }
  }

  //*************************************************************************** CHECKING FOR MONSTER ********************************************************
  
  function monsterCheck() {
    if (cells[playerIdx].classList.contains('monster')) {
      console.log('im on a monster')
      audioLose.play()
      clearInterval(timer) 
      playing = false  
      setTimeout(() => {
        grid.classList.add('hide')
        table.classList.add('hide')
        tableTwo.classList.add('hide')
        instructions.classList.add('hide')
        game.classList.add('hide')
      }, 200)
      setTimeout(() => {
        lose.classList.replace('hide', 'lose')
      }, 200)
    }
  }

  //*************************************************************************** CHECKING IF ON UNICORN ******************************************************
  
  function checkUnicorn() {
    if (cells[playerIdx].classList.contains('unicorn')) {
      isOnUnicorn = true
    } else {
      isOnUnicorn = false
    }
  }

  //*************************************************************************** LOST IN SPACE CONDITION ******************************************************
  
  function checkIfInWater() {
    if (cells[playerIdx].classList.contains('unicorn')) {
      // console.log('riding')
      console.log(cells[playerIdx].classList)
    } else if (cells[playerIdx].classList.contains('alien')) {
      // console.log('Win')
    } else if (playerIdx <= 54) {
      console.log('this is triggered')
      audioLose.play()
      clearInterval(timer) 
      playing = false  
      setTimeout(() => {
        grid.classList.add('hide')
        table.classList.add('hide')
        tableTwo.classList.add('hide')
        instructions.classList.add('hide')
        game.classList.add('hide')
      }, 200)
      setTimeout(() => {
        lose.classList.replace('hide', 'lose')
      }, 200)
    }
  }

  //*************************************************************************** STARTING THE GAME ***********************************************************
  
  startButton.addEventListener('click', () => {
    audioStart.play()

    resetButton.classList.remove('hide')
    grid.classList.remove('hide')
    table.classList.remove('hide')
    tableTwo.classList.remove('hide')
    screen.classList.remove('hide')
    scoreBoard.classList.remove('hide')
    wrapper.classList.add('hide')
    instructions.classList.remove('hide')
    game.classList.remove('hide')

    if (playing) return
    playing = true

    // ************** HARRY MOVEMENT *************************

    function moveHarry() {
      cells.forEach(cell => cell.classList.remove('harry'))
      harryArray.forEach((harry) => {
        cells[harry].classList.add('harry')
      })
      harryArray = harryArray.map((harry) => {
        if (harry % width === 0) return harry + width - 1
        return harry - 1
      })
      function checkCollision() {
        if (cells[playerIdx].classList.contains('harry')) {
          audioLose.play()
          clearInterval(timer)  
          playing = false 
          setTimeout(() => {
            grid.classList.add('hide')
            table.classList.add('hide')
            tableTwo.classList.add('hide')
            instructions.classList.add('hide')
            game.classList.add('hide')
          }, 200)
          setTimeout(() => {
            lose.classList.replace('hide', 'lose')
          }, 200)
        }  
      } 
      setInterval(checkCollision, 60)
    }
    moveHarry()
    const harryTimer = setInterval(moveHarry, 1000)

    // ************** GHOST MOVEMENT *************************

    function moveGhost() {
      cells.forEach(cell => cell.classList.remove('ghost'))
      ghostArray.forEach((ghost) => {
        cells[ghost].classList.add('ghost')
      })
      ghostArray = ghostArray.map((ghost) => {
        if (ghost % width === 0) return ghost + width - 1
        return ghost - 1
      })
      function checkCollision() {
        if (cells[playerIdx].classList.contains('ghost')) {
          audioLose.play()
          clearInterval(timer)  
          playing = false 
          setTimeout(() => {
            grid.classList.add('hide')
            table.classList.add('hide')
            tableTwo.classList.add('hide')
            instructions.classList.add('hide')
            game.classList.add('hide')
          }, 200)
          setTimeout(() => {
            lose.classList.replace('hide', 'lose')
          }, 200)
        }  
      } 
      setInterval(checkCollision, 60)
    }
    moveGhost()
    const ghostTimer = setInterval(moveGhost, 1000)

    // ************** UNICORN MOVEMENT *************************

    function moveUnicorn() {
      checkUnicorn()
      cells.forEach(cell => cell.classList.remove('unicorn'))
      unicornArray.forEach((unicorn) => {
        cells[unicorn].classList.add('unicorn')
      })
      unicornArray = unicornArray.map((unicorn) => {
        if (unicorn % width === 10) return unicorn - width + 1
        return unicorn + 1
      })
      if (isOnUnicorn) {
        cells[playerIdx].classList.remove('player')
        playerIdx++
        cells[playerIdx].classList.add('player')
      }
      if (isOnUnicorn && playerIdx % width === 10) {
        audioLose.play()
        clearInterval(timer)
        clearInterval(unicornTimer) 
        playing = false 
        setTimeout(() => {
          grid.classList.add('hide')
          table.classList.add('hide')
          tableTwo.classList.add('hide')
          instructions.classList.add('hide')
          game.classList.add('hide')
        }, 200)
        setTimeout(() => {
          lose.classList.replace('hide', 'lose')
        }, 200)
      }
    }
    moveUnicorn()
    const unicornTimer = setInterval(moveUnicorn, 700)
    timerThing()
    monsterCheck()

    // ************** RANDOM LLAMAS *************************

    const llamaSurprise = setInterval(() => {
      const randomLlama = grassArray[0] + Math.floor(Math.random() * width)

      cells[randomLlama].classList.add('llama')

      setTimeout((llamaSurprise) => {
        cells[randomLlama].classList.remove('llama')
      }, 1500)
    }, 1000)
    
    // ************** RANDOM MONSTERS *************************

    const monsterThreat = setInterval(() => {
      const randomMonster = unicornArray[0] + Math.floor(Math.random() * width)

      cells[randomMonster].classList.add('monster')
      
      setTimeout(() => {
        cells[randomMonster].classList.remove('monster')
      }, 5000)
    }, 2000)
  })
  
  //*************************************************************************** WIN CONDITION ***************************************************************
  
  let allHome = 0
  function winCondition() {
    if (cells[playerIdx].classList.contains('alien') && allHome < 4) {
      console.log('one penguin is home, count is ', allHome + 1)
      playerIdx = 115 
      cells[playerIdx].classList.add('player')
      allHome++
    } else if (cells[playerIdx].classList.contains('alien') && allHome === 4) {
      audioWin.play()
      clearInterval(timer)  
      setTimeout(() => {
        grid.classList.add('hide')
        table.classList.add('hide')
        tableTwo.classList.add('hide')
        instructions.classList.add('hide')
        game.classList.add('hide')
      }, 200)
      setTimeout(() => {
        win.classList.replace('hide', 'win')
      }, 200)
    }
  }
  
  //*************************************************************************** RESET GAME BUTTON ***********************************************************
  resetButton.addEventListener('click', () => {
    location.reload(1)
  })

  //*************************************************************************** THE END *********************************************************************

})

