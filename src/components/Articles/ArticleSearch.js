import React, { useContext, useEffect } from "react"
import { ArticleContext } from "./ArticleProvider"
import"./Article.css"

export const ArticleSearch =() => {
  const {setSearchTerms} = useContext(ArticleContext)
  
  useEffect(() => {setSearchTerms("")}, []) 

  return (
    <>
      <div className ="articleSearch"> Article Search
        <input type = "text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.currentTarget.value)}
        placeholder="🔍."/>
      </div>
    </>
  )
}