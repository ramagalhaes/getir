import React from 'react'
import './Task.css'
const Task = () => {
  return (
    <section className='item-container flex'>
        <div className='checkbox'>

        </div>
        <div className='task-info'>
          <h3>Title</h3>
          <p>description</p>
        </div>
        <div className='actions'>
            <h2>...</h2>
            <div className='actions-drop flex'>
              <span className='drop-item'>Edit</span>
              <span className='drop-item'>Delete</span>
            </div>
        </div>
    </section>
  )
}

export default Task