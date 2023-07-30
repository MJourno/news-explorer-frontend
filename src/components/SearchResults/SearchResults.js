import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentLocationContext } from "../../contexts/CurrentLocationContext";
import NewsCard from "../NewsCard/NewsCard";
import { CARD_AMOUNT } from "../../utils/constants";

function SearchResults({
  savedArticles,
  cards,
  showCards,
  setShowCards,
  isLoggedIn,
  handleDifferentPopup,
  onSaveArticleClick,
  onDeleteArticleClick
}) {

  const isInHomepage = useContext(CurrentLocationContext);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [next, setNext] = useState(3);

  useEffect(() => {
   setShowCards(cards?.slice(0, 3)); }
  , [cards, setShowCards]);

  useEffect(() => {
    if (showCards?.length < cards?.length) {
      setIsButtonHidden(false);
    } else {
      setIsButtonHidden(true);
    }
  }, [showCards?.length, cards?.length]);

  function handleShowMoreCards() {
    setShowCards(cards.slice(0, next + CARD_AMOUNT));
    setNext(next + CARD_AMOUNT);
  }
  return (
    <section className="searchResults">
      <div className="searchResults___container">
        <h2 className="searchResults__title">Search results</h2>
        <ul className="searchResults__cards-grid">

          {showCards?.map((newscard, index) => (
            <li className='newsCard' key={index}>
            <NewsCard
              data={newscard}
              index={index}
              isLoggedIn={isLoggedIn}
              handleDifferentPopup={handleDifferentPopup}
              savedArticles={savedArticles}
              onSaveArticleClick={onSaveArticleClick}
              onDeleteArticleClick={onDeleteArticleClick}
            /></li>
          ))}

        </ul>
        {isInHomepage && !isButtonHidden && (
        <button 
        className="searchResults__showMore"
        onClick={handleShowMoreCards}
        >Show more</button>)}
      </div>
    </section>
  )
}

export default SearchResults;