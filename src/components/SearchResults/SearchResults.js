import NewsCard from "../NewsCard/NewsCard";

function SearchResults() {
  return (
    <section className="searchResults">
      <div className="searchResults___container">
        <h2 className="searchResults__title">Search results</h2>
        <ul className="searchResults__cards-grid">
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        </ul>
        <button className="searchResults__showMore">Show more</button>
      </div>
    </section>
  )
}

export default SearchResults;