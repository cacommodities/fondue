import { useState } from "react";

const expensiveCalculation = (counter: number) => {
  console.log("Performing expensiveCalculation");
  return counter + 100;
};

export default function ReactCompilerShowcase() {
  // "use no memo";

  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const counterPlusHundred = expensiveCalculation(counter);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  const handleClick2 = () => {
    setCounter2(counter2 + 1);
  };

  return (
    <div className="">
      <div className="border border-rose-400 p-2">
        <span>Counter 1: {counter}</span>
        <span>Counter 1 + 100: {counterPlusHundred}</span>
        <button className="btn btn-primary" onClick={handleClick}>
          +1
        </button>
      </div>
      <div className="border border-rose-400 p-2">
        <span>Counter 2: {counter2}</span>
        <button className="btn btn-primary" onClick={handleClick2}>
          +1
        </button>
      </div>
    </div>
  );
}
