/* AUTHOR: Joyce Ruobing Zhang */
/* MODULE'S PURPOSE: 
        MessageForm.js provides a form of the login user to edit a new message, and a send button to update the 
        permanent state.
*/

import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { MessageContext } from "./MessageProvider";
import { UserContext } from "../users/UserProvider";
import MyImage from './images/send.png'
import './Message.css'


export const MessageForm = () => {
  const { sendMessage } = useContext(MessageContext)
  const { users, getUsers } = useContext(UserContext)

  const currentUserId = sessionStorage.getItem("nutshell_user")

  const [message, setMessage] = useState({
    recipientId: 0,
    senderId: parseInt(currentUserId),
    title: "",
    message: "",
    timestamp: Date(Date.now())
  });

  const history = useHistory();

  useEffect(() => {getUsers()}, [])


  //Controlled component, handling transient state
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array, always create a copy, make changes, and then set state.*/
    const newMessage = { ...message }
    /* Animal is an object with properties. Set the property to the new value using object bracket notation. */
    newMessage[event.target.id] = event.target.value
    // update state
    setMessage(newMessage)
  }

  const handleSendMessage = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    const recipientId = parseInt(message.recipientId)

    if (recipientId === 0) {
      window.alert("Please select a recipient")
    } else {
      const newMessage = {
        recipientId: parseInt(message.recipientId),
        senderId: parseInt(currentUserId),
        title: message.title,
        message: message.message,
        timestamp: Date(Date.now())
      }
      sendMessage(newMessage)
        .then(() => history.push("/messages"))
    }
  }

  return (
    <form className="messageForm">
      <h6 className="messageForm_title">📝 Write a New Message</h6>

      <fieldset>
        <div className="message-form-group">
          <label htmlFor="name">👤 ：</label>
          <select name="recipientId" id="recipientId" value={message.recipientId} onChange={handleControlledInputChange}>
              <option>choose a recipient</option>
              {
                users.map(u => {return <option key={u.id} value={u.id}>{u.name}</option>})
              }    
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="message-form-group">
          <label htmlFor="name">💬 Message Title:</label>
          <input type="text" id="title" required autoFocus className="form-control" placeholder="Message Title" 
          value={message.title} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="message-form-group">
          <label htmlFor="name">🗒 Message:</label>
          <textarea type="text" id="message" required autoFocus className="form-control" placeholder="Content" 
          value={message.message} onChange={handleControlledInputChange} />
        </div>
      </fieldset>


      <button  className="send" onClick={handleSendMessage}>
        <img className="message-icon" src={MyImage} />
        Send Message
      </button>
    </form>
  )
}