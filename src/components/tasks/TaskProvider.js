import React, { useState, createContext } from "react"

export const TaskContext = createContext()

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([])
    // const [] = useState('')
   
    const getTasks = () => {
        return fetch('http://localhost:8088/tasks')
        .then(res => res.json())
        .then(setTasks)
    }

    const getTasksByUserId = (userId) => {
        return fetch(`http://localhost:8088/tasks/${userId}`)
        .then(res => res.json())
    }

    const addTask = task => {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
    }

    const updateTask = taskToUpdate => {
        return fetch((`http://localhost:8088/tasks/${taskToUpdate.id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskToUpdate)
        })
            .then(getTasks)
    }

    const getTaskById = (taskId) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`)
        .then(res => res.json())
    }

    const deleteTask = (taskId) => {
        return fetch((`http://localhost:8088/tasks/${taskId}`), {
            method: "DELETE"
        })
        .then(getTasks)
    }


    return (
        <TaskContext.Provider value={{
            tasks, getTasks, addTask, getTasksByUserId, updateTask, getTaskById, deleteTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}


