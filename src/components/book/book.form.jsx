import { Button } from "antd";

const BookForm = () => {
    return (
        <>
            <div className="" style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <h3>Table Books</h3>
                <Button type="primary">Create Book</Button>
            </div>
        </>
    )
}

export default BookForm;