/* AUTHOR: Eugene Terry */
/* PURPOSE: Provides the output of the data so the user can see it. It also provides the button to post new article. 
*/

import React, { useContext, useEffect, useState } from "react";
import { ArticleContext } from "./ArticleProvider";
import "./Article.css";
import { useHistory, Link } from "react-router-dom";

export const ArticleList = () => {
  const { articles, getArticles, searchTerms } = useContext(ArticleContext);
  const [filteredArticles, setFiltered] = useState ([])
  const history = useHistory();
  
  useEffect(() => {
    getArticles();
  }, [])



  const {setSearchTerms} = useContext(ArticleContext)
  
  useEffect(() => {setSearchTerms("")}, [])




  useEffect(() => {
    if(searchTerms !=="") {
      const subset = articles.filter(article => article.title.toLowerCase().includes(searchTerms.toLowerCase()) || article.synopsis.toLowerCase().includes(searchTerms.toLowerCase()))
      setFiltered(subset)
    } else {
      setFiltered(articles)
    }
    }, [searchTerms, articles])

  return (
    <>
      <div className="articleDivList">
        <section className="articleSecList">
          
          <div className ="articleSearch">Articles  
            <input type = "text"
            className="input--wide"
            onKeyUp={(event) => setSearchTerms(event.currentTarget.value)}
            placeholder="🔍"/>
          </div>

          {filteredArticles.map((article) => {
            return (
              <div
                className="linkDivArticleList"
                key={`articleDivList=${article.id}`}
              >
                <Link to={`/articles/detail/${article.id}`}
                  key={article.id}
                  className="linkTitleArticleList"
                >
                  Title: {article.title}
                </Link>
                <div
                  key={`articleLinkList_${article.id}`}
                  className="articleLinkListInfo"
                >
                  <a href = {article.url}><b>Link</b></a>
                </div>
                <div
                  key={`articlePostList_${article.id}`}
                  className="articlePostListInfo"
                >
                  Posted by: {article.user.name}
                </div>
                <div
                  key={`articleSynopsisList__${article.id}`}
                  className="articleSynopsisListInfo"
                >
                  Synopsis: {article.synopsis}
                </div>
                <div
                  key={`articleDateList_${article.id}`}
                  className="articleDateListInfo"
                >
                  Time: {article.timestamp}
                </div>
              </div>
            );
          })}
        <button
          className="articlesBtn"
          onClick={() => history.push("/articles/create")}
        >
          Post New Article
        </button>
        </section>
      </div>

      <div className="articlesBtnDiv">
        
      </div>
    </>
  );
}
