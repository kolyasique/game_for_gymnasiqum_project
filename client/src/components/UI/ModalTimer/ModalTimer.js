/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import cl from './ModalTimer.module.css';

export default function ModalTimer({ timeLeft, setVisible }) {
  // setInterval(num - 1, 1000);

  return (
    <div>
      <p className="threeP">{timeLeft > 0 ? (<>{timeLeft}</>) : (<p>Время вышло!</p>)}</p>
    </div>
  );
}
