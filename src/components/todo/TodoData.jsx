const TodoData = (props) => {

    const { content, ip } = props.data;

    return (
        <>
            <div className='todo-data'>
                <div>Môn tôi học là:  {content}</div>
                <div>{ip}</div>
            </div>
        </>
    )
}

export default TodoData;