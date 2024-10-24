const TodoData = (props) => {

    const { todoList } = props;
    return (
        <>
            <div className="todo-data">
                {todoList.map((item, index) => {
                    console.log(">>> Check todoList: ", item, index);
                    return (
                        <div key={item.id} className="todo-item" >
                            <div>{item.name}</div>
                            <button>delete</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TodoData;