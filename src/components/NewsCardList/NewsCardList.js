import NewsCard from '../NewsCard/NewsCard';

function NewsCardList() {
  return (
    // <section className='newsCardList'>
    //   <div className='newsCardList__container'>
    //     <h2 className='newsCardList__title'>Search results</h2>
        <ul className='newsCardList__cards-grid'>
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </ul>
    //     <button className='newsCardList__showMore'>Show more</button>
    //   </div>
    // </section>
  )
}

export default NewsCardList;