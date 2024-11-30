import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import BookDetailModal from "./book.detail.modal";
import { useState } from "react";

const BookTable = (props) => {
    const { ListBook, dataBook, current, pageSize, setPageSize, setCurrent, total } = props;

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [dataDetailBook, setDataDetailBook] = useState(null);

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
                    <a
                        href="#"
                        onClick={() => {
                            setDataDetailBook(record);
                            setIsOpenModal(true);
                        }}
                    >
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
            render: (value, row, index) => {
                // do something like adding commas to the value or prefix
                return <span>{value.toLocaleString('en-US')} VNĐ</span>;
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'price',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: "orange" }} />
                    <DeleteOutlined style={{ color: "red" }} />
                </Space>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // nếu trang hiện tại không giống thì call API mới
        if (pagination.current && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        // Và cái này logic như bên trên
        if (pagination.pageSize && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
        }
    }

    return (
        <>
            <Table
                columns={columns}
                rowKey={"_id"}
                dataSource={dataBook}
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
            <BookDetailModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                setDataDetailBook={setDataDetailBook}
                dataDetailBook={dataDetailBook}
            />
        </>
    )
}

export default BookTable;