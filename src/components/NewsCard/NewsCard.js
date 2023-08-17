import React, { useState } from 'react';
import { useContext } from "react";
import { CurrentLocationContext } from "../../contexts/CurrentLocationContext";
function NewsCard({
  data,
  isLoggedIn,
  savedArticles,
  onSaveArticleClick,
  handleDifferentPopup,
  onDeleteArticleClick
}) {

  // const [Saved, setSaved] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const isInHomepage = useContext(CurrentLocationContext);


  function enterMoouse() {
    setIsShown(true);
  }
  function leaveMoouse() {
    setIsShown(false);
  }
 
// const isSaved = useMemo(() => {
//   console.log(data,"data1");
//    savedArticles.find((article) => article?.title === data?.title)},[savedArticles, data]);
const isSaved = savedArticles.some((article) => article.title === data.title);

function saveArticle(data) {
 if (isLoggedIn) {
  onSaveArticleClick(data);

 }else {
  setIsShown(true);
  handleDifferentPopup();
}
}

function deleteArticle(data) {
  if (isLoggedIn) {
    onDeleteArticleClick(data)
  } else {
    setIsShown(true);
    handleDifferentPopup();
  }
}

  function changeDateFormat() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let articleDate = !isInHomepage ? data.date : data.publishedAt;
    let newDate = new Date(articleDate?.slice(0, 10));
    let changeDateFormat = `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;

    return changeDateFormat;
  }
  const saveButtonClassName = isSaved
  ? 'newsCard__img-icon newsCard__img-save_active'
  : 'newsCard__img-icon newsCard__img-save';

  return !isInHomepage ? (
   <>
      <button
        className="newsCard__img-icon newsCard__img-delete"
        onMouseEnter={enterMoouse}
        onMouseLeave={leaveMoouse}
        onClick={() => deleteArticle(data)}
      ></button>
      {isShown && (<span className="newsCard__tag newsCard__tag_type_tooltip">
        Remove from saved
      </span>)}
      <div className="newsCard__tag newsCard__tag_type_keyword">
        {data.keyword}
      </div>
      <a
        className="newsCard__link"
        href={data.link}
        target="_blank"
        rel="noreferrer"
      >
        <img className="newsCard__image" src={data.image} alt={data.title} />
        <div className="newsCard__text-container">
          <p className="newsCard__text-date">{changeDateFormat()}</p>
          <h3 className="newsCard__text-title">{data.title}</h3>
          <p className="newsCard__text-text">{data.description}</p>
          <cite className="newsCard__text-source">{data.source?.name}</cite>
        </div>
      </a>
    </>
  ) : (
    <>
      <button
        onMouseEnter={enterMoouse}
        onMouseLeave={leaveMoouse}
        
        onClick={() => (isSaved ? deleteArticle(data) : saveArticle(data))}
      className={saveButtonClassName}
      ></button>
      {!isLoggedIn && isShown && (
        <span className="newsCard__tag newsCard__tag_type_tooltip">
          Sign in to save articles
        </span>
      )}
      <a
        className="newsCard__link"
        href={data.url}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="newsCard__image"
          src={data.urlToImage}
          alt={data.title}
        />
      </a>
      <div className="newsCard__text-container">
        <p className="newsCard__text-date">{changeDateFormat()}</p>
        <h2 className="newsCard__text-title">{data.title}</h2>
        <p className="newsCard__text-text">{data.description}</p>
        <p className="newsCard__text-source">{data.source?.name}</p>
      </div>
    </>
  )
}
export default NewsCard;