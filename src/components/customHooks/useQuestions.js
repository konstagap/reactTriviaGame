import { useState, useEffect } from "react";
import axios from "axios";

export const useQuestions = chosenCategory => {
  const [questions, setQuestions] = useState();

  let ENDPOINT = `https://opentdb.com/api.php?amount=6&category=${chosenCategory}&difficulty=easy&type=multiple`;

  useEffect(() => {
    let getQuestions = async () => {
      if (chosenCategory) {
        let { data } = await axios.get(ENDPOINT);

        let apiQuestions = data.results.map(el => {
          return {
            category: el.category,
            q: el.question,
            opt: [...el.incorrect_answers, el.correct_answer].sort(),
            correct: el.correct_answer
          };
        });
        setQuestions(apiQuestions);
      }
    };
    getQuestions();
  }, [chosenCategory, ENDPOINT]);
  return [questions];
};
