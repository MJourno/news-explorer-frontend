function SavedNewsHeader() {
  return (
    <section className="savedNewsHeader">
      <div className="savedNewsHeader__container">
      <h4 className="savedNewsHeader__title">Saved articles</h4>
      <h3 className="savedNewsHeader__text">Elise, you have 5 saved<br />articles</h3>
      <p className="savedNewsHeader__byKey">By keywords:
        <b> Nature, Yellowstone, and 2 other</b>
      </p>
      </div>
    </section>
  )
}
export default SavedNewsHeader;