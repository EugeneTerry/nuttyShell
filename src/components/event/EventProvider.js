/* AUTHOR: Brittany Garrett 👩🏾‍💻 */
/* MODULE'S PURPOSE: EventProvider.js provides the EventContext for the sibling 
modules. This module exports information retrieved from the API including the 
fetch calls for getEvents, addEvent, getEventById, and updateEvent. */

import React, { createContext, useState } from "react"


const apiURL = "http://localhost:8088"

export const EventContext = createContext()

export const EventProvider = (props) => {
    const [ events, setEvents ] = useState([])

    const getEvents = () => {
        return fetch(`${apiURL}/events?_expand=user`)
            .then(res => res.json())
            .then(setEvents)
    }

    const addEvent = (newEvent) => {
        return fetch((`${apiURL}/events`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        })
            .then(getEvents)
    }

    const getEventById = (eventId) => {
        return fetch(`${apiURL}/events/${eventId}`)
        .then(res => res.json())
    }


    const updateEvent = eventToUpdate => {
        return fetch((`${apiURL}/events/${eventToUpdate.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToUpdate)
        })
            .then(getEvents)
    }

    const deleteEvent = (eventId) => {
        return fetch((`${apiURL}/events/${eventId}`), {
            method: "DELETE"
        })
        .then(getEvents)
    }

    return (
        <EventContext.Provider value={
            { events, getEvents, addEvent, updateEvent, getEventById, deleteEvent }
        }>
            { props.children }
        </EventContext.Provider>
    )
} //end of const EventContext

