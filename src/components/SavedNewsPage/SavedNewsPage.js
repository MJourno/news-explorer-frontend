import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedNews from "../SavedNews/SavedNews";

function SavedNewsPage({ isInHomepage}) {
  return (
    <main className="savedNewsPage">
      <SavedNewsHeader />
      <SavedNews 
      isInHomepage={isInHomepage}
      />
    </main>
  )
}

export default SavedNewsPage;