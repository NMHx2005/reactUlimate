import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';


const ViewUserDetailModal = (props) => {
    const { openDetailUserModal, setOpenDetailUserModal, dataDetail, setDataDetail, loadUser } = props;


    const onClose = () => {
        setOpenDetailUserModal(false);
        setDataDetail(null);
    };

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();


    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            //step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone
            );
            if (resUpdateAvatar.data) {
                setOpenDetailUserModal(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công"
                })
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpload.message)
                })
            }
        } else {
            //failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }


    return (
        <>
            <Drawer
                width={"50vw"}
                title="Thông tin người dùng"
                onClose={onClose}
                open={openDetailUserModal}
            >
                {dataDetail ? (
                    <div>
                        <p>ID: {dataDetail._id}</p>
                        <p>Full Name: {dataDetail.fullName}</p>
                        <p>Email: {dataDetail.email}</p>
                        <p>Phone: {dataDetail.phone}</p>
                        <br />
                        <p>Avatar : </p>
                        <div
                            style={{
                                marginTop: "10px",
                                height: "100px",
                                width: "150px",
                                border: "1px solid #ccc"
                            }}
                        >
                            <img
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain"
                                }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='btnUpload'
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "orange",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Upload Avatar
                            </label>
                            <input
                                onChange={(event) => handleOnChangeFile(event)}
                                type="file"
                                hidden id="btnUpload"
                            />
                        </div>


                        {preview &&
                            <>
                                <div
                                    style={{
                                        marginTop: "10px",
                                        height: "100px",
                                        width: "150px",
                                        marginBottom: "15px"
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "contain"
                                        }}
                                        src={preview}
                                    />
                                </div>
                                <Button
                                    onClick={handleUpdateUserAvatar}
                                    type='primary'
                                >
                                    Save
                                </Button>
                            </>
                        }
                    </div>
                ) : (
                    <p>Không có dữ liệu</p>
                )}
            </Drawer>
        </>
    );
};


export default ViewUserDetailModal;