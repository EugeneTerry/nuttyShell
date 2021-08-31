/* AUTHOR: Brittany Garrett 👩🏾‍💻 */
/* MODULE'S PURPOSE: EventList.js provides the entire list of all current events from the API. 
Each event title is a link to view the detail page of that particular event. Event details are included
for easier view. The events are not in order! This module is located at /events/ and houses the create new event button */

import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
// import { EventDetail} from "./EventDetail"
import { useHistory, Link } from 'react-router-dom'
import "./Event.css"

export const EventList = () => {
const { events, getEvents } = useContext(EventContext)
const history = useHistory()

useEffect(() => {
    console.log("EventList: useEffect activated to invoke getEvents which supplies an array for events")
    getEvents()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

return (
    <>

        <div className="eventsDiv_eventList">
            <section className="eventsSection_eventList">
                {
                    events.map(oneEvent => {
                        return (
                            <div className="link_div_eventList" key={`eventLinkDiv_eventList=${oneEvent.id}`}>
                                <Link to={`/events/detail/${oneEvent.id}`} key={oneEvent.id} className="linkName_eventList">
                                    { oneEvent.name }
                                </Link>
                                <div key={`eventLoc_eventList_${oneEvent.id}`} className="eventLoc_eventList eventInfo">
                                    Location: { oneEvent.location}
                                </div>
                                <div key={`eventDate_eventList_${oneEvent.id}`} className="eventDate_eventList eventInfo">
                                    Date: { oneEvent.date}
                                </div>
                                <div key={`eventTime_eventList_${oneEvent.id}`} className="eventTime_eventList eventInfo">
                                   Time: { oneEvent.time}
                                </div>
                                <div key={`eventUserHost_eventList_${oneEvent.id}`} className="eventUserHost_eventList eventInfo">
                                   Hosted by: { oneEvent.user.name }
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </div>

        <div className="eventsBtnDiv">
            <button className="eventBtn" onClick={
                () => history.push("/events/create")
            }>
                Create New Event
            </button>
        </div>
    </>
)

} //end of const EventList

/*

    <div key={`eventLoc_eventList_${oneEvent.id}`} className="eventLoc_eventList eventInfo">
        Location : { oneEvent.location}
    </div>
    <div key={`eventDate_eventList_${oneEvent.id}`} className="eventDate_eventList eventInfo">
        Date: { oneEvent.date}
    </div>
    <div key={`eventTime_eventList_${oneEvent.id}`} className="eventTime_eventList eventInfo">
        Time: { oneEvent.time}
    </div>
*/