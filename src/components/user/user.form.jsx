import Input from "antd/es/input/Input";
import "./user.form.css"
import { Button, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleClickBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        debugger
        if (res.data) {
            notification.success({
                // message: "create user",
                description: "Tạo mới user thành công"
            })
        } else {
            notification.error({
                // message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <>
            <div className="user-form">
                <div>
                    <div>
                        <span className="title">FullName</span>
                        <Input onChange={(event) => setFullName(event.target.value)} />
                    </div>
                    <div>
                        <span className="title">Email</span>
                        <Input onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <span className="title">Password</span>
                        <Input.Password onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <span className="title">Phone Number</span>
                        <Input onChange={(event) => setPhone(event.target.value)} />
                    </div>
                    <div>
                        <Button
                            onClick={handleClickBtn}
                            type="primary"
                        >Create User</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserForm;