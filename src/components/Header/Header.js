import React from 'react';
import Navigation from '../Navigation/Navigation';
import '../../index.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header(props) {

  const currentUser = React.useContext(CurrentUserContext)
  const [isMenuNavOpen, setMenuNavOpen] = React.useState(false);
  

  function openMenuNav() {
    console.log('openMenuNav');
    isMenuNavOpen ?
      setMenuNavOpen(false)
      :
      setMenuNavOpen(true);
  }
  
  // function navigationLink(active) {
  //   if ()
  // }

  return (
    <header className={`header ${isMenuNavOpen ? 'header_nav-active' : ''}`}>
      <div className='header__container'>
        <p
          /*className={`header__logo ${navigationLink('header__logo_dark')} `}*/>
          NewsExplorer
        </p>

        <Navigation />
        <button className="header__signin">
          signin
        </button>
      </div>
      <button
      onClick={openMenuNav}
      >
        <image/>
      </button>
    </header>
  );
}
export default Header;