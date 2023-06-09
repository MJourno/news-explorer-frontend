import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({isInHomepage, setTooltipOpen}) {
  console.log(isInHomepage,'SavedNews');

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