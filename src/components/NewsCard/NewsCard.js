import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { CurrentLocationContext } from "../../contexts/CurrentLocationContext";

function NewsCard({
  data,
  index,
  isLoggedIn,
  handleDifferentPopup,
  savedArticles,
  onSaveArticleClick,
  onDeleteArticleClick,
}) {
  console.log(data, 'cards.data');
  console.log(index, 'cards.index');

  const [isSaved, setIsSaved] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const isInHomepage = useContext(CurrentLocationContext);

  function enterMoouse() {
    setIsShown(true);
  }
  function leaveMoouse() {
    setIsShown(false);
  }
 
  useEffect(() => {
    if (savedArticles) {
      setIsSaved(savedArticles.find((article) => article.title === data.title));
      console.log(savedArticles,"save.newscard");

    }
  }, [data.title, savedArticles]);

  function changeSaveStatus(data) {
    if (isSaved) {
      onDeleteArticleClick(data);
    } else {
      onSaveArticleClick(data);
      console.log(data,'onSaveArticleClick');
    }
    setIsSaved(!isSaved);
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

  return !isInHomepage ? (
   <>
      <button
        className="newsCard__img-icon newsCard__img-delete"
        onMouseEnter={enterMoouse}
        onMouseLeave={leaveMoouse}
        onClick={() => onDeleteArticleClick(data)}
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
          <cite className="newsCard__text-source">{data.source}</cite>
        </div>
      </a>
    </>
  ) : (
    <>
      <button
        onMouseEnter={enterMoouse}
        onMouseLeave={leaveMoouse}
        className={`newsCard__img-icon newsCard__img-save ${isLoggedIn && isSaved ? "newsCard__img-save_active" : ""
          }`}
        onClick={() => {
          if (isLoggedIn) {
            changeSaveStatus(data);
          } else {
            handleDifferentPopup();
          }
        }}
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