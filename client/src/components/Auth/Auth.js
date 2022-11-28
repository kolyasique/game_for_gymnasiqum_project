/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-labels */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User.context';

// import { useNavigate } from 'react-router-dom';
import './Auth.css';
import './toggle.css';

const win = window.sessionStorage;

const formInitialState = {
  login: '',
  password: '',
};

export default function Auth() {
  const { user, setUser } = useContext(UserContext);

  const [isSignUp, setIsSignUp] = useState(true);

  const [form, setForm] = useState(formInitialState);

  const handleFormChange = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = !toggle.checked ? 'http://localhost:6622/api/auth/signup' : 'http://localhost:6622/api/auth/signin';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error('Something went wrong');
      })
      .then((res) => {
        setUser(res);
      })
      .catch(console.error)
      .finally(() => {
        setForm(formInitialState);
      });
  };

  // win.setItem('login', form.login);
  // win.setItem('password', form.password);
  // const navigate = useNavigate();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //   useEffect(() => {
  //     localStorage.setItem('form', JSON.stringify(form));
  //   }, [form]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setAuth(form);
  //   console.log(form);
  //   navigate('/');
  // };

  return (
    <div className="authform">
      <form onSubmit={handleSubmit}>
        <div className={`mb-3 ${isSignUp ? 'visible' : 'invisible'}`}>
          <label className="form-label ">Login</label>
          <input type="text" className="form-control" value={form.login} name="login" onChange={handleInput} />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={form.password} name="password" onChange={handleInput} />
        </div>

        <div className="toggle-switch">
          <p>Sign Up</p>
          <div>
            <input className="toggle" type="checkbox" id="toggle" onClick={handleFormChange} checked={!isSignUp} />
            <label className="toggle-label" htmlFor="toggle" />
          </div>
          <p>Sign In</p>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <div>..</div>
      </form>
    </div>

  );
}
