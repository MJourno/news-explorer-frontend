import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function SavedNewsHeader({ savedArticles }) {

  const currentUser = useContext(CurrentUserContext);
  const [keywordArray, setKeywordArray] = useState([]);

  useEffect(() => {
    // Taking keywords from article objects
    const allKeywordsArray = savedArticles.map((value) => value.keyword);

    allKeywordsArray.map(
      (keyword) => keyword.charAt(0).toUpperCase() + keyword.substr(1)
    );

    // Counting the occurrence of each keyword inside the array
    var countKeywords = allKeywordsArray.reduce(function (keyword, value) {
      keyword[value] = (keyword[value] || 0) + 1;
      return keyword;
    }, {});

    // Sorting the keywords by the occurrence
    var sortedArray = Object.keys(countKeywords).sort(function (a, b) {
      return countKeywords[b] - countKeywords[a];
    });
    setKeywordArray(sortedArray);
  }, [savedArticles]);

  return (
    <section className="savedNewsHeader">
      <div className="savedNewsHeader__container">
        <h4 className="savedNewsHeader__title">Saved articles</h4>
        <h3 className="savedNewsHeader__text">{currentUser.name}, you have {savedArticles.length} saved<br />articles</h3>
        <p className="savedNewsHeader__byKey">By keywords:{" "}
          <b> {keywordArray.length > 3
            ? `${keywordArray[0]}, ${keywordArray[1]}, and ${keywordArray.length - 2
            } others`
            : keywordArray.join(", ")}</b>
        </p>
      </div>
    </section>
  )
}
export default SavedNewsHeader;