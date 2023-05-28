import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignin({ email, password });
  }

  return(
<PopupWithForm
    name="login"
    title="Sign in"
    value="Sign in"
    onSubmit={handleSubmit}
  >
    <h5>Email</h5>
    <input
    //  className="form__input"
     placeholder="Enter email"
     type="email"
     required
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    />
    <h5>Password</h5>
    <input
    // className="form__input"
    placeholder="Enter password"
    type="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
  </PopupWithForm>
  )
  
}
export default Login;