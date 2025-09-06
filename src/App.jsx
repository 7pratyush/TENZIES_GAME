import "./App.css"
import Die from "./components/Die.jsx";
import React from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const buttonRef = React.useRef(null);

  const gameWon = dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid()
            }))
    }

    const diceElements = dice.map(dieObj =>
       <Die 
        key={dieObj.id} 
        value={dieObj.value} 
        isHeld={dieObj.isHeld}
        hold={() => hold(dieObj.id)}
        />
      );
    
    const [count, setCount] = React.useState(0);

    function rollDice() {
      if (gameWon) {
        setDice(generateAllNewDice());
        setCount(0)
      } else {
        setDice(prev =>prev.map(die =>  
        die.isHeld ? 
          die :
          {...die, value: Math.ceil(Math.random() * 6)}
        ));
        setCount(prev => prev + 1)
      }
    }

    function hold(id) {
      setDice(prev => {
        return prev.map(die => {
          return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
        })
      })
    }

    function Confettis() {
      const { width, height } = useWindowSize()
      return (
        <Confetti
          width={width}
          height={height}
        />
      )
    }

  return (
    <main>
      {gameWon && <Confettis />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations!!! You won!!! Press "New Game" to start again. </p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>

      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
      <p>Number of times rolled: {count}</p>
    </main>
  )
}