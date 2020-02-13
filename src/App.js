import React, { useState, useRef, useEffect } from "react";
import { useQuestions } from "./components/customHooks/useQuestions";
import Buttons from "./components/Buttons";
import Questions from "./components/Questions";
import Results from "./components/Results";
import Category from "./components/Category";
import Spiner from "./components/Spiner";

import axios from "axios";

import "./App.css";

function App() {
  const [start, setStart] = useState({ firstGame: true, begin: false });
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState();
  const [timer, setTimer] = useState(30);
  const [category, setCategory] = useState();
  const [chosenCategory, setChosenCategory] = useState();
  const [questions] = useQuestions(chosenCategory);

  //on component mount we getting cattegories
  useEffect(() => {
    let getCategory = async () => {
      let { data } = await axios.get("https://opentdb.com/api_category.php");
      setCategory(data.trivia_categories);
    };
    getCategory();
  }, []);

  //using userf hook to make sure our timer works properly
  let id = useRef();

  const startTimer = () => {
    id.current = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
  };
  // checking if there is any time left if not then collect answers
  useEffect(() => {
    if (timer === -1) {
      collectAnswers();
    }
  }, [timer]);
  // Handling on change event when choosing answers
  const selectChange = e => {
    const userAnswer = {
      question: e.target.getAttribute("data-value"),
      answer: e.target.value
    };
    let duplicate = answers.find(a => a.question === userAnswer.question);
    if (duplicate) {
      const filtered = answers.filter(a => a.question !== duplicate.question);
      const newArray = [...filtered, userAnswer];
      setAnswers(newArray);
    } else {
      //if it doesnt exist we need to add it and return new array
      setAnswers([...answers, userAnswer]);
    }
  };

  const collectAnswers = () => {
    clearInterval(id.current);
    //Reseting timer
    setTimer(30);
    const results = {
      right: 0,
      wrong: 0,
      unAnswered: 0
    };
    //go throught each question, find answer to this question,
    // check if answers match, if match add to right, if not, add to wrong
    questions.forEach(question => {
      let match = answers.find(ans => ans.question === question.q);
      if (!match || match.answer === "") return results.unAnswered++;
      if (question.correct === match.answer) return results.right++;
      results.wrong++;
    });
    setResults(results);
    setStart(start => ({ ...start, begin: false }));
  };

  return (
    <div className="container">
      <section className="category">
        <h1 className="category__header">Welcome to Trivia Game</h1>
        {!category && <Spiner />}
        {category && (
          <>
            <Category
              start={start}
              setChosenCategory={setChosenCategory}
              category={category}
            />
          </>
        )}
      </section>
      {start.firstGame && (
        <img
          className="start__img"
          src="https://image.flaticon.com/icons/svg/1006/1006004.svg"
        ></img>
      )}
      {questions && (
        <Buttons
          questions={questions.length}
          start={start}
          setStart={setStart}
          startTimer={startTimer}
          setResults={setResults}
        />
      )}
      <Questions
        start={start}
        timer={timer}
        questions={questions}
        collectAnswers={collectAnswers}
        selectChange={selectChange}
      />
      <Results results={results} />
    </div>
  );
}

export default App;
