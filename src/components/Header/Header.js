import React from 'react';
import Navigation from '../Navigation/Navigation';
import '../../index.css';

function Header({ isLoggedIn, setIsLoginPopupOpen, setIsMobileNavOpen, isMobileNav, onLogOut}) {

  return (
    <header className={`header ${isMobileNav ? 'header_nav-active' : ''}`}>
        <Navigation
        isLoggedIn={isLoggedIn}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        isMobileNav={isMobileNav}
        onLogOut={onLogOut}
        />
    </header>
  );
}
export default Header;