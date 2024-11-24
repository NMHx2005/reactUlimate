import { Button, Drawer } from 'antd';


const ViewUserDetailModal = (props) => {
    const { openDetailUserModal, setOpenDetailUserModal, dataDetail, setDataDetail } = props;


    const onClose = () => {
        setOpenDetailUserModal(false);
        setDataDetail(null);
    };


    return (
        <>
            <Drawer title="Basic Drawer" onClose={onClose} open={openDetailUserModal}>
                {dataDetail ? (
                    <div>
                        <p>ID: {dataDetail._id}</p>
                        <p>Full Name: {dataDetail.fullName}</p>
                        <p>Email: {dataDetail.email}</p>
                        <p>Phone: {dataDetail.phone}</p>
                    </div>
                ) : (
                    <p>Không có dữ liệu</p>
                )}
            </Drawer>
        </>
    );
};


export default ViewUserDetailModal;