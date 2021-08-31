/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react"
import { TaskContext } from "../tasks/TaskProvider"
import { useHistory, useParams } from 'react-router-dom'
import "./Task.css";

export const TaskForm = () => {
    const { addTask, updateTask, getTaskById } = useContext(TaskContext)
    const [task, setTask] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const {taskId} = useParams();
    const history = useHistory();


    const handleControlledInputChange = (event) => {
      const newTask = { ...task }
      newTask[event.target.name] = event.target.value
      setTask(newTask)
    }

    const handleSaveTask = () => {
        setIsLoading(true);
        if (taskId) {
          updateTask({
            id: task.id,
            userId: task.userId,  
            title: task.title,
            detail: task.detail,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate
          })
          .then(() => history.push("/tasks"))
        } else { 
          addTask(
            {
            userId: (parseInt(sessionStorage.getItem("nutshell_user"))),  
            title: task.title,
            detail: task.detail,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate
            }
        ).then(() => history.push("/tasks"))
        }
    }

    useEffect(() => {
      if (taskId) {
        getTaskById(taskId)
        .then(task => {
          setTask(task)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    }, [])

    return (
      <form className="taskForm">
        <h2 className="taskForm__title">Create a New Task</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="taskTitle">Task title: </label>
            <input type="text" id="taskTitle" name="title" required autoFocus className="form-control"
            placeholder="Task title"
            onChange={handleControlledInputChange}
            defaultValue={task.title}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="taskDetail">Task detail: </label>
            <input type="text" id="taskDetail" name="detail" required autoFocus className="form-control"
            placeholder="Task detail"
            onChange={handleControlledInputChange}
            defaultValue={task.detail}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="priority">Set task priority: </label>
            <select value={task.priority} name="priority" id="taskPriority" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select priority level</option>
                <option value="Important">Important</option>
                <option value="Sort of Important">Sort of Important</option>
                <option value="Not Important">Not Important</option>
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="status">Set task status: </label>
            <select value={task.status} name="status" id="taskStatus" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select task status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="taskDueDate">Due date: </label>
            <input type="date" id="taskDueDate" name="dueDate" required autoFocus className="form-control"
            placeholder="Due Date"
            onChange={handleControlledInputChange}
            defaultValue={task.dueDate}/>
          </div>
        </fieldset>
        <button className="btn btn-primary saveBtn"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault()
            handleSaveTask()
          }}> 
          {taskId ? <> Save Task </> : <> Add Task </>}
        </button>
        <button className="btn btn-primary returnBtn" onClick={() => {
                    history.push(`/tasks`)
                }}>
                    Return to All Tasks
        </button>
      </form>
    )
}
