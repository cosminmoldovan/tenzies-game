import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { useState, useEffect} from 'react';
import './App.css';
import Die from './Die';

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  
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
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }
  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
        die :
        generateDie();
        }
      ))
    }else{
      setTenzies(false);
      setDice(allNewDice());
    }
    
  }
  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld);
    const allEqual = dice.every(die => die.value === dice[0].value);
    if(allHeld && allEqual){
      setTenzies(true);
      console.log("You won!");
    }
  },[dice])
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>);

  return (
   <main>
     {tenzies && <Confetti />}
     <h1 className="title">Tenzies</h1>
     <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className='dice-container'>
       {diceElements}
     </div>
     <button className="roll-btn" onClick={rollDice}>
       {tenzies ? "New Game": "Roll"}
    </button>
   </main>
  );
}

export default App;
