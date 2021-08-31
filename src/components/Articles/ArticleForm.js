/* AUTHOR: Eugene Terry */
/* PURPOSE: Provides the format of how the user will input the data into the api
*/

import React, { useContext, useEffect, useState } from "react";
import { ArticleContext } from "./ArticleProvider";
import { useHistory, useParams } from "react-router-dom";
import "./Article.css";
import { UserContext } from "../users/UserProvider";

export const ArticleForm = () => {
  const { users, getUsers } = useContext(UserContext);
  const { addArticle, updateArticle, getArticleById } =
    useContext(ArticleContext);

  const [article, setArticle] = useState({
    title: "",
    userId: 0,
    url: "",
    synopsis: "",
    timestamp: "",
  });

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const { articleId } = useParams();

  const handleControlledInputChange = (event) => {
    const newArticle = { ...article };
    newArticle[event.target.id] = event.target.value;
    setArticle(newArticle);
  };

  const handleClickSaveArticle = (event) => {
    const userId = parseInt(article.userId);
    const d = new Date();
    const dateInput = `${d.getMonth() + 1}/${
      d.getDate() + 1
    }/${d.getFullYear()} ${d.toLocaleTimeString()}`;

    if (
      userId === 0 ||
      article.title === "" ||
      article.url === "" ||
      article.synopsis === ""
    ) {
      window.alert("Please enter an article, title, url and synopsis please");
    } else {
      setIsLoading(true);
      if (article.id) {
        updateArticle({
          id: article.id,
          userId,
          title: article.title,
          url: article.url,
          synopsis: article.synopsis,
          timestamp: dateInput,
        }).then(() => history.push(`/articles/detail/${article.id}`));
      } else {
        addArticle({
          userId: article.userId,
          title: article.title,
          url: article.url,
          synopsis: article.synopsis,
          timestamp: dateInput,
        }).then(() => history.push("/articles"));
      }
    }
  };
  useEffect(() => {
    getUsers().then(() => {
      if (articleId) {
        getArticleById(articleId).then((article) => {
          setArticle(article);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <form className="articleSecList">
      <h2 className="articleForm__title">New Article</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title"> Article Title: </label>
          <input
            type="text"
            id="title"
            required
            autoFocus
            className="form-control"
            placeholder="Article title"
            value={article.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="userId" className="label__articleForm">
            {" "}
            Posted By:{" "}
          </label>
          <select
            name="userId"
            id="userId"
            className="form-control"
            value={article.userId}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="url"> Article URL: </label>
          <input
            type="text"
            id="url"
            required
            autoFocus
            className="form-control"
            placeholder="Article url"
            value={article.url}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="synopsis"> Article Synopsis: </label>
          <input
            type="text"
            id="synopsis"
            required
            autoFocus
            className="form-control"
            placeholder="Article synopsis"
            value={article.synopsis}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <div className="articleFormBtn">
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={(event) => {
            event.preventDefault();
            handleClickSaveArticle();
          }}
        >
          {articleId ? <> Save Article </> : <> Add Article </>}
        </button>

        <button
          className="btn btn-primary returnBtn"
          onClick={() => {
            history.push(`/articles`);
          }}
        >
          Back to Articles
        </button>
      </div>
    </form>
  );
};
