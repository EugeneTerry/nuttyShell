/* AUTHOR: Eugene Terry */
/* PURPOSE: Provides the details used to populate the list. It also houses all of the buttons associated with editing the articles. 
*/

import React, { useContext, useEffect, useState } from "react";
import { ArticleContext } from "./ArticleProvider"; 
import "./Article.css";
import { useParams, useHistory } from "react-router-dom";

export const ArticleDetail = () => {
  const { articles, getArticles, deleteArticles} = useContext(ArticleContext)
  const [article, setArticle] = useState({user:{}})
  const {articleId} = useParams();

  const history = useHistory()

  useEffect(() => {
    getArticles().then(() =>{
      const thisArticle = articles.find((a) => a.id === parseInt(articleId)) || {
      user: {},
    };
    setArticle(thisArticle);
  }) 
  }, [articleId]);

  const handleRelease = () => {
    deleteArticles(article.id)
    .then(()=> {
      history.push("/articles")
    })
  }

  useEffect(() => {
    if(article) {
      setArticle(article)
    } else {
      const thisArticle = articles.find((a) =>a.id === parseInt(articleId)) || {
        userId: {}
      }
      setArticle(thisArticle)
    }

  }, [articleId])

  useEffect(() => {getArticles()}, [])

  return (
    
      <section className="articleSecList">
        <h3 className="articleDetail__title">{article.title}</h3>
        <div className="articleDetail__url"><a href = {article.url}><b>Link</b></a></div>
        <div className="articleDetail__synopsis">Synopsis: {article.synopsis}</div>
        <div className="articleDetail__user">Posted by: {article.user.name}</div>
        <div className="articleDetail__time">On:  {article.timestamp}</div>
        <div className="articleDetailBtn">
          <button className="articleEditBtn" onClick={()=>
          {
            history.push(`/articles/edit/${article.id}`)
          }}>
            Edit
          </button>
          <button className="deleteBtn" onClick = {handleRelease}>
            Delete Article
          </button>
          <button className="articleCreateBtn" onClick={()=>
          {
            history.push("/articles/create/")
          }}>
            New Article
          </button>
          <button className="articlesBtn" onClick={()=>
          {
            history.push("/articles")
          }}>
            Articles
          </button>

        </div>
        
      </section>
    
  )
}