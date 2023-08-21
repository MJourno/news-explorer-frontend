import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState } from 'react';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignin({ email, password });
  }

  return (
    <PopupWithForm
      name="login"
      title="Sign in"
      value="Sign in"
      switchText="Sign up"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      handleDifferentPopup={props.handleDifferentPopup}
      formValid={formValid}
      
    >
      <h5 className="popup__subtitle">Email</h5>
      <input
        className="popup__input"
        placeholder="Enter email"
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailValid(e.target.checkValidity());
          setFormValid(emailValid && passwordValid);
        }}
      />
      {/* <span className="popup__input_type_error"></span> */}
      <h5 className="popup__subtitle">Password</h5>
      <input
        className="popup__input" placeholder="Enter password"
        type="password"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordValid(e.target.checkValidity());
          setFormValid(emailValid && passwordValid);
        }}
      />
      {/* <span className="popup__input_type_error"></span> */}
    </PopupWithForm>
  )

}
export default Login;