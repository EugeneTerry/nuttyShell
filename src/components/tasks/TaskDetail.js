import React, { useContext, useEffect, useState } from "react"
import { TaskContext } from "./TaskProvider"
import { useParams, useHistory } from "react-router-dom"
import "./Task.css"

export const TaskDetail = () => {
    const { tasks, getTasks, deleteTask } = useContext(TaskContext)
    const [oneTask, setOneTask] = useState({})
    const history = useHistory()

    const { taskId } = useParams()

    useEffect(() => {
        getTasks().then(() => {
            const thisTask = tasks.find(t => t.id === parseInt(taskId))
            setOneTask(thisTask)
        })
    }, [getTasks, taskId, tasks])

    const releaseEvent = () => {
        deleteTask(oneTask.id)
        .then(() => {
            history.push("/tasks")
        })
    }

    return (
    <section className="taskDetail">
        <h3 className="task__title">{ oneTask.title }</h3>
        <div className="task__details">Details: { oneTask.detail }</div>
        <div className="task__priority">Priority: { oneTask.priority }</div>
        <div className="task__status">Status: { oneTask.status }</div>
        <div className="task__dueDate">Due Date: { oneTask.dueDate } </div>
        <div className="tasksBtnDiv"> 
            <button className="btn btn-primary returnBtn" onClick={() => {
                history.push(`/tasks`)
                }}>
                Return to All Tasks
            </button >
            <button className="btn btn-primary editBtn" onClick={() => {history.push(`/tasks/detail/edit/${oneTask.id}`)}}>
                Edit Task
            </button>
            <button className="btn btn-primary deleteBtn" onClick={releaseEvent}>
                Delete Task
            </button>
        </div>
    </section>
    )
}
