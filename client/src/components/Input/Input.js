/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Input({ todo, setTodo }) {
  const [value, setValue] = useState('');

  function saveTodo() {
    setTodo(
      [...todo, {
        id: uuidv4(),
        title: value,
        status: true,
      }],
    );
  }

  return (
    <div>
      <input placeholder="Добавит новое задание" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={saveTodo}>Сохранить</button>
    </div>
  );
}
