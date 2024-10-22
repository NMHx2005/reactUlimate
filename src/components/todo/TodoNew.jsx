import { useState } from "react";

const TodoNew = (props) => {
    const { setValue } = props;

    const [inputValue, setInputValue] = useState("");

    const handleOnChange = (event) => {
        console.log(event);
        setInputValue(event);
    }

    const handleOnClick = () => {
        setValue(inputValue);
    }

    return (
        <>
            <div className="todo-new">
                <input className='ip' onChange={(event) => handleOnChange(event.target.value)} type="text" />
                <button className='add' onClick={handleOnClick}>Add</button>
            </div>
            <div>
                Nội dung là: {inputValue}
            </div>
        </>
    )
}

export default TodoNew;
