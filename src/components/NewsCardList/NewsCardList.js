import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({isInHomepage, setTooltipOpen}) {
  return (
    // <section className='newsCardList'>
    //   <div className='newsCardList__container'>
    //     <h2 className='newsCardList__title'>Search results</h2>
        <ul className='newsCardList__cards-grid'>
          <NewsCard 
          isInHomepage={isInHomepage}
          setTooltipOpen={setTooltipOpen}/>
          <NewsCard 
          isInHomepage={isInHomepage}
          setTooltipOpen={setTooltipOpen}/>
          <NewsCard 
          isInHomepage={isInHomepage}
          setTooltipOpen={setTooltipOpen}/>
          <NewsCard 
          isInHomepage={isInHomepage}
          setTooltipOpen={setTooltipOpen}/>
          <NewsCard 
          isInHomepage={isInHomepage}
          setTooltipOpen={setTooltipOpen}/>
          <NewsCard 
          isInHomepage={isInHomepage}
          setTooltipOpen={setTooltipOpen}/>
        </ul>
    //     <button className='newsCardList__showMore'>Show more</button>
    //   </div>
    // </section>
  )
}

export default NewsCardList;