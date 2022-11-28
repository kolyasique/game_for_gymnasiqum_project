/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/User.context';

const formInitialState = {
  answer: '',
};
export default function QuestionForm({ question, id }) {
  console.log(id);
  const [inputValue, setInputValue] = useState(formInitialState);
  const [message, setMessage] = useState('');
  const { visibleBtn, setVisibleBtn } = useContext(UserContext);

  const handleInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:6622/api/tt/answer';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputValue, id }),
    })
      .then((res) => {
        console.log(res, 'первый рес');
        return res.json();
      })
      .then((res) => {
        console.log(res, 'Это рес');
        if (res.message === 'Ответ верный') { setMessage('Ответ верный'); setVisibleBtn(true); } else { setMessage('Ответ неверный'); setVisibleBtn(true); }
      })
      .catch(console.error)
      .finally(() => {
      // setForm(formInitialState);
        console.log('finally');
        setInputValue(formInitialState);
        setTimeout(() => { setMessage(''); }, 1000);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>{question}</div>
      <input type="text" name="answer" placeholder="Ваш ответ" value={inputValue.answer} onChange={handleInput} />
      <button> Ответить</button>
      <div>{ message }</div>
    </form>
  );
}
