import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedNews from "../SavedNews/SavedNews";

function SavedNewsPage({
   isInHomepage,
   savedCardsArray,
   setSavedCardsArray,
   savedArticles,
   cards,
   showCards,
   setShowCards,
   isLoggedIn,
   handleDifferentPopup,
   onSaveArticleClick,
   onDeleteArticleClick,
   }) {
  return (
    <main className="savedNewsPage">
      <SavedNewsHeader 
      savedArticles={savedArticles}
      />
      <SavedNews
        isInHomepage={isInHomepage}
        savedCardsArray={savedCardsArray}
        setSavedCardsArray={setSavedCardsArray}
        savedArticles={savedArticles}
        cards={cards}
        showCards={showCards}
        setShowCards={setShowCards}
        isLoggedIn={isLoggedIn}
        handleDifferentPopup={handleDifferentPopup}
        onSaveArticleClick={onSaveArticleClick}
        onDeleteArticleClick={onDeleteArticleClick}
      />
    </main>
  )
}

export default SavedNewsPage;