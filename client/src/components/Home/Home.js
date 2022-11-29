/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React, {
  useContext, useEffect, useReducer, useState,
} from 'react';
import './Home.css';
// import reducer from './reducer';
// import { increment, decrement, obnulit } from './actiongenerators';
import MyModal from '../Modal/MyModal';
import { UserContext } from '../../context/User.context';
import Score from '../Score/Score';

export default function Home() {
  const { modal, setModal } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const [modalParams, setModalParams] = useState({
    visible: false,
    id: null,
    question: '',
    value: null,
  });

  console.log(user, 'Это данные юзера');
  // useReduser принимает два аргумента. 1 - функеция обработчик, 2 - стартовое состояние объекта
  // const [state, dispatch] = useReducer(reducer, {
  //   counter: 0,
  // });
  const [themes, setThemes] = useState([]);
  const num = 30;
  const [timeLeft, setTimeLeft] = useState(num);
  const {
    score, visibleBtn, setVisibleBtn, setSubDis,
  } = useContext(UserContext);
  // const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
  useEffect(() => {
    const timerFunc = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
      setModal(false);
      return clearTimeout(timerFunc);
    }
    return () => {
      clearTimeout(timerFunc);
    };
  }, [timeLeft]);
  console.log(themes);
  const abortController = new AbortController();

  useEffect(() => {
    fetch('http://localhost:6622/api/tt', {
      credentials: 'include',
      // ручка за которую у нас цепляется abortcontroller
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setThemes(data));
  }, []);
  // };

  return (
    <div className="mainpage usereducer">
      <div className="score">{localStorage.getItem('score') ? (<>{localStorage.getItem('score')}</>) : (0)}</div>
      <div className="themes">{themes.map((el) => (
        <div className="items"><div className="theme">{el.title}</div>{el.Items?.sort((a, b) => a.value - b.value).map((elt) => (
          <div className="item">
            {elt.Itemstatuses?.find((e) => (e.user_id == user.id && e.item_id == elt.id && e.result_id == user.result_id)) ? (
              <button
                key={elt.id}
                className="itembtn"
                disabled
                onClick={() => {
                  setSubDis(false);
                  setModal(true); setModalParams({
                    visible: true, id: elt.id, question: elt.question, value: elt.value,
                  }); setTimeLeft(30);
                }}
              >{elt.value}
              </button>
            ) : (
              <button
                key={elt.id}
                className="itembtn"
                id={elt.id}
                disabled={visibleBtn.includes(elt.id)}
                onClick={() => {
                  setSubDis(false);
                  setVisibleBtn([...visibleBtn, elt.id]);
                  setModal(true); setTimeLeft(30); setModalParams({
                    visible: true, id: elt.id, question: elt.question, value: elt.value,
                  }); console.log('в модал идет:', elt.question, elt.value);
                }}
              >{elt.value}
              </button>
            )}
          </div>
        ))}
          {/* setVisibleBtn(true); */}
        </div>
      ))}
      </div>
      <MyModal key={modalParams.id} visible={modal} setVisible={setModal} question={modalParams.question} timeLeft={timeLeft} id={modalParams.id} value={modalParams.value} />
    </div>
  );
}
