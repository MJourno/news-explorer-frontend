import React, { useEffect } from "react";
import { useContext } from "react";
import { CurrentLocationContext } from "../../contexts/CurrentLocationContext";
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({
  savedCardsArray,
  setSavedCardsArray,
  savedArticles,
  isLoggedIn,
  handleDifferentPopup,
  onSaveArticleClick,
  onDeleteArticleClick,
}) {

  const isInHomepage = useContext(CurrentLocationContext);

  
  useEffect(() => {
    if (!isInHomepage) {
      setSavedCardsArray(savedArticles);
    }
  }, [isInHomepage, savedArticles, setSavedCardsArray]);

  return (
    <ul className='newsCardList__cards-grid'>
       {savedCardsArray?.map((newscard) => (
         <li className='newsCard' key={newscard._id}>
              <NewsCard
                data={newscard}
                newscard={newscard}
                isLoggedIn={isLoggedIn}
                handleDifferentPopup={handleDifferentPopup}
                savedArticles={savedArticles}
                onSaveArticleClick={onSaveArticleClick}
                onDeleteArticleClick={onDeleteArticleClick}
              /></li>
          ))}
    </ul>
  )
}

export default NewsCardList;