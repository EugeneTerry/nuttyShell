/* AUTHOR: Joyce Ruobing Zhang */
/* MODULE'S PURPOSE: 
       MessageProvider.js provides the MessageContext for the sibling modules.  
*/

import React, {createContext, useState} from 'react'


export const MessageContext = createContext()


export const MessageProvider = (props) => {
    const [messages, setMessages] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const apiURL = "http://localhost:8088"

    const getMessages = () => {
        return fetch(`${apiURL}/messages`)
        .then(res => res.json())
        .then(setMessages)
    }

    const sendMessage = (messageObj) => {
        return fetch(`${apiURL}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
        .then(getMessages)
    }

    const deleteMessage = messageId => {
        return fetch(`${apiURL}/messages/${messageId}`, {
            method: "DELETE"     
        })
        .then(getMessages)
    }
    const markAsUnread = messageId => {
        return fetch(`${apiURL}/messages/${messageId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({read: false})  
        })
        .then(getMessages)
    }

    const markAsRead = messageId => {
        return fetch(`${apiURL}/messages/${messageId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({read: true})  
        })
        .then(getMessages)
    }


    return (
        <MessageContext.Provider value={{messages, getMessages, sendMessage, deleteMessage, markAsRead, markAsUnread, searchTerms, setSearchTerms}}>
            {props.children}
        </MessageContext.Provider>
    )
}