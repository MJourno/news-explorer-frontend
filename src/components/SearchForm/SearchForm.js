function SearchForm() {
  return (
    <section className="searchForm">
      <div className="searchForm__container">
        <h1 className="searchForm__title">
          What's going on in
          the world?
        </h1>
        <p className="searchForm__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <form className="search-bar">
          <input placeholder="Enter topic" type='text' className="search-bar__input" />
          <button type="submit" className="search-bar__button">Search</button>
        </form >
      </div>
    </section>
  );
}
export default SearchForm;