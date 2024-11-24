import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, message, Popconfirm, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetailModal from './view.user.detail.modal';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);

    const [openDetailUserModal, setOpenDetailUserModal] = useState(false);

    const cancel = (e) => {
        // console.log(e);
        // message.error('Click on No');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setOpenDetailUserModal(true);
                        }}
                    >
                        {record._id}
                    </a>
                )
            }

        },
        {
            title: 'Name',
            dataIndex: 'fullName'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "15px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }}
                    />
                    <Popconfirm
                        title="Xóa User"
                        description="Bạn chắc chắn chưa?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);

        if (res.data) {
            notification.success({
                message: "Delete user",
                description: "Xóa user thành công"
            });
            await loadUser();
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />

            <ViewUserDetailModal
                openDetailUserModal={openDetailUserModal}
                setOpenDetailUserModal={setOpenDetailUserModal}
                setDataDetail={setDataDetail}
                dataDetail={dataDetail}
            />
        </>
    )
}

export default UserTable;