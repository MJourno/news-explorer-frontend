// import React, { useState } from 'react';
import About from '../About/About'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import SearchResults from '../SearchResults/SearchResults';

function Main({
  hasResults,
  isNewsCardListOpen,
  searchKeyword,
  setSearchKeyword,
  onSearch,
  onSaveArticleClick,
  onDeleteArticleClick,
  savedArticles,
  savedCardsArray,
  setShowCards,
  showCards,
  cards,
  isLoggedIn,
  handleDifferentPopup,
  isLoading
}) {
  return (
    <main className="main">
      <SearchForm
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        onSearch={onSearch}
      />
      {hasResults && isNewsCardListOpen && (
        <SearchResults
          onSaveArticleClick={onSaveArticleClick}
          savedArticles={savedArticles}
          savedCardsArray={savedCardsArray}
          setShowCards={setShowCards}
          showCards={showCards}
          cards={cards}
          isLoggedIn={isLoggedIn}
          handleDifferentPopup={handleDifferentPopup}
          onDeleteArticleClick={onDeleteArticleClick}
        />
      )}
      {isLoading && <Preloader />}
      {!hasResults && isNewsCardListOpen &&
        (<NotFound />)
      }


      <About />
    </main>
  );
}
export default Main;