import React, { useContext } from 'react';
import { UserContext } from '../../context/User.context';

function Score() {
  const { score } = useContext(UserContext);
  return (
    <div>{score}</div>
  );
}

export default React.memo(Score);
