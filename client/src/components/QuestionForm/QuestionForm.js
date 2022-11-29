/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useContext, useReducer, useState } from 'react';
import cl from './QuestionForm.module.css';
import { UserContext } from '../../context/User.context';

const formInitialState = {
  answer: '',
};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'disable':
//       return {
//         visibleBtn: true,
//       };
//   }
// }

export default function QuestionForm({ question, id, value }) {
  const [inputValue, setInputValue] = useState(formInitialState);
  const [message, setMessage] = useState('');
  // const { visibleBtn, setVisibleBtn } = useContext(UserContext);
  // const [state, dispatch] = useReducer(reducer, {
  //   visibleBtn: false,
  // });
  const { setModal, score, setScore } = useContext(UserContext);
  // const [scorew, setScorew] = useState(0);
  const handleInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, inputValue, value);

    const url = 'http://localhost:6622/api/tt/answer';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputValue, id, value }),
    })
      .then((res) => {
        console.log(res, 'первый рес');
        return res.json();
      })
      .then((res) => {
        if (res.message === 'Ответ верный') {
          setMessage('Ответ верный');
          setScore(res.score);
        } else {
          setMessage('Ответ неверный');
          setScore(res.score);
          console.log(score);
        }
      })
      .catch(console.error)
      .finally(() => {
      // setForm(formInitialState);
        console.log('finally');
        setInputValue(formInitialState);
        setTimeout(() => { setMessage(''); }, 1000);
        setTimeout(() => { setModal(false); }, 1500);
      });
  };

  console.log(score, 'score для записи');
  return (
    <form onSubmit={handleSubmit} className={cl.questionform}>
      <div className={cl.question}>{question}</div>
      <input type="text" name="answer" placeholder="Ваш ответ" value={inputValue.answer} onChange={handleInput} className={cl.questioninput} />
      <button className={cl.submitquestionbtn}> Ответить</button>
      <div className={cl.questionstatus}>{ message }</div>
    </form>
  );
}
