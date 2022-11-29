/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './stats.css';

function Stats() {
  const [statList, setStatList] = useState([]);
  const [yourStat, setYourStat] = useState([]);
  useEffect(() => {
    fetch(
      'http://localhost:6622/api/tt/stats',
      { credentials: 'include' },
    // ).then((res) => res.json()).then((res) => setStatList(res));
    ).then((res) => res.json()).then((res) => {
      setStatList(res.data);
      setYourStat(res.yourStat);
    });
  }, []);

  return (
    <div className="s">
      <h1 style={{ textAlign: 'center', fontWeight: '200' }}>Общая статистика</h1>
      <div className="allin">
        <table cellPadding="4" cellSpacing="1" className="table" id="overall">
          <tr>
            <th style={{ textAlign: 'center', fontWeight: '200' }}>Имя игрока</th>
            <th style={{ textAlign: 'center', fontWeight: '200' }}>Количество очков</th>
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
          ) : (<tr style={{ textAlign: 'center', fontWeight: '200' }}><td>Данных по игрокам нет</td></tr>)}
        </table>
      </div>
      <h1 style={{ textAlign: 'center', fontWeight: '200' }}>Личная статистика</h1>
      <div className="allin">
        <table cellPadding="4" cellSpacing="1" id="personal">
          <tr>
            <th style={{ textAlign: 'center', fontWeight: '200' }}>№ </th>
            <th style={{ textAlign: 'center', fontWeight: '200' }}>Количество очков</th>
          </tr>
          {yourStat.length ? (
            (yourStat.map((el) => (
              <tr>
                <td>{yourStat.indexOf(el) + 1}</td>
                <td>{el.total_score}</td>
              </tr>
            )))
          ) : (<tr style={{ textAlign: 'center', fontWeight: '200' }}><td>Данных по игрокам нет</td></tr>)}
        </table>
      </div>
    </div>

  );
}

export default Stats;
