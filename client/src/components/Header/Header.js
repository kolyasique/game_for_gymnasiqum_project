/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import { UserContext } from '../../context/User.context';
import './Header.css';
// import logo from './log8o.png';
import logo2 from './logo.svg';
// import { Link, useNavigate } from 'react-router-dom';
// const win = window.sessionStorage;
export default function Header() {
  const { user, setUser } = useContext(UserContext);
  // const { score } = useContext(UserContext);
  // console.log(score, 'Это скоре');
  const handleLogout = () => {
    fetch(
      'http://localhost:6622/api/auth/signout',
      { credentials: 'include' },
    ).then((res) => {
      if (res.status === 200) {
        setUser(null);
        // win.clear();
      }
    });
  };

  return (
    <div className="nav">
      <img className="nav-logo" src={logo2} alt="nav-logo-beaver" />
      {user && <button className="nav-logout" type="button" onClick={handleLogout}>SignOut</button> }
    </div>
  );
}
