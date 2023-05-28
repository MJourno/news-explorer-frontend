import './App.css';
import '../../index.css';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { allCards } from '../data/data';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import * as auth from '../../utils/auth';

function App() {
  const [cards, setCards] = useState(allCards);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [regSuccess, setRegSuccess] = useState(true);
  
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
  }
  function openPopuplogin() {
    setIsLoginPopupOpen(true);
  }

  

  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then((res) => {
        if(res) {
            localStorage.setItem("token", res);
            setLoggedIn(true);
            closeAllPopups();
        }
    })
    .catch((err) => {
        console.log(`Something went wrong: ${err}`);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header
        page="home"
        openPopuplogin={openPopuplogin}
        />
        <Main 
        
        />
        <Footer />
        <Login
        isOpen={isLoginPopupOpen}
        onClose={closeAllPopups}
        onSignin={handleLogin}
        />
        <Signup/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
