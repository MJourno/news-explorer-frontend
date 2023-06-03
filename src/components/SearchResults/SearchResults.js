import NewsCard from "../NewsCard/NewsCard";

function SearchResults() {
  return (
    <section className="searchResults">
      <div className="searchResults____container">
        <h2 className="searchResults__title">Search results</h2>
        <div className="newsCardList__cards-grid">
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        </div>
        <button className="searchResults__showMore">Show more</button>
      </div>
    </section>
  )
}

export default SearchResults;