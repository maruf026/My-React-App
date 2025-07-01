import { useState } from "react";
import CelsiusInput from "./CelsiusInput";
import FahrenheitInput from "./FahrenheitInput";


export default function TempConverter() {
  const [temp, setTemp] = useState({
    celsius: "",
    fahrenheit: ""
  });

  const handleCelInput = (value) => {
    if (value === "") {
      setTemp({ celsius: "", fahrenheit: "" });
      return;
    }

    const celsius = parseFloat(value);
    if (!isNaN(celsius)) {
      const fahrenheit = (celsius * 9/5) + 32;
      setTemp({
        celsius: value,
        fahrenheit: fahrenheit.toFixed(2)
      });
    }
  };

  const handleFahInput = (value) => {
    if (value === "") {
      setTemp({ celsius: "", fahrenheit: "" });
      return;
    }

    const fahrenheit = parseFloat(value);
    if (!isNaN(fahrenheit)) {
      const celsius = (fahrenheit - 32) * 5/9;
      setTemp({
        fahrenheit: value,
        celsius: celsius.toFixed(2)
      });
    }
  };

  return (
    <div className="flex flex-col justify-around items-center gap-4">
      <h1 className="mt-10 text-2xl font-bold">Temperature Converter</h1>
      <CelsiusInput handleInput={handleCelInput} value={temp.celsius} />
      <FahrenheitInput handleInput={handleFahInput} value={temp.fahrenheit} />

    </div>
  );
}





export default function CelsiusInput({ handleInput, value }) {
  return (
    <div className="flex flex-col items-start gap-2 p-4 border rounded-xl shadow-md w-1/2 mt-10 bg-gray-900">
      <label htmlFor="celsius" className="text-lg font-medium text-white">
        Celsius
      </label>
      <input
        id="celsius"
        type="number"
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="0 °C"
      />
    </div>
  );
}



export default function FahrenheitInput({ handleInput, value }) {
  return (
    <div className="flex flex-col items-start gap-2 p-4 border rounded-xl shadow-md w-1/2 bg-gray-900">
      <label htmlFor="fahrenheit" className="text-lg font-medium text-white">
        Fahrenheit
      </label>
      <input
        id="fahrenheit"
        type="number"
        value={value}
        onChange={(e) => {
  console.log("Fahrenheit Input:", e.target.value);
  handleInput(e.target.value);
}}

        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        placeholder="32 °F"
      />
    </div>
  );
}
