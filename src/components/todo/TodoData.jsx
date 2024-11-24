const TodoData = (props) => {

    const { todoList, handelDelete } = props;

    const handleOnClick = (event) => {
        handelDelete(event);
    };

    return (
        <>
            <div className="todo-data">
                {todoList.map((item, index) => {
                    return (
                        <div key={item.id} className="todo-item" >
                            <div>{item.name}</div>
                            <button onClick={() => handleOnClick(item.id)}>delete</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TodoData;