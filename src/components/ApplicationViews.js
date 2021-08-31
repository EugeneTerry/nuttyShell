import React from "react"
import { Route } from "react-router-dom"

import { ArticleProvider } from "./Articles/ArticleProvider"
import { ArticleList } from "./Articles/ArticleList"
import { ArticleForm } from "./Articles/ArticleForm"
import { ArticleDetail } from "./Articles/ArticleDetails"
import { ArticleSearch } from "./Articles/ArticleSearch"
import { UserProvider } from "./users/UserProvider"

import { MessageDetail } from "./messages/MessageDetail"
import { MessageList } from "./messages/MessageList"
import { MessageProvider } from "./messages/MessageProvider"
import { MessageForm } from "./messages/MessageForm"
import { MessageSearch } from "./messages/MessageSearch"

import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"
import { EventDetail } from "./event/EventDetail"
import { EventForm } from "./event/EventForm"

import {FriendProviderJZ} from './friend-JZ/FriendProviderJZ'
import { FriendListJZ } from "./friend-JZ/FriendListJZ"

import { TaskProvider } from "./tasks/TaskProvider"
import { TaskList } from "./tasks/TaskList"
import { TaskForm } from "./tasks/TaskForm"
import { TaskDetail } from "./tasks/TaskDetail"



export const ApplicationViews = () => {
  return (
    <>
    
    <UserProvider>
    <ArticleProvider>
    <Route exact path="/">
        <ArticleList/>
      </Route>
      <Route exact path="/articles">
        <ArticleSearch/>
        <ArticleList/>
      </Route>
      <Route exact path="/articles/create">
        <ArticleForm/>
      </Route>
      <Route exact path="/articles/edit/:articleId(\d+)">
        <ArticleForm/>
      </Route>
      <Route exact path="/articles/detail/:articleId(\d+)">
        <ArticleDetail/>
      </Route>
    </ArticleProvider>
    </UserProvider>


      {/* <UserProvider>
        <FriendProvider>
          <Route exact path="/friends">
            <div className="friendListWrapper">
              <FriendList />
            </div>
          </Route>
        </FriendProvider>
      </UserProvider> */}


      <EventProvider>
        <UserProvider>
          {/* EVENTS MAIN LIST */}
          {/* Render the component for the user's events */}
          <Route exact path="/events">
            <div className="eventListWrapperDiv">
              <div className="EventsMainDiv">
                <h2>Events</h2>
              </div>
              <EventList />
            </div>
          </Route>

          {/* EVENT CREATE PAGE */}
          {/* Render the component for the create an event page */}
          <Route path="/events/create">
            <form className="eventForm">
              <div className="h2_form_div">
                <h2 className="eventForm__title"> Create New Event</h2>
              </div>
              <EventForm />
            </form>
          </Route>

          {/* EVENT DETAIL PAGE */}
          {/* Render the component for the user one event */}
          <Route path="/events/detail/:eventId(\d+)">
            <EventDetail />
          </Route>

          {/* EVENT EDIT PAGE */}
          {/* Render the component to edit an event page */}
          <Route path="/events/edit/:eventId(\d+)">
            <form className="eventForm">
              <div className="h2_form_div">
                <h2 className="eventForm__title"> Edit Current Event</h2>
              </div>
              <EventForm />
            </form>
          </Route>
        </UserProvider>
      </EventProvider>

      <TaskProvider>
        <Route exact path="/tasks">
           <TaskList />
        </Route>

        <Route path="/tasks/create">
          <TaskForm/>
        </Route>

        <Route path="/tasks/detail/:taskId(\d+)">
          <TaskDetail/>
        </Route>

        <Route path="/tasks/detail/edit/:taskId(\d+)">
          <TaskForm/>
        </Route>
      </TaskProvider>

      <Route exact path="/messages">
        {/* Render the component for the messages */}
        <UserProvider>
          <MessageProvider>
            <MessageSearch />
            <MessageList />
          </MessageProvider>
        </UserProvider>
      </Route>

      <Route path="/messages/detail/:messageId(\d+)">
        <UserProvider>
          <MessageProvider>
            <MessageDetail />
          </MessageProvider>
        </UserProvider>
      </Route>

      <Route path="/messages/edit">
        <UserProvider>
          <MessageProvider>
            <MessageForm />
          </MessageProvider>
        </UserProvider>
      </Route>

      <FriendProviderJZ>
          <Route exact path="/friends">
              <FriendListJZ />
          </Route>
      </FriendProviderJZ>     

    </>
  )
}
