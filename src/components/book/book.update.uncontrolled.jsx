import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";


const BookUpdateUncontrolled = (props) => {
    const { isOpenModalUpdate, setIsOpenModalUpdate, dataBookUpdate,
        setDataBookUpdate, ListBook
    } = props;

    const [preview, setPreview] = useState(null);
    const [seLecTedFile, setSeLecTedFile] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataBookUpdate && dataBookUpdate._id) {
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`);
            form.setFieldsValue({
                id: dataBookUpdate._id,
                mainText: dataBookUpdate.mainText,
                author: dataBookUpdate.author,
                price: dataBookUpdate.price,
                quantity: dataBookUpdate.quantity,
                category: dataBookUpdate.category
            });
        }
    }, [dataBookUpdate]);

    const resetAndCloseModal = () => {
        setIsOpenModalUpdate(false);
        setPreview(null);
        setSeLecTedFile(null);
        setDataBookUpdate(null);
    }

    const handleOnChangeFile = async (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSeLecTedFile(null);
            setPreview(null);
        }

        // Lấy ra file ảnh được up lên
        const file = event.target.files[0];
        if (file) {
            setSeLecTedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const onFinish = async (values) => {
        const { id, mainText, author, price, quantity, category } = values;

        // Không có ảnh + Không có File => return
        if (!preview && !seLecTedFile) {
            notification.error({
                description: "Không thể update do có lỗi ảnh"
            })
        }

        let newThumbnail = "";
        // có ảnh preview + không có file => không upload file
        if (preview && !seLecTedFile) {
            newThumbnail = dataBookUpdate.thumbnail;
        } else {
            // có ảnh preview  + có file => Upload file
            const res = await handleUploadFile(seLecTedFile, "book");

            if (res.data) {
                // success
                newThumbnail = res.data.fileUploaded;
            } else {
                // error
                notification.error({
                    description: "Xảy ra lỗi khi Upload ảnh"
                })
            }
        }

        const resBook = await updateBookAPI(id, mainText, author, price, quantity, category, newThumbnail);
        if (resBook.data) {
            resetAndCloseModal();
            await ListBook();
            notification.success({
                description: "Cập nhật thành công"
            })
        } else {
            notification.error({
                description: "Cập nhật thất bại"
            })
        }
    };


    const handleOk = () => {
        resetAndCloseModal();
    };
    const handleCancel = () => {
        resetAndCloseModal();
    };

    return (
        <>
            <Modal
                title="Update Book"
                open={isOpenModalUpdate}
                okText={"Save"}
                onOk={() => {
                    form.submit();
                    handleOk();
                }}
                onCancel={handleCancel}
                maskClosable={false}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 24 }} // Đưa label ra 1 dòng riêng
                    wrapperCol={{ span: 24 }} // Đưa input ra 1 dòng riêng
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="ID"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Tiêu đề: "
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tiêu đề!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tác Giả: "
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tác giả!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá Tiền: "
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá tiền!',
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }}
                            addonAfter={' VNĐ'}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số Lượng: "
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng!',
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>


                    <Form.Item
                        label="Chọn thể loại: "
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá tiền!',
                            },
                        ]}
                    >
                        <Select
                            name="category"
                            showSearch
                            style={{
                                width: "100%",
                            }}
                            placeholder="Chọn thể loại"
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>

                    <div>
                        <div style={{
                            marginBottom: "10px"
                        }}>Ảnh Thumbnail: </div>
                        <label
                            htmlFor="uploadIMG"
                            style={{
                                cursor: "pointer",
                                border: "1px solid orange",
                                borderRadius: "4px",
                                padding: "5px 10px",
                                background: "orange",

                            }}
                        >
                            Upload
                        </label>
                        <input type="file" id="uploadIMG" onChange={(event) => handleOnChangeFile(event)} style={{ display: "none" }} onClick={(event) => event.target.value = null}></input>
                        {preview &&
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
                        }
                    </div>
                </Form>

            </Modal>
        </>
    )
}


export default BookUpdateUncontrolled;
