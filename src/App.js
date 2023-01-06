import './App.css';
import { useState } from 'react';


function App() {
  const [display, setDisplay] = useState('0');
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState('0');

  const displayNumberHandle = (e) => {
    const numbers = e.target.textContent
    if(display === '0') {
      setDisplay("");
      setProgress("");
      setProgress(prev => prev + numbers);
      setDisplay(prev => prev + numbers);
    } else {
      setProgress(prev => prev + numbers);
      setDisplay(prev => prev + numbers);
    }
    if(/[=]$/.test(progress)) {   
      setProgress('')
      setProgress(prev => prev + numbers)
      setDisplay(numbers);
  } else if(/[-*/+]$/.test(progress)) {
    setDisplay(numbers);
  } }

  const displaySymbolHandle = (e) => {
    let symbols = e.target.textContent
    let newSymbols = [];
    if(symbols === 'x') {
      newSymbols.push('*');
    } else if (symbols === '÷') {
      newSymbols.push('/');
    } else {
      newSymbols.push(symbols);
    }
      setProgress(progress + newSymbols[0])
      setDisplay(newSymbols[0]);

    if(/[=]$/.test(progress)) {   
      setProgress(result + newSymbols[0])
      setDisplay(newSymbols[0]);
    }
    if(/[-*+/]{1}$/.test(progress)) {
      if(newSymbols[0] === '-') {
        setProgress(progress + newSymbols[0]);
      } else if (/[-*+/]{2}$/.test(progress) && progress.charAt(-1) !== '-' ) {
        setProgress(progress.slice(0, progress.length-2) + newSymbols[0]);
      } else {
        setProgress(progress.slice(0, progress.length-1) + newSymbols[0]);
      }
    }
  }

  const decimalHandle = (e) => {
    const decimal = e.target.textContent;
    if(/[.]+$/.test(progress) && decimal === '.') {
      setProgress(progress.slice(0, progress.length - 1) + decimal);
    } else if(/^[\d]+[.]{1}/.test(progress) && /[-*/+]+/.test(progress) === false){
      setProgress(progress);
    } else {
      setDisplay(prev => prev + decimal);
      setProgress(progress + decimal);
    }
  }
    

  const resultHandle = (e) => {
    setResult(eval(progress));
    setDisplay(eval(progress));
    setProgress(progress + e.target.textContent);
  }

  const backHandle = () => {
    setProgress(progress
      .split("")
      .slice(0, progress.length - 1)
      .join("")
    );
    setDisplay(display
      .split("")
      .slice(0, display.length - 1)
      .join(""));
  }

  const clearHandle = () => {
    setProgress("");
    setDisplay("0");
    setResult("0");
  }


  return (
    <div className="App">
      <div className="container">
        <div className="dis">
          <div className='progress'>{progress}</div>
          <div className='result' id="display">{display}</div>
        </div>
        <div className="button AC" id="clear" onClick={clearHandle}>AC</div>
        <div className="button back" id="back" onClick={backHandle}>←</div>
        <div className="button div sym" id="divide" onClick={displaySymbolHandle}>÷</div>
        <div className="button mul sym" id="multiply" onClick={displaySymbolHandle}>x</div>
        <div className="button seven" id="seven" onClick={displayNumberHandle}>7</div>
        <div className="button eight" id="eight" onClick={displayNumberHandle}>8</div>
        <div className="button nine" id="nine" onClick={displayNumberHandle}>9</div>
        <div className="button minus sym" id="subtract" onClick={displaySymbolHandle}>-</div>
        <div className="button four" id="four" onClick={displayNumberHandle}>4</div>
        <div className="button five" id="five" onClick={displayNumberHandle}>5</div>
        <div className="button six" id="six" onClick={displayNumberHandle}>6</div>
        <div className="button plus sym" id="add" onClick={displaySymbolHandle}>+</div>
        <div className="button one" id="one" onClick={displayNumberHandle}>1</div>
        <div className="button two" id="two" onClick={displayNumberHandle}>2</div>
        <div className="button three" id="three" onClick={displayNumberHandle}>3</div>
        <div className="button equal" id="equals" onClick={resultHandle}>=</div>
        <div className="button zero" id="zero" onClick={displayNumberHandle}>0</div>
        <div className="button dot" id="decimal" onClick={decimalHandle}>.</div>
      </div>
      <a href='https://github.com/CalebSHJ/ReactCalculator'>Go to check codes</a>
    </div>
  );
}


export default App;