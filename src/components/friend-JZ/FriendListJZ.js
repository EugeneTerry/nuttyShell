/* AUTHOR: Joyce Ruobing Zhang */
/* MODULE'S PURPOSE: 
        FriendList.js provides the login user's friend list.  
*/ 


import React, {useContext, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FriendContext } from '../friend-JZ/FriendProviderJZ'
import './FriendJZ.css' 

export const FriendListJZ = () => {
    const {friends, getFriends, removeFriend} = useContext(FriendContext)

    useEffect(() => {getFriends()}, [])

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
   
    const currentUserFriendArr = friends.filter(friend => {
        return friend.currentUserId === currentUserId
    })

    const history = useHistory()
    const handleRemove = (friendId) => {
        removeFriend(friendId).then(() => {history.push("./friends")})
    }

    return (
        <>
        <h5 className="friends-greeting">👋 Hi! It looks like you don't have many friends...</h5>
        <div className="friends">
            {
                currentUserFriendArr.map(friendObj => {
                    return (
                        <div className="friend">
                            <div className="friend-profile"><img className="friend-profile" src={friendObj.user.profileURL} /></div>  
                            <div className="friend-name">{friendObj.user.name}</div>   
                            <button className="remove-friend" onClick={() => handleRemove(friendObj.id)}>Remove</button>
                            <Link className="message-friend" to="/messages/edit">Message</Link>
                        </div>
                    )
                })
            }
        </div>
        </>
    )    
}