import React, { useState } from "react";

function SearchForm({
  searchKeyword,
  setSearchKeyword,
  onSearch
}) {
  const [formInputValue, setFormInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter topic");

  function handleChange(e) {
    setSearchKeyword(e.target.value);
    setFormInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formInputValue) {
      setPlaceholder("Please enter text");
    } else {
      onSearch(searchKeyword);
    }
  }
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
          <input
            placeholder={placeholder}
            value={formInputValue}
            onChange={handleChange}
            type='text'
            className="search-bar__input"
          />
          <button
            onClick={handleSubmit}
            type="submit" className="search-bar__button">Search</button>
        </form >
      </div>
    </section>
  );
}
export default SearchForm;