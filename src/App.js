
import React from "react";
import Die from "./Dice";
import {nanoid} from "nanoid"


export default function App(){

  const[dice, setdice ] = React.useState(allNewDice())
  const[tenzies,settenzies] = React.useState(false)

  React.useEffect(() => {
    console.log("die state changed")
    const alldieHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if(allSameValue &&  alldieHeld){
      settenzies(true)
      console.log("you are winner ")
    }
  },[dice])

  function generateNewDie(){
    return{
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id : nanoid()
    }
  }


  function allNewDice(){
    const newDice = []
    for(let  i =0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice;
  }
  console.log(allNewDice());



  // roll dice button
  function rollDice(){
    if(!tenzies) {
      setdice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
  }else{
    settenzies(false)
    setdice(allNewDice())
  }
}




  // hold btn function 
  function holdDice(id){
    setdice(oldDice => oldDice.map(die =>{
      return die.id === id ?
          {...die, isHeld: !die.isHeld}:
          die
    }) )
  }


  const dieElements = dice.map(die => (
      <Die   key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}

      />)
  )


  return(
    <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
        Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.
        </p>

      <div className="die--container"
      >
      {dieElements}
      </div>

      <button
          className="roll--btn" 
          onClick={rollDice}
          >
          {tenzies ? "NewGame" : "Roll"}
          </button>
    </main>
  )
}