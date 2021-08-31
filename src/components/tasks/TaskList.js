/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { TaskContext } from "./TaskProvider"
import "./Task.css"

export const TaskList = () => {
    const {tasks, getTasks} = useContext(TaskContext)
    const history = useHistory()
    const currentUser = (parseInt(sessionStorage.getItem("nutshell_user")))

    useEffect(() => {
        getTasks()
    }, [])
   
    const filteredTasks = tasks.filter(task => task.userId === currentUser)

    return (
        <div className="taskListWrapperDiv">
            <div className="tasks">
                <h2>Tasks</h2>
                {
                    filteredTasks.map(task => {
                        return (
                            <div className="task" key={`taskList=${task.id}`} id={`task--${task.id}`}>
                                 <div className="task__title">
                                    <Link to={`/tasks/detail/${task.id}`}> 
                                        { task.title }
                                    </Link>
                                 </div>
                                 <div className="task__detail">
                                    Details: { task.detail }
                                 </div>
                                 <div className="task__priority">
                                    Priority:  { task.priority }
                                 </div>
                                 <div className="task__status">
                                     Status: { task.status }
                                 </div>
                                 <div className="task__dueDate">
                                     Due Date: { task.dueDate }
                                 </div>
                            </div>
                        )
                    })
                }
                <div className="tasksBtnDiv">
                    <button className="btn btn-primary addTaskBtn" onClick={() => history.push("/tasks/create")}>
                        Add New Task
                    </button>
                </div>
            </div>
        </div>
    ) 
}

