import React from 'react';
import Task from '../../components/Task/Task';
import './Home.css'

function Home() {
  return (
    <main className='full-screen container'>
      <section className='card flex'>
        <header className='card-header flex'>
          <div className='content-container flex'>
            <div className='main-info flex'>
              <span className='title'>
              <h1>My</h1>
              <h1>Tasks</h1>
              </span>
              <div className='todo-summary flex'>
                <span className='status-counter flex'>
                  <div className='h3-bg flex'>
                    <h3>24</h3>
                  </div>
                  <p>done</p>
                </span>
                <span className='status-counter flex'>
                  <div className='h3-bg flex'>
                    <h3>15</h3>
                  </div>
                  <p>to do</p>
                </span>
              </div>
            </div>
            <div className='teste flex'>
            <p>April 5, 2022</p>
            <p>loading</p>
            </div>
          </div>
          <div className='aditional-info'>
          </div>
        </header>
        <div className='todo-container'>
          <div className='content-container flex'>
            <span className='menu flex'>
              <h4>Inbox</h4>
              <button className='add-btn'>add task</button>
            </span>
            <section className='add-drop flex'>
              <input type="text" placeholder='Title' aria-aria-label='Title'/>
              <span className='flex description-input'>
              <input type="text" placeholder='Description' aria-aria-label='Description'/>
              <button>save</button>
              </span>
            </section>
            <div className='todo-list'>
              <Task />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
