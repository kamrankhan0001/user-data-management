import React, { useEffect, useState } from 'react';
import './style.css';

const Counter = () => {
  const [count, setCount] = useState(0);

function handleIncrement()
{
  setCount(count+1);
  localStorage.setItem("count", JSON.stringify(count+1));
}

function handleDecrement()
{
  setCount(count-1);
  localStorage.setItem("count", JSON.stringify(count-1));
}

function handleReset()
{
  setCount(0);
  localStorage.setItem("count", JSON.stringify(0));
}

  // Calculate the background color dynamically based on the count
  const backgroundColor = {
    background: `linear-gradient(to top, #00ff00 ${count}%, #ffffff ${count}%)`,
    transition: 'background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)', // Bezier curve animation
  };

  useEffect(() => {

    const counter = localStorage.getItem("count");
    if(counter)
    {
      setCount(Number(counter));
    }
  }, [])

  return (
    <div className='left-container'>
    <div className="counter">
      <h1>Counter-components</h1>
      <div className="background" style={backgroundColor}></div>
      <div className="buttons">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="count">Count: {count}</div>
    </div>
    </div>
  );
};

export default Counter;