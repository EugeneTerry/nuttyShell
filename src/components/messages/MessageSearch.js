/* AUTHOR: Joyce Ruobing Zhang */
/* MODULE'S PURPOSE: 
        MessageSearch.js provides a message title search function.
*/

import React, { useContext, useEffect } from "react"
import { MessageContext } from "./MessageProvider"
import "./Message.css"


export const MessageSearch = () => {
  const { setSearchTerms } = useContext(MessageContext)

  useEffect(() => {setSearchTerms("")}, []) 

  return (
    <>
    <div className="search">
      🔍 Message search:
      <input type="text" className="input--wide" onKeyUp={(event) => setSearchTerms(event.target.value)} placeholder="Search for an message... " />
    </div>
    </>
  )
}