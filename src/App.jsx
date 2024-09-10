import axios from "axios";
import { useEffect, useState , useRef } from "react";

import React from 'react'



const App = () => {

const [question , setQuestion ] = useState([]);
const [questionState, setQuestionState] = useState(0);
const checkedInput = useRef([]);

useState(() => {
  axios("https://the-trivia-api.com/v2/questions")
  .then((res)=> {
    // console.log(res.data)
    setQuestion(res.data);
  })
  .catch((err)=> {
    console.log(err);
  })
}, [])

function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [array [i], array[j]] = [array[j] ,array[i]];

    return array;
  }

  questionState < question.length -1 ? setQuestionState(questionState + 1) : alert("Your Quiz is finished");
}


  return (
    <>
      <h1 className="text-center">Quiz App</h1>
      {question.length > 0 ? <div>
        <h1>Q{questionState + 1}: {question[questionState].question.text}</h1>
          <ul>
          {shuffleArray([...question[questionState].incorrectAnswers , question[questionState].correctAnswer]).map((item, index)=> {
            return <li key={index}>
              <input type="radio" name="choice" id={item} value={item} ref={el => (checkedInput.current[index] = el)} />
              <label htmlFor={item}>{item}</label>
            </li>

          })}
          </ul>
          <button onClick={()=> nextQuestion()}>Next {question.length}</button>
          </div> : <h1>Loading ....</h1> }
    </>
  )
}

export default App
