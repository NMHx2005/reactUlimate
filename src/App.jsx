import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import ReactLogo from './assets/react.svg'

const App = () => {
  const data = {
    content: "Learning React",
    ip: "Watching youtube"
  };


  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew />
        <TodoData
          data={data}
        />
        <div className='todo-image'>
          <img src={ReactLogo} className='logo' />
        </div>
      </div>
    </>
  )
}

export default App