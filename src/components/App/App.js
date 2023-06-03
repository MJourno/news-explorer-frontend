import './App.css';
import '../../index.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import Header from '../Header/Header';
// import savedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import { allCards } from '../data/data';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import RegSuccessPopup from '../RegSuccessPopup/RegSuccessPopup';
import * as auth from '../../utils/auth';
// import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  // const [cards, setCards] = useState(allCards);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMobileNav , setIsMobileNavOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isRegSuccessPopupOpen, setRegSuccessPopupOpen] = useState(false);
  const [isInHomepage, setInHomepage] = useState(true);
  console.log(isInHomepage);

  function handleSignup ({email, password, name}) {
    auth.register(email, password, name)
    .then ((res) => {
      console.log('res', res);
      closeAllPopups(true);
      setRegSuccessPopupOpen(true);
      setIsSignupPopupOpen(false);

    })
    .catch((err) => {
      console.log(`Something went wrong: ${err}`);

    });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res);
          setLoggedIn(true);
          closeAllPopups();
        }
      })
      .catch((err) => {
        console.log(`Something went wrong: ${err}`);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }
  
  useEffect(() => {
    if (window.location.pathname === '/') {
      setInHomepage(true)
    } else {
      setInHomepage(false)
    }
  }, [window.location.pathname])

  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsSignupPopupOpen(false);
    setRegSuccessPopupOpen(false);
    setIsMobileNavOpen(false);
  }

  function openPopuplogin() {
    setIsLoginPopupOpen(true);
  }

  function openPopupSignup() {
    setIsSignupPopupOpen(true);
  }

  function openMobileNav() {
    setIsMobileNavOpen(true);
  }

  

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getContent(jwt)
      .then((data) => {
          if(data) {
              setLoggedIn(true);
              setCurrentUser({ 
                _id: data._id, 
                name: data.username, 
                email: data.email 
              });
          }
      }, )
      .catch((err) => {
          console.log(`Something went wrong in getContent function: ${err}`);
      })
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentLocationContext.Provider value={isInHomepage}>
        <div className="App">
          <Routes>
            <Route path='/'
              element={<>
                <Header
                  openPopuplogin={openPopuplogin}
                  openPopupSignup={openPopupSignup}
                  isSavedNews={true}
                  isLoggedIn={isLoggedIn}
                  isMobileNav={isMobileNav}
                  setIsLoginPopupOpen={setIsLoginPopupOpen}
                  setIsMobileNavOpen={setIsMobileNavOpen}
                />
                <Main
                  isLoggedIn={isLoggedIn}
                  isInHomepage={isInHomepage}
                />
                
              </>
              }
            />
            <Route path='/saved-news'
              element={<>
                <ProtectedRoute
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  handleSignOut={handleSignOut}
                /></>} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
          <Footer />
          <Login
                  isOpen={isLoginPopupOpen}
                  onClose={closeAllPopups}
                  onSignin={handleLogin}
                  handleDifferentPopup={openPopupSignup}
                />
                <Signup 
                isOpen={isSignupPopupOpen}
                onClose={closeAllPopups}
                onSignup={handleSignup}
                handleDifferentPopup={openPopuplogin}
                />
                <RegSuccessPopup
                name="RegSuccess"
                isOpen={isRegSuccessPopupOpen}
                onClose={closeAllPopups}
                handleDifferentPopup={openPopuplogin}
                isLoggedIn={isLoggedIn}
                />
        </div>
      </CurrentLocationContext.Provider>
    </CurrentUserContext.Provider >
  );
}

export default App;
