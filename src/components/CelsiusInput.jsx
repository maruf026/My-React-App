export default function Celsius({ handleInput, text }) {
  return (
    <div className="flex flex-col items-start gap-2 p-4 border rounded-xl shadow-md w-1/2 mt-10 bg-gray-900">
      <label htmlFor="celsius" className="text-lg font-medium text-white">
        Celsius
      </label>
     <input
  type="number"
  value={text}
  onChange={(e) => handleInput(e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
  placeholder="0 °C"
/>

    </div>
  );
}
