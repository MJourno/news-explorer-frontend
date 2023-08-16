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
import newsApi from '../../utils/NewsApi';
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
  const [isNewsCardListOpen, setIsNewsCardListOpen] = useState(false);

  const [isInHomepage, setInHomepage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const [searchKeyword, setSearchKeyword] = useState([]);
  const [cards, setCards] = useState([]);
  const [hasResults, setHasResults] = useState(false);

  const [showCards, setShowCards] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [savedCardsArray, setSavedCardsArray] = useState([]);

  // Search articles from api by keyword
  function handleSearchSubmit(keyword) {
    setIsNewsCardListOpen(false);
    setIsLoading(true);
    newsApi
      .getArticles(keyword)
      .then((res) => {
        setIsNewsCardListOpen(true);
        setCards(res);
        if (res.length === 0) {
          setHasResults(false);
        } else {
          setHasResults(true);
        }
      })
      .catch((err) => {
        console.log(`Something went wrong: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //Save articles and adds it to an array of articles
  function handleArticleSaving(data) {
console.log(data,"app data check");
    if (!savedArticles
      .find((obj) => obj.title === data.title)) {
      mainApi
        .saveArticle(data, searchKeyword, jwt)
        .then((res) => {
          if (res) {
            setSavedArticles((savedArticles) => [...savedArticles, res.data]);
          }
        })
        .catch((err) => {
          console.log(`Something went wrong: ${err}`);
        })
    } else {
      console.log('you have allready saved this article');
    }
  }

  // DELETE-ing article and removes it from the array
  function handleRemoveArticle(data) {
    let articleId;

    if (isInHomepage) {
      if (savedArticles.find((obj) => obj.link === data.url)) {
        const article = savedArticles.find((obj) => {
          return obj.link === data.url;
        });
        articleId = article._id;
      } else {
        console.log("this card does not exist");
      }
    } else {
      articleId = data._id;
    }
    mainApi
      .unsaveArticle(articleId, jwt)
      .then((data) => {
        setSavedArticles(savedArticles.filter((obj) => obj._id !== data._id));
      })
      .catch((err) => {
        console.log(`Something went wrong: ${err}`);
      });
      
  }

  function handleSignup({ email, password, name }) {
    auth
      .register(email, password, name)
      .then((res) => {
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
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
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

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([auth.getContent(jwt), mainApi.getSavedArticles(jwt)])
        .then(([user, articles]) => {
          setCurrentUser(user);
          setSavedArticles(articles);

        },)
        .catch((err) => {
          console.log(`Something went wrong in getContent function: ${err}`);
        })
    }
  }, [jwt, isLoggedIn]);

  useEffect(() => {
    if (jwt) {
      setLoggedIn(true);
    }
  }, [jwt]);

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
                  isNewsCardListOpen={isNewsCardListOpen}
                  isLoading={isLoading}
                  // isInHomepage={isInHomepage}
                  //on searchForm
                  onSearch={handleSearchSubmit}
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                  setIsNewsCardListOpen={setIsNewsCardListOpen}
                  //on searchResults
                  onSaveArticleClick={handleArticleSaving}
                  setShowCards={setShowCards}
                  showCards={showCards}
                  hasResults={hasResults}
                  cards={cards}
                  //on card
                  handleDifferentPopup={openPopuplogin}
                  savedArticles={savedArticles}
                  onDeleteArticleClick={handleRemoveArticle}

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
                  setShowCards={setShowCards}
                  savedCardsArray={savedCardsArray}
                  setSavedCardsArray={setSavedCardsArray}
                  savedArticles={savedArticles}
                  onDeleteArticleClick={handleRemoveArticle}
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
