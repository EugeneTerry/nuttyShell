/* AUTHOR: Brittany Garrett 👩🏾‍💻 */
/* MODULE'S PURPOSE: EventDetail.js provides the detailed view of one event, as well
as houses the edit button, a create new event button and the return to all events button. 
This module is located at /events/detail/:eventId(\d+) */

import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Event.css"

export const EventDetail = () => {
    const { events, getEvents, deleteEvent } = useContext(EventContext)
    const [oneEvent, setOneEvent] = useState({ user: {} }) //need to reference as empty obj 
    const history = useHistory()
    const { eventId } = useParams()

    useEffect(() => {
        getEvents().then(() => {
            const thisEvent = events.find(e => e.id === parseInt(eventId)) || { user: {} }
            setOneEvent(thisEvent)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId])

    const releaseEvent = () => {
        deleteEvent(oneEvent.id)
        .then(() => {
            history.push("/events")
        })
    }

    return (
        <section className="eventDetailSection">
            <div className="eventDetail_h3">
                <h3 className="name_EventDetail"> {oneEvent.name} </h3>
            </div>

            <div className="all_eventDetail_div">
                <div className="location_EventDetail"> Location: {oneEvent.location} </div>
                <div className="date_EventDetail"> Date: {oneEvent.date} </div>
                <div className="time_EventDetail"> Time: {oneEvent.time} </div>
                <div className="userHost_EventDetail"> Hosted by: {oneEvent.user.name} </div>
            </div> 

            <div className="eventDetailBtnDiv"> 
                <button className="eventBtn" onClick={() => {
                    history.push(`/events/edit/${oneEvent.id}`)
                }}>
                    Edit
                </button>

                <button className="deleteBtn" onClick={releaseEvent}>
                    Delete Event
                </button>

                <button className="eventBtn createBtn" onClick={
                    () => history.push("/events/create")
                }>
                    Create New Event
                </button>

                <button className="eventBtn returnBtn" onClick={() => {
                    history.push(`/events`)
                }}>
                    Return to All Events
                </button>
            </div>
        </section>
    )

} //end of const EventDetail