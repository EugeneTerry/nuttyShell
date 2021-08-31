/* AUTHOR: Joyce Ruobing Zhang */
/* MODULE'S PURPOSE: 
        MessageDetail.js provides the selected login user's message details (including message titles, 
        message sender, message content, message time). And a delete button. 
*/

import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { MessageContext } from "./MessageProvider" 
import { UserContext } from '../users/UserProvider'
import MyImage from "./images/delete.png"
import "./Message.css"

export const MessageDetail = (props) => {
    const { messages,  getMessages, deleteMessage} = useContext(MessageContext)
    const {users, getUsers} = useContext(UserContext)

    const [message, setMessage] = useState({})

    const { messageId }  = useParams()

    // // define currentUser as an empty obj first. So it will not be undefined.❗️❗️❗️
    // const [currentUser, setCurrentUser] = useState({})
    // define message object first and give it some properties. Then setMessage based on the messageId from useParams().

    const [currentUser, setCurrentUser] = useState({})
    const [sender, setSender] = useState({})

    useEffect(() =>  {
        const thisMessage = messages.find(message => {return message.id === parseInt(messageId)}) || {}
        setMessage(thisMessage)
    }, [messageId, messages])

    useEffect(() => {
        const senderObj = users.find(user => {return user.id === message.senderId}) || {}
        setSender(senderObj)

        const currentUserId = sessionStorage.getItem("nutshell_user")
        const currentUserObj = users.find(user => {return user.id === parseInt(currentUserId)}) || {}
        setCurrentUser(currentUserObj)
    }, [users])

    useEffect(() => {getMessages()}, [])
    useEffect(() => {getUsers()}, [])

    const history = useHistory()
    const handleDelete = () => {
        deleteMessage(messageId).then(() => {history.push("/messages")})
    }

    return (
    <section className="message_container">
        <div className="message_detail">
        <div className="massage-recipient">
            <small>To {currentUser.name}</small>
        </div>
        <div className="massage-title">
            <strong>{message.title}</strong>
        </div>
        <div className="massage-content">
            {message.message}
        </div>
        <div className="massage-timestamp">
            <small>{message.timestamp}</small>
        </div>
        <div className="message-sender">
            <small>From: {sender.name}</small>
        </div>
        <button className="delete" id="message-delete" onClick={handleDelete}>
            <img className="message-icon-delete" src={MyImage} />
        </button>
        </div>
    </section>
    )
}
