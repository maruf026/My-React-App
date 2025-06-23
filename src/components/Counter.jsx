import { useState } from "react";
import { DecreaseBtn, IncreaseBtn, ResetBtn } from "./Button";

export default function Counter() {
  let [count, setCount] = useState(0);
  function handleIncrease() {
    setCount(count + 1);
  }
  function handleDecrease() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  function handleReset() {
    if (count > 0) {
      setCount(0);
    }
  }
  return (
    <div className="text-center h-full">
      <div className="stats bg-gray-800 border-base-300 border mt-5.5">
        <div className="stat">
          <div className="stat-title text-center text-2xl">Counter</div>
          <div className="stat-value text-center">{count}</div>
          <div className="flex justify-between">
            <IncreaseBtn clickInc={handleIncrease} />
          <DecreaseBtn clickDec={handleDecrease} />
          <ResetBtn clickReset={handleReset} />
          </div>
        </div>
      </div>
    </div>
  );
}
