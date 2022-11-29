/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './stats.css';

function Stats() {
  const [statList, setStatList] = useState([]);
  useEffect(() => {
    fetch(
      'http://localhost:6622/api/tt/stats',
      { credentials: 'include' },
    ).then((res) => res.json()).then((res) => setStatList(res));
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Статистика</h1>
      <div className="table">
        <table cellPadding="4" cellSpacing="1">
          <tr>
            <th>Имя игрока</th>
            <th>Количество очков</th>
          </tr>
          {statList.length ? (
            (statList.map((el) => (
              <tr>
                <td>{el[0]}</td>
                <td>
                  {' '}
                  {el[1]}
                </td>
                {' '}
              </tr>
            )))
          ) : (<tr><td>Данных по игрокам нет</td></tr>)}
        </table>
      </div>

    </>

  );
}

export default Stats;
