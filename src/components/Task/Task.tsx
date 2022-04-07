import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { TaskModel } from '../../models/TaskModel';
import { openForm, setEditing, startChangeTaskStatus } from '../../store/slices/taskSlice';
import './Task.css'

const Task: React.FC<TaskModel> = ({ id, completed, description, title }) => {

  const dispatch = useDispatch();
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  function switchDropdownVisibility() {
    setIsDropdownVisible(!isDropdownVisible);
  }

  function switchCompletedState() {
    setIsCompleted(!isCompleted);
    if(!isCompleted) {
      dispatch(startChangeTaskStatus({id, completed: true}))
    } else {
      dispatch(startChangeTaskStatus({id, completed: false}))
    }
  }

  function handleEditClick() {
    dispatch(openForm());
    dispatch(setEditing(id));
    setIsDropdownVisible(false)
  }

  return (
    <section className='item-container flex'>
        <div className='checkbox flex' onClick={switchCompletedState}>
          {isCompleted ? <p>{"\u2713"}</p> : false}
        </div>
        <div className='task-info'>
          <h3 style={completed === true ? {textDecoration: 'line-through', opacity: '0.5'} : {}}>{title}</h3>
          <p style={completed === true ? {opacity: '0.5'} : {}}>{description}</p>
        </div>
        <div className='actions'>
            <h2 onClick={switchDropdownVisibility} className="dots-menu">...</h2>
            {isDropdownVisible ? (
              <div className='actions-drop flex'>
                <span className='drop-item' onClick={handleEditClick}>Edit</span>
                <span className='drop-item'>Delete</span>
              </div>
            ) : false}
        </div>
    </section>
  )
}

export default Task