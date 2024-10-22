const TodoData = (props) => {

    const { content, ip } = props.data;

    return (
        <>
            <div className='todo-data'>
                <div>Môn tôi học là:  {content}</div>
                <div>{ip}</div>
                <div>
                    {JSON.stringify(props.todoList)};
                </div>
            </div>
        </>
    )
}

export default TodoData;