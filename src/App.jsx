import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import ReactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {
  const data = {
    content: "Learning React",
    ip: "Watching youtube"
  };

  const [todoList, setTodoList] = useState([
    { id: "1", name: "Learning React" },
    { id: "2", name: "Watching Youtube" }
  ])


  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew />
        <TodoData
          data={data}
          todoList={todoList}
        />
        <div className='todo-image'>
          <img src={ReactLogo} className='logo' />
        </div>
      </div>
    </>
  )
}

export default App