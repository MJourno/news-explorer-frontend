import React, { useState } from 'react';
import normalTrash from '../../images/trash._normal.svg';
import hoverTrash from '../../images/trash_hover.svg';
import normalBookMark from '../../images/bookmark_normal.svg';
import hoverBookMark from '../../images/bookmark_hover.svg';
import markedBookMark from '../../images/bookmark_marked.png';

function NewsCard({ isInHomepage }) {
  const [isShown, setIsShown] = useState(false);

  function enterMoouse() {
    setIsShown(true);
  }
  function leaveMoouse() {
    setIsShown(false);
  }

  return (
    <li className='newsCard'>
      <div className='NewsCard__img'>
        <div className='NewsCard__img-container'>
          <button className='newsCard__keyword-button'>Nature</button>
          <div className="NewsCard__button-container">
            {
              isShown && (<span className="newsCard__tooltip">{isInHomepage ? 'Remove from saved' : 'Sign in to save articles'}</span>)
            }
            {
              isInHomepage ?
                <button
                  className='newsCard__img-icon newsCard__img-delete'
                  onMouseEnter={enterMoouse}
                  onMouseLeave={leaveMoouse}
                >
                  <img src={normalTrash} alt="Remove from saved" />
                </button>
                :
                <button
                  className='newsCard__img-icon newsCard__img-delete'
                  onMouseEnter={enterMoouse}
                  onMouseLeave={leaveMoouse}
                >
                  <img src={normalBookMark} alt="Sign in to save articles" />
                </button>

            }

          </div>


          {/* <button className="newsCard__img-icon newsCard__img-save"> */}
          {/* <img src={normalBookMark} alt="Sign in to save articles"/> */}
          {/* </button> */}
          {/* <span className="newsCard__tooltip">Sign in to save articles</span> */}
        </div>
      </div>
      <div className="NewsCard__text-container">
        <p className="NewsCard__text-date">November 4, 2020</p>
        <h3 className="NewsCard__text-title">Everyone Needs a Special 'Sit Spot' in Nature</h3>
        <p className="NewsCard__text-text">Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...</p>
        <cite className="NewsCard__text-source">treehugger</cite>
      </div>
    </li>
  )
}
export default NewsCard;