import React from 'react'

const TaskForm = ({handleChange, handleSubmit, name, isEditing, updateTask}) => {
  return (
    <form onSubmit={ isEditing ? updateTask : handleSubmit} 
    className='py-5 w-full inline-flex '>
        <input onChange={handleChange} value={name} name='name' type="text" placeholder='Add a Task'  
        className='w-full h-9 outline outline-1 outline-blue-300 focus:outline-blue-800  ' />
        
        <button type='submit' 
        className='bg-purple-700 text-white h-9 w-20 '>{ isEditing? 'Edit' : 'Add' }</button>
    </form>
  )
}

export default TaskForm