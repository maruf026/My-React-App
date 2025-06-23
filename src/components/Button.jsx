export function IncreaseBtn({ clickInc }) {
  return (
    <div>
      <button onClick={clickInc} className="btn btn-xs btn-success">
        Increase
      </button>
    </div>
  );
}

export function DecreaseBtn({ clickDec }) {
  return (
    <div>
      <button
        onClick={clickDec}
        className="btn btn-xs btn-success bg-amber-400 mx-1"
      >
        Decrease
      </button>
    </div>
  );
}
export function ResetBtn({ clickReset }) {
  return (
    <div>
      <button
        onClick={clickReset}
        className="btn btn-xs btn-success bg-red-600 text-white "
      >
        Reset
      </button>
    </div>
  );
}
