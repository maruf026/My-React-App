export default function FahrenheitInput({ handleInput, value }) {
  return (
    <div className="flex flex-col items-start gap-2 p-4 border rounded-xl shadow-md w-1/2 bg-gray-900">
      <label htmlFor="fahrenheit" className="text-lg font-medium text-white">
        Fahrenheit
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        placeholder="32 °F"
      />
    </div>
  );
}
