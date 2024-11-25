import Input from "antd/es/input/Input";
import "./user.form.css"
import { Button, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId('');
        setFullName('');
        setPhone('');
        setDataUpdate(null);
    }

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                description: "Cập nhật user thành công"
            });
            resetAndCloseModal(); // Gọi resetAndCloseModal ở đây
            await loadUser(); // để nó tự động reload lại để cập nhật dữ liệu sau khi thay đổi
        } else {
            notification.error({
                description: JSON.stringify(res.message)
            });
        }
    }

    return (
        <>
            <Modal
                title="Update User"
                open={isModalUpdateOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"SAVE"}
            >
                <div>
                    <span className="title">Id</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span className="title">FullName</span>
                    <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                </div>
                <div>
                    <span className="title">Phone Number</span>
                    <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
            </Modal>
        </>
    )
}

export default UpdateUserModal;