/* AUTHOR: Eugene Terry */
/* PURPOSE: Provides the connections to the api from the user such as grabbing, updating and deleting data from the api.
*/

import React, { useState, createContext } from "react";

export const ArticleContext = createContext();

export const ArticleProvider = (props) => {
  const [articles, setArticles] = useState([]);
  const [searchTerms, setSearchTerms] = useState("")
  const apiURL = "http://localhost:8088"

  const getArticles = () => {
    return fetch(`${apiURL}/articles?_expand=user`)
      .then((res) => res.json())
      .then(setArticles);
  };

  const getArticleById = (articleId) => {
    return fetch(`${apiURL}/articles/${articleId}`)
    .then((res) => res.json())
  }

  const addArticle = (articleObj) => {
    return fetch(`${apiURL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleObj),
    })
      .then((response) => response.json())
      .then(getArticles);
  };

  const updateArticle = article =>{
    return fetch(`${apiURL}/articles/${article.id}`, {
      method: "PUT",
      headers: {
        "content-Type" : "application/json"
      },
      body: JSON.stringify(article)
    })
    .then(getArticles)
  }

  const deleteArticles = articleId => {
    return fetch(`${apiURL}/articles/${articleId}`, {
      method: "DELETE"
    })
      .then(getArticles)
  }
  return (
    <ArticleContext.Provider
      value={{
        articles,
        getArticles,
        addArticle,
        getArticleById,
        deleteArticles,
        updateArticle,
        searchTerms,
        setSearchTerms
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};
