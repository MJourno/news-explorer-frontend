import NewsCardList from "../NewsCardList/NewsCardList";

function SearchResults() {
  return (
    <section className="searchResults">
      <div className="searchResults____container">
        <h2 className="searchResults__title">Search results</h2>
        <NewsCardList>
        </NewsCardList>
        <button className="searchResults__showMore">Show more</button>
      </div>
    </section>
  )
}

export default SearchResults;