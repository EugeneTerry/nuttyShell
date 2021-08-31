/* AUTHOR: Brittany Garrett 👩🏾‍💻 */
/* MODULE'S PURPOSE: EventForm.js provides the form fieldsets and capture components for a 
new event. On the frontend, the user can select themselves as the host and/or select a host, 
input an event name, event date, event time and event location. On the backend, the timestamp 
of the event creation is captured. This module houses the add event button and the return to 
all events button. This module is located at /events/create/:eventId(\d+). If the user
selects to edit a current event, the information will be prepopulated and available for edits
and changes however, the timestamp of initial creation cannot be changed. The timestamp will 
remain within the API within that event object as a permanent key/value. The edit current event
view will also include a save event button (instead of add event button) and a return to all events
button. A selected current event will be located at /events/detail/:eventId(\d+) */

import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Event.css"
import { UserContext } from "../users/UserProvider"

export const EventForm = () => {
    const { users, getUsers } = useContext(UserContext)
    const { addEvent, updateEvent, getEventById } = useContext(EventContext)

    const [oneEvent, setOneEvent] = useState({
        userId: 0,
        location: "",
        date: "",
        time: "",
        timestamp: ""
    })

    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    const { eventId } = useParams()

    const handleControlledInputChange = (e) => {
        const newEvent = { ...oneEvent }
        newEvent[e.target.id] = e.target.value
        setOneEvent(newEvent)
    }

    const handleClickSaveEvent = (e) => {
        const userId = parseInt(oneEvent.userId)
        const eventCreationDate = Date(Date.now()).slice(0, 15)
        if (userId === 0 || oneEvent.name === "" || oneEvent.location === "" || oneEvent.date === "" || oneEvent.time === "") {
            window.alert("Please enter an event name, location, date and time")
        } else { 
            setIsLoading(true) 
            if (oneEvent.id) { 
                
                updateEvent({ 
                    id: oneEvent.id,
                    userId: userId,
                    name: oneEvent.name,
                    location: oneEvent.location,
                    date: oneEvent.date,
                    time: oneEvent.time,
                    timestamp: eventCreationDate
                })
                    .then(() => history.push(`/events/detail/${oneEvent.id}`))
            } else {
                addEvent({
                    userId: userId,
                    name: oneEvent.name,
                    location: oneEvent.location,
                    date: oneEvent.date,
                    time: oneEvent.time,
                    timestamp: eventCreationDate

                })
                    .then(() => history.push("/events"))
            }
        }
    }

    useEffect(() => {
        //need getUsers() to be invoked
        getUsers().then(() => {
            if (eventId) {
                getEventById(eventId)
                    .then(oneEvent => {
                        setOneEvent(oneEvent)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
       <>
            <div className="fieldsetsDivEventForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="userId" className="label__eventForm">Hosted by: </label>
                        <select name="userId" id="userId" className="form-control" value={oneEvent.userId} onChange={handleControlledInputChange}>
                            <option value="0">Select a host</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name" className="label__eventForm">Event name: </label>
                        <input type="text" id="name" required autoFocus className="form-control input__eventForm" placeholder="Event name" value={oneEvent.name} onChange={handleControlledInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="location" className="label__eventForm">Event location: </label>
                        <input type="text" id="location" required className="form-control input__eventForm" placeholder="Event location" value={oneEvent.location} onChange={handleControlledInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date" className="label__eventForm">Event date: </label>
                        <input type="text" id="date" required className="form-control input__eventForm" placeholder="Event date" value={oneEvent.date} onChange={handleControlledInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="time" className="label__eventForm">Event time: </label>
                        <input type="text" id="time" required className="form-control input__eventForm" placeholder="Event time and time zone" value={oneEvent.time} onChange={handleControlledInputChange} />
                    </div>
                </fieldset>
            </div>

            <div className="eventFormBtnDiv">
                <button className="eventBtn"
                    disabled={isLoading}
                    onClick={e => {
                        e.preventDefault()
                        handleClickSaveEvent()
                    }}>
                    {eventId ? <> Save Event </> : <> Add Event </>}
                </button>

                <button className="eventBtn returnBtn" onClick={() => {
                    history.push(`/events`)
                }}>
                    Return to All Events
                </button>
            </div>
        </>

    )


} // end of EventForm