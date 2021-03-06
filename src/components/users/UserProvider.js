

/* hello there
we are the best group here so fear us!!!*/


import React, {createContext, useState} from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const apiURL = "http://localhost:8088"
    
    const getUsers = () => {
        return fetch(`${apiURL}/users`)
        .then(res => res.json())
        .then(setUsers)
    }

    return (
        <UserContext.Provider value={{users, getUsers}}>
            {props.children}
        </UserContext.Provider>
    )
}