import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuidv4';
import Task from '../../components/Task/Task';
import { TaskModel } from '../../models/TaskModel';
import {
  closeForm,
  openForm,
  setInserting,
  startAddTask,
  startEditTask,
  startTasksFetch
} from '../../store/slices/taskSlice';
import { months } from '../../utils/utils';
import './Home.css';

const Home: React.FC<any> = () => {
  const store = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const date = new Date();

  useEffect(() => {
    dispatch(startTasksFetch());
  }, [dispatch]);

  function handleAddBtnClick() {
    if (store.showForm === false) {
      dispatch(setInserting());
      dispatch(openForm());
    } else {
      dispatch(closeForm());
    }
  }

  function handleSaveClick() {
    let id = uuid();
    if (store.action === 'update') {
      id = store.taskId;
    }
    const payload = {
      id: id,
      title: newTitle,
      description: newDescription,
      completed: false
    };
    dispatch(
      store.action === 'insert' ? startAddTask(payload) : startEditTask(payload)
    );
    dispatch(closeForm());
    setNewTitle('');
    setNewDescription('');
  }

  return (
    <main className="full-screen container">
      <section className="card flex">
        <header className="card-header flex">
          <div className="content-container flex">
            <div className="main-info flex">
              <span className="title">
                <h1>My</h1>
                <h1>Tasks</h1>
              </span>
              <div className="todo-summary flex">
                <span className="status-counter flex">
                  <div className="h3-bg flex">
                    <h3>{store.completedTasks}</h3>
                  </div>
                  <p>done</p>
                </span>
                <span className="status-counter flex">
                  <div className="h3-bg flex">
                    <h3>{store.tasks.length - store.completedTasks}</h3>
                  </div>
                  <p>to do</p>
                </span>
              </div>
            </div>
            <div className="teste flex">
              <p>
                {months[date.getMonth()] +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear()}
              </p>
              <p>
                { ((store.completedTasks * 100) / store.tasks.length)|| 0 }% completed
              </p>
            </div>
          </div>
          <div className="aditional-info"></div>
        </header>
        <div className="todo-container">
          <div className="content-container flex">
            <span className="menu flex">
              <h4>Inbox</h4>
              <button onClick={handleAddBtnClick} className="add-btn">
                add task
              </button>
            </span>
            {store.showForm && !store.loading ? (
              <section className="add-drop flex">
                <input
                  type="text"
                  placeholder="Title"
                  aria-label="Title"
                  value={newTitle}
                  onChange={(event) => {
                    setNewTitle(event.target.value);
                  }}
                />
                <span className="flex description-input">
                  <input
                    type="text"
                    placeholder="Description"
                    aria-label="Description"
                    value={newDescription}
                    onChange={(event) => {
                      setNewDescription(event.target.value);
                    }}
                  />
                  <button onClick={handleSaveClick}>save</button>
                </span>
              </section>
            ) : (
              false
            )}
            <div className="todo-list">
              {store?.tasks.map((task: TaskModel) => (
                <Task
                  key={task.id}
                  id={task.id}
                  completed={task.completed}
                  description={task.description}
                  title={task.title}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SNACKBAR */}
      {store.showDialogSnack ? (
        <div
          className="flex snack"
          style={{
            background:
              store.dialog.type === 'success' ? '#65fa8a' : 'rgb(240 98 146)'
          }}
        >
          <p>{store.dialog.message}</p>
        </div>
      ) : (
        false
      )}
    </main>
  );
};

export default Home;
