// import React, { useState } from 'react';
import About from '../About/About'
import SearchForm from '../SearchForm/SearchForm'
// import Preloader from '../Preloader/Preloader';
// import NotFound from '../NotFound/NotFound';
// import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
// import SavedNews from '../SavedNews/SavedNews';
import SearchResults from '../SearchResults/SearchResults';

function Main() {
  return (
    <main className="main">
      <SearchForm />
      {/* <Preloader />
      <NotFound /> */}
      {/* <SearchResults 
     
      /> */}
      <About />
    </main>
  );
}
export default Main;