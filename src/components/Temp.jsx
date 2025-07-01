import { useState } from "react";
import Celsius from "./CelsiusInput";
import FahrenheitInput from "./FahrenheitInput";

export default function Temp() {
  const [celsius, setCelsius] = useState("");
  const [fah, setFah] = useState("");
  function handleCelsius(value){
    let celsiusValue= parseFloat(value);
    let fahrenheit = (celsiusValue * 9/5) + 32;
    setCelsius(celsiusValue)
    setFah(fahrenheit.toFixed(2))
  }
  function handleFahrenheit(value){
    let fahValue= parseFloat(value);
    let celsius = (fahValue - 32) * 5/9;
    setCelsius(celsius.toFixed(2));
    setFah(fahValue);
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mt-7">Temparature Converter</h1>
      <div className="flex flex-col justify-around items-center gap-4">
      <Celsius handleInput={handleCelsius} text={celsius} />
      <FahrenheitInput value={fah} handleInput={handleFahrenheit} />
    </div>
    </div>
  );
}
