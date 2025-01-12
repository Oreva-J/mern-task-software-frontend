import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import axios, { Axios } from "axios"
import { toast } from 'react-toastify'
import { URL } from '../App'


const TaskList = () => {
    const [formInput, setFormInput] = useState({ completed: false, name:"" })
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [taskId, setTaskId] = useState("")
    const [completedTask, setCompletedTask] = useState("")
    
    const {name} = formInput
    const handleChange = (e)=>{
      const {name, value} = e.target
      setFormInput({...formInput, [name]:value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (name === "") {
        return toast.error("please fill in your name")
      }
      try {
        await axios.post(`${URL}/api/task`, formInput)
        toast.success("Task Created successfuly")
        setFormInput({...formInput, name:"" })
      } catch (error) {
        console.error(error.message);
        toast.error("Problem creating task")
      }

    }

    const getTask = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${URL}/api/task`)
        console.log(response.data);
        setTasks(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error.message);
        toast.error("could not fetch task")
      }
      
    }

    useEffect(()=>{
      getTask()
    }, [name])

    const deleteTask = async (id) => {
      if (id === "") {
        toast.error("No task to delete")
        console.log("No task to delete: ID was't found"); 
      }
      try {
        await axios.delete(`${URL}/api/task/${id}`)
        toast.success("Successfuly Deleted")
        getTask()
      } catch (error) {
        console.error(error.message);
        toast.error("Delete Failed")
      }      
    }

    const editTask = (task)=>{
      setIsEditing(true)
      setTaskId(task._id)
      setFormInput({ completedTask: false, name: task.name})
    }

    const updateTask = async (e) => {
      e.preventDefault()
      
      if (name === "") {
        return toast.error("Field cannot be empty")
      }

      await axios.put(`${URL}/api/task/${taskId}`, formInput)
      setFormInput({...formInput, name:""})
      setIsEditing(false)
      getTask()

    }

    const setTaskToComplete = async (task) => {
      const newFormInput = {
        name: task.name,
        completedTask: true,
      }
      try {
        await axios.put(`${URL}/api/task/${task._id}`, newFormInput )
        console.log(newFormInput);
        
        toast.success("Completed")
        getTask()
      } catch (error) {
        console.error(error.message);
        
      }
    }

    useEffect(()=>{
      const cTask = tasks.filter((task)=>{
        return (task.completedTask === true)
      })
      setCompletedTask(cTask.length)

    },[tasks])

  return (
    
    <div className='p-10 space-y-5'>
            <h2 className='text-2xl font-semibold'>Task Manager</h2>
            <TaskForm name={name} handleChange={handleChange} handleSubmit={handleSubmit} isEditing={isEditing} updateTask={updateTask} />

            <div className='text-xl font-semibold text-stone-800 flex justify-between'>
                <p>Total Task: { tasks.length } </p>
                <p>Completed Task: {completedTask} </p>
            </div><hr />
            {
              isLoading && (<p>Loading</p>)
            }

            {
              !isLoading && tasks.length === 0? ( <p>No task Added, Please add a task</p> ) : 
              
              (
                tasks.map((task, index)=>{
                  return <Task key={task._id} task={task} index={index} deleteTask={deleteTask} editTask={editTask} setTaskToComplete={setTaskToComplete} />
                })
              )
            }
           
    </div>
  )
}

export default TaskList