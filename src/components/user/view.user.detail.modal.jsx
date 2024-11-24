import { Button, Drawer } from 'antd';


const ViewUserDetailModal = (props) => {
    const { openDetailUserModal, setOpenDetailUserModal, dataDetail, setDataDetail } = props;


    const onClose = () => {
        setOpenDetailUserModal(false);
        setDataDetail(null);
    };


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
                        <div>
                            <img
                                width={200}
                                height={150}
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
                            <input type="file" hidden id="btnUpload" />
                        </div>


                        {/* <Button type='primary'>Upload Avatar</Button> */}
                    </div>
                ) : (
                    <p>Không có dữ liệu</p>
                )}
            </Drawer>
        </>
    );
};


export default ViewUserDetailModal;