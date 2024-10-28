import TodoData from './TodoData'
import TodoNew from './TodoNew'
import ReactLogo from '../../assets/react.svg'
import { useState } from 'react'

const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: "1", name: "Learning React" },
        // { id: "2", name: "Watching Youtube" }
    ])

    const setValue = (inputValue) => {
        const todoNew = {
            id: todoList.length + 1,
            name: inputValue
        };

        setTodoList([...todoList, todoNew]);
    }

    const handelDelete = (id) => {
        const newData = todoList.filter((item) => item.id !== id);
        setTodoList(newData);
    }

    return (
        <>
            <div className="todo-container">
                <div className="todo-title">Todo List</div>
                <TodoNew
                    setValue={setValue}
                />
                {todoList.length > 0 ?
                    <TodoData
                        todoList={todoList}
                        handelDelete={handelDelete}
                    />
                    :
                    <div className='todo-image'>
                        <img src={ReactLogo} className='logo' />
                    </div>
                }
            </div>
        </>
    )
};


export default TodoApp;