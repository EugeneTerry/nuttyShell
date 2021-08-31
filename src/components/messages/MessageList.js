/* AUTHOR: Joyce Ruobing Zhang */
/* MODULE'S PURPOSE: 
        MessageList.js provides a table of login user's messages (including message titles, message senders,
        message time, and buttons for updating message read/unread status ).  
*/

import React, {useContext, useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { MessageContext } from './MessageProvider'
import {UserContext} from "../users/UserProvider"
import MyImage from "./images/write.png"
import MyImage1 from './images/people.png'
import MyImage2 from './images/message.png'
import MyImage3 from './images/time.png'
import MyImage4 from './images/read.png'
import "./Message.css"

export const MessageList = () =>{

    const {messages, getMessages, markAsRead, markAsUnread, searchTerms} = useContext(MessageContext)
    const {users, getUsers} = useContext(UserContext)
    const [filteredMessages, setFiltered] = useState([])
    
    useEffect(() => {getMessages()}, [])
    useEffect(() => {getUsers()}, [])

    useEffect(() => {
        if (searchTerms !== "") {
          const subset = messages.filter(message => message.title.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } else {
          setFiltered(messages)
        }
      }, [searchTerms, messages])
    
    const currentUserId = sessionStorage.getItem("nutshell_user")

    const currentUserMessagesArr = filteredMessages.filter(message => {
        return message.recipientId === parseInt(currentUserId)
    })

    const history= useHistory()

    return (
        <>
        <button className="write" id="message-edit">
            <Link to="/messages/edit">
            <img className="message-icon write" src={MyImage} />
            <div className="hide">write a message</div>
            </Link>
        </button>

        <table className="messages">
            <tr>
                <th><img className="message-icon" src={MyImage2} />Message Subject</th>
                <th><img className="message-icon" src={MyImage1} />From</th>
                <th><img className="message-icon" src={MyImage3} />Time</th>
                <th><img className="message-icon status" src={MyImage4} /></th>
            </tr>
                {
                currentUserMessagesArr.map(message => {
                    // 解决 cannot read .name of undefined 的问题❗️❗️❗️
                    const senderObj = users.find(user => {return user.id === message.senderId}) || {}
                    
                    return (
                        <tr className="message" key={messages.id}>
                            <td><Link key={message.id} to={`/messages/detail/${message.id}`}>{message.title}</Link></td>
                            <td>{senderObj.name}</td>
                            <td>{message.timestamp}</td>
                            <td className="read">
                                {message.read? 
                                <button className="mark-as-unread" onClick={() => {markAsUnread(message.id).then(() => history.push("/messages"))}}>✔️</button>: <button className="mark-as-read" onClick={() => {markAsRead(message.id).then(() => history.push("/messages"))}}>🆕</button>}
                            </td>
                        </tr>
                    )
                })
                }
        </table>
        </>
    )
}



