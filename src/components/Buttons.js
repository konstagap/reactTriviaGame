import React from "react";

export default function Buttons({
  start,
  setStart,
  startTimer,
  setResults,
  questions
}) {
  if (questions === 0) {
    return (
      <>
        <h1 className="category__header__inner">
          OOPS!Looks like I have no questions on this category
        </h1>
        <h3> Please try another one</h3>
      </>
    );
  }
  return (
    <div>
      {!start.begin && (
        <button
          className="btn"
          onClick={() => {
            setStart(() => ({ firstGame: false, begin: true }));
            startTimer();
            setResults(null);
          }}
        >
          {start.firstGame ? "get started" : "Try Again"}
        </button>
      )}
    </div>
  );
}
