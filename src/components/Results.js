import React from "react";

export default function Results({ results }) {
  return (
    <div>
      {results && (
        <>
          <h1>You have {results.right} right answers</h1>
          <h1>{results.wrong} wrong answers</h1>
          <h1>{results.unAnswered} unanswered </h1>
          {results.right > 4 && (
            <img
              className="congrats"
              src="https://image.flaticon.com/icons/svg/1404/1404897.svg"
            ></img>
          )}
          {results.wrong + results.unAnswered > 4 && (
            <img
              className="sad"
              src="https://image.flaticon.com/icons/svg/1450/1450743.svg"
            ></img>
          )}
        </>
      )}
    </div>
  );
}
