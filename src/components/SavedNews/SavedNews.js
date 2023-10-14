import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({
  savedCardsArray,
  setSavedCardsArray,
  savedArticles,
  cards,
  showCards,
  setShowCards,
  isLoggedIn,
  // handleDifferentPopup,
  // onSaveArticleClick,
  onDeleteArticleClick
}) {

  return (
    <section className="savedNews">
      <NewsCardList
        savedCardsArray={savedCardsArray}
        setSavedCardsArray={setSavedCardsArray}
        savedArticles={savedArticles}
        cards={cards}
        showCards={showCards}
        setShowCards={setShowCards}
        isLoggedIn={isLoggedIn}
        // handleDifferentPopup={handleDifferentPopup}
        // onSaveArticleClick={onSaveArticleClick}
        onDeleteArticleClick={onDeleteArticleClick}
      />
    </section>
  )
}
export default SavedNews;