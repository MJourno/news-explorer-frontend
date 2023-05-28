function SearchForm() {
  return (
    <div className="searchForm">
      <div className="searchForm__container">
      <h1 className="searchForm__title">
        What's going on in
        the world?
      </h1>
      <p className="searchForm__subtitle">
      Find the latest news on any topic and save them in your personal account.
      </p>
      <div className="search-bar">
        <div className="search-bar__input">Enter topic</div>
        <button className="search-bar__button">Search</button>
        </div>
      </div>
    </div>
  );
}
export default SearchForm;