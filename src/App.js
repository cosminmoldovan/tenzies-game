import { useState } from 'react';
import './App.css';
import Die from './Die';

function App() {
  const [dice, setDice] = useState(allNewDice());
  function allNewDice(){
    let newDice = [];
    for(let i=0; i<10; i++){
      newDice.push(Math.ceil(Math.random()*6))
    }
    return newDice;
  }
  const diceElements = dice.map(die => <Die value={die} />);
  return (
   <main>
     <div className='dice-container'>
       {diceElements}
     </div>
   </main>
  );
}

export default App;
