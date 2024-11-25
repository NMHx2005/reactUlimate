import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Popconfirm, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetailModal from './view.user.detail.modal';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);

    const [openDetailUserModal, setOpenDetailUserModal] = useState(false);

    const cancel = () => {
        // console.log(e);
        // message.error('Click on No');
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
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

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            // Nếu thay đổi trang : current
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }

        if (pagination && pagination.pageSize) {
            // Nếu thay đổi số lượng của phần tử trong 1 page khác với : pageSize
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };


    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
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
                loadUser={loadUser}
            />
        </>
    )
}

export default UserTable;