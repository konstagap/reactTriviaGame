import React from "react";
import he from "he";

export default function Questions({
  collectAnswers,
  questions,
  timer,
  start,
  selectChange
}) {
  return (
    <div>
      {start.begin && (
        <div>
          <h1 className="question__header">{questions[0].category}</h1>
          <h2
            className={
              timer < 5
                ? "question__seconds red animated bounce"
                : "question__seconds"
            }
          >{`seconds left ${timer}`}</h2>
          <div className="questions">
            {questions.map(question => (
              <div className="question__item" key={he.decode(question.q)}>
                <p className="question__title">{he.decode(question.q)}</p>
                <select
                  className="select"
                  data-value={question.q}
                  onChange={selectChange}
                >
                  <option></option>
                  {question.opt.map(opt => (
                    <option key={opt} value={opt}>
                      {he.decode(opt)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button className="btn" onClick={collectAnswers}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
