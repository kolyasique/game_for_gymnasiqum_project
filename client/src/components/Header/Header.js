/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
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
        localStorage.clear();
        setUser(null);
        // win.clear();
      }
    });
  };

  return (
    <div className="nav">
      <img className="nav-logo" src={logo2} alt="nav-logo-beaver" />
      {user
      && (
        <>
          <Link to="/"><button className="nav-logout" style={{ textDecoration: 'none' }} type="button">Главная</button></Link>
          <Link to="/stats"><button className="nav-logout" type="button">Статистика</button></Link>
          <Link to="/"><button className="nav-logout" type="button" onClick={handleLogout}>Выйти</button></Link>
        </>

      )}
    </div>
  );
}
