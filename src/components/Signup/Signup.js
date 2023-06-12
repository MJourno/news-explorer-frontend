import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState } from 'react';

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignup({ email, password, name });
  }

  return (
    <PopupWithForm
      name="Signup"
      title="Sign up"
      value="Sign up"
      switchText="Sign in"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      handleDifferentPopup={props.handleDifferentPopup}
    >
      <h5 className="popup__subtitle">Email</h5>
      <input
      className="popup__input"
      placeholder="Enter email"
      type="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      {/* <span className="popup__input_type_error"></span> */}
      <h5 className="popup__subtitle">Password</h5>
      <input
      className="popup__input"
      placeholder="Enter password"
      type="password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      {/* <span className="popup__input_type_error"></span> */}
      <h5 className="popup__subtitle">Username</h5>
      <input
      className="popup__input"
      placeholder="Enter Username"
      type="name"
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      {/* <span className="popup__input_type_error"></span> */}
    </PopupWithForm>
  )
}
export default Signup;