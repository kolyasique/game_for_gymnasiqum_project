/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
// import reducer from './reducer';
// import { increment, decrement, obnulit } from './actiongenerators';
import MyModal from '../Modal/MyModal';
import { UserContext } from '../../context/User.context';

export default function Home() {
  const [modal, setModal] = useState(false);
  const { user, setUser } = useContext(UserContext);

  console.log(user, 'Это данные юзера');
  // useReduser принимает два аргумента. 1 - функеция обработчик, 2 - стартовое состояние объекта
  // const [state, dispatch] = useReducer(reducer, {
  //   counter: 0,
  // });
  const [themes, setThemes] = useState([]);
  const num = 5;
  const [timeLeft, setTimeLeft] = useState(num);
  const { visibleBtn, setVisibleBtn } = useContext(UserContext);
  useEffect(() => {
    const timerFunc = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
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
      <div>{themes.map((el) => (
        <div>{el.title}:{el.Items.map((elt) => (
          <>
            {elt.Itemstatuses.find((e) => (e.user_id == user.id && e.item_id == elt.id)) ? (
              <button disabled onClick={() => { setModal(true); setTimeLeft(5); }}>{elt.value}</button>
            ) : (
              <button disabled={visibleBtn} onClick={() => { setModal(true); setTimeLeft(5); }}>{elt.value}</button>
            )}
            <MyModal visible={modal} setVisible={setModal} question={elt.question} timeLeft={timeLeft} id={elt.id} />
          </>
        ))}

        </div>
      ))}
      </div>

    </div>
  );
}
