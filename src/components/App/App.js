import './App.css';
import '../../index.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import RegSuccessPopup from '../RegSuccessPopup/RegSuccessPopup';
import * as auth from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNewsPage from '../SavedNewsPage/SavedNewsPage';
// import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [jwt, setToken] = useState(localStorage.getItem("jwt"));

  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMobileNav, setIsMobileNavOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isRegSuccessPopupOpen, setRegSuccessPopupOpen] = useState(false);

  const [isInHomepage, setInHomepage] = useState(true);
  const location = useLocation();

  const [savedArticles, setSavedArticles] = useState([]);

  function handleSignup({ email, password, name }) {
    console.log('app-handleRegisterSubmit');
    auth
      .register(email, password, name)
      .then((res) => {
        console.log('handleSignup', res);
        if (res) {
          setIsRegistered(true);
          setRegSuccessPopupOpen(true);
          setIsSignupPopupOpen(false);
        } else {
          setIsRegistered(false);
        }
      })
      .catch((err) => {
        console.log(`Something went wrong: ${err}`);
      });
  }

  function handleLogin(email, password) {
    console.log('app-handleLoginSubmit');

    auth
      .authorize(email, password)
      .then((res) => {
        console.log(res, 'app-login-res');
        if (res.token) {
          console.log(res.token, 'app-login-res.token');
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          setLoggedIn(true);
          closeAllPopups();
        }
      })
      .catch((err) => {
        console.log(`Something went wrong: ${err}`);
      });
  }

  function handleSignOut() {
    console.log('handleSignOut');
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/");
  }

  useEffect(() => {
    location.pathname !== '/' ? setInHomepage(false) : setInHomepage(true);
  }, [location, isInHomepage])

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

  // User token check
  // useEffect(() => {
  //   console.log('app.CheckToken');
  //   if (jwt) {
  //     auth
  //       .getContent(jwt)
  //       .then((res) => {
  //         console.log('res', jwt);
  //         setLoggedIn(true);
  //       })
  //       .catch((err) => {
  //         console.log(`Something went wrong in getContent function: ${err}`);
  //       })
  //   }
  // }, [jwt]);
  useEffect(() => {
    if (jwt) {
      console.log("im logged in")
      auth.getContent(jwt)
        .then((data) => {
          console.log(data, "app.data")

          if (data) {
            console.log(data, "app.in.data")
            // setLoggedIn(true);
            setCurrentUser({
              _id: data._id,
              name: data.name,
              email: data.email
            });
          }
        },)
        .catch((err) => {
          console.log(`Something went wrong in getContent function: ${err}`);
        })
    }
  }, [isLoggedIn]);

  // GETting current user and articles if the user logged in
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     console.log('app.getData');
  //     Promise.all([mainApi.getCurrentUser(jwt), mainApi.getSavedArticles(jwt)])
  //       .then(([user, articles]) => {
  //         setCurrentUser(user.data);
  //         setSavedArticles(articles.data);
  //       })
  //       .catch(err => {
  //         console.log(`Error in getSavedArticles and getCurrentUser: ${err}`);
  //       })
  //   }
  // }, [jwt, isLoggedIn]);

  useEffect(() => {
    if (jwt) {
      setLoggedIn(true);
    }
  }, [jwt]);

  console.log(currentUser, "check current user.app");

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
                  openMobileNav={openMobileNav}
                  isSavedNews={true}
                  isLoggedIn={isLoggedIn}
                  isMobileNav={isMobileNav}
                  setIsLoginPopupOpen={setIsLoginPopupOpen}
                  setIsMobileNavOpen={setIsMobileNavOpen}
                  onLogOut={handleSignOut}

                />
                <Main
                  isLoggedIn={isLoggedIn}
                // isInHomepage={isInHomepage}
                />

              </>
              }
            />
            <Route path='/saved-news'
              element={<>
                <Header
                  openPopuplogin={openPopuplogin}
                  openPopupSignup={openPopupSignup}
                  openMobileNav={openMobileNav}
                  isSavedNews={true}
                  isLoggedIn={isLoggedIn}
                  isMobileNav={isMobileNav}
                  setIsLoginPopupOpen={setIsLoginPopupOpen}
                  setIsMobileNavOpen={setIsMobileNavOpen}
                  onLogOut={handleSignOut}

                />
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  onLogOut={handleSignOut}
                  component={SavedNewsPage}
                // isInHomepage={isInHomepage}
                />
              </>} />
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
            // isLoggedIn={isLoggedIn}
            isRegistered={isRegistered}
          />
        </div>
      </CurrentLocationContext.Provider>
    </CurrentUserContext.Provider >
  );
}

export default App;
