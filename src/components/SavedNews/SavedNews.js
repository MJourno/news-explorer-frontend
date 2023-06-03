import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({isInHomepage, setTooltipOpen}) {
  return (
    <section className="savedNews">
      <NewsCardList
      isInHomepage={isInHomepage}
      setTooltipOpen={setTooltipOpen}
      />
    </section>
  )
}
export default SavedNews;