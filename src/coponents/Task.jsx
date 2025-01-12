import React from 'react'
import { FaCheckDouble, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'

const Task = ({task, index, deleteTask, editTask, setTaskToComplete,}) => {
  return (
    <div className={`inline-flex justify-between items-center px-5 bg-slate-200 w-full h-10 border-l-4 ${ task.completedTask ? "border-green-500" : 'border-red-500'} `}>
        <div>
            <span>{index +1}. </span>
            <span> {task.name}</span>
        </div>
        <div className='flex space-x-5  '>
            <FaCheckDouble onClick={()=>setTaskToComplete(task)} className="text-green-500 hover:scale-125 " />
            <FaRegEdit onClick={()=> editTask(task)} className="text-purple-700 hover:scale-125 "  />
            <RiDeleteBin6Line onClick={()=>deleteTask(task._id)} className="text-red-500 hover:scale-125" />
        </div>
    </div>
  )
}

export default Task