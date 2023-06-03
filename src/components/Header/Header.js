import React from 'react';
import Navigation from '../Navigation/Navigation';
import '../../index.css';

function Header({ isLoggedIn, setIsLoginPopupOpen, setIsMobileNavOpen, isMobileNav}) {

  return (
    <header className={`header ${isMobileNav ? 'header_nav-active' : ''}`}>
        <Navigation
        isLoggedIn={isLoggedIn}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        isMobileNav={isMobileNav}
        />
    </header>
  );
}
export default Header;