/* AUTHOR: Joyce Ruobing Zhang */
/* MODULE'S PURPOSE: 
        FriendProvider.js provides the FriendContext for the sibling modules.  
*/

import React, { createContext, useState } from "react"


export const FriendContext = createContext()

const apiURL = "http://localhost:8088"

export const FriendProviderJZ = (props) => {
    const [friends, setFriends ] = useState([])
    
    const getFriends = () => {
        return fetch(`${apiURL}/friends?_expand=user`)
            .then(res => res.json())
            .then(setFriends)
    }

    const removeFriend = (friendId) => {
        return fetch(`${apiURL}/friends/${friendId}`, {method: "DELETE"} )
        .then(getFriends)
    }

    return (
        <FriendContext.Provider value={
            { friends, getFriends, removeFriend }
        }>
            {props.children}
        </FriendContext.Provider>
    )
} 

