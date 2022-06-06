import { nanoid } from 'nanoid';
import { useState } from 'react';
import './App.css';
import Die from './Die';

function App() {
  const [dice, setDice] = useState(allNewDice());
  
  function generateDie(){
    return {
      value: Math.ceil(Math.random()*6), 
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice(){
    let newDice = [];
    for(let i=0; i<10; i++){
      newDice.push(generateDie())
    }
    return newDice;
  }
  function holdDice(id){
    console.log(id);
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }
  function rollDice(){
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
      die :
      generateDie();
      }
    ))
  }
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>);

  return (
   <main>
     <h1 className="title">Tenzies</h1>
     <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className='dice-container'>
       {diceElements}
     </div>
     <button className="roll-btn" onClick={rollDice}>Roll</button>
   </main>
  );
}

export default App;
