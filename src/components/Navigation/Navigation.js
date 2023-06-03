import { useContext } from "react";
import { CurrentLocationContext } from "../../contexts/CurrentLocationContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from 'react-router-dom';

function Navigation({ isLoggedIn, setIsLoginPopupOpen, setIsMobileNavOpen, isMobileNav }) {
  const isInHomepage = useContext(CurrentLocationContext);
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className='navigation'>
      {isMobileNav ?
        <div className='mobile-nav_visible'>
          <div className={"mobile__link-container"}>
            <Link
              className={`navigation__link ${isInHomepage && 'navigation__link_active : navigation__link_dark'}`}
              to='/'
            >
              Home
            </Link>
            {
              isLoggedIn ?
                <Link
                  className={`navigation__link ${!isInHomepage && 'navigation__link_active : navigation__link_dark'}`}
                  to='/saved-news'
                >
                  Saved articles
                </Link>
                :
                ''
            }
            <button onClick={() => setIsLoginPopupOpen(true)} className="navigation__signin">
              {
                isLoggedIn ?
                  <>
                    <span>{currentUser.name}
                      <i className={`navigation__logout-symbol ${!isInHomepage && 'navigation__logout-symbol_dark'}`}
                      />
                    </span>
                  </>
                  :
                  'Sign in'
              }
            </button>
          </div>
        </div>
        :
        ''
      }

      <div className='navigation__container'>
        <p
          className={`navigation__logo ${!isInHomepage && 'navigation__logo_dark'}`}
        >
          NewsExplorer
        </p>
        <div className={"navigation__link-container"}>
          <Link
            className={`navigation__link ${isInHomepage && 'navigation__link_active : navigation__link_dark'}`}
            to='/'
          >
            Home
          </Link>
          {
            isLoggedIn ?
              <Link
                className={`navigation__link ${!isInHomepage && 'navigation__link_active : navigation__link_dark'}`}
                to='/saved-news'
              >
                Saved articles
              </Link>
              :
              ''
          }
          <button onClick={() => setIsLoginPopupOpen(true)} className="navigation__signin">
            {
              isLoggedIn ?
                <>
                  <span>{currentUser.name}
                    <i className={`navigation__logout-symbol ${!isInHomepage && 'navigation__logout-symbol_dark'}`}
                    />
                  </span>
                </>
                :
                'Sign in'
            }
          </button>
        </div>
        {
          isMobileNav ?
            <button className="navigation__burger-close" onClick={() => setIsMobileNavOpen(false)}></button>
            :
            <button
              className={`navigation__burger-white ${!isInHomepage && 'navigation__burger-black'}`}
              onClick={() => setIsMobileNavOpen(true)}
            >
            </button>
        }
      </div>
    </div>
  );
}
export default Navigation;