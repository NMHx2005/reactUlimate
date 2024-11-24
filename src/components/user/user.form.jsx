import Input from "antd/es/input/Input";
import "./user.form.css"
import { Button, Modal, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName('');
        setEmail('');
        setPassword('');
        setPhone('');
    }

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                description: "Tạo mới user thành công"
            });
            resetAndCloseModal(); // Gọi resetAndCloseModal ở đây
            await loadUser();
        } else {
            notification.error({
                description: JSON.stringify(res.message)
            });
        }
    }

    return (
        <>
            <div className="user-form">
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>Table Users</h3>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            type="primary"
                        >Create User</Button>
                    </div>
                </div>
                <Modal
                    title="Create User"
                    open={isModalOpen}
                    onOk={() => handleSubmitBtn()}
                    onCancel={() => resetAndCloseModal()}
                    maskClosable={false}
                    okText={"CREATE"}
                >
                    <div>
                        <span className="title">FullName</span>
                        <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                    </div>
                    <div>
                        <span className="title">Email</span>
                        <Input value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <span className="title">Password</span>
                        <Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <span className="title">Phone Number</span>
                        <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
                    </div>
                </Modal>

            </div>
        </>
    )
}

export default UserForm;