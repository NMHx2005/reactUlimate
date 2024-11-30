import { Button, Checkbox, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
    const [form] = Form.useForm();
    const { ListBook } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const beforeModal = () => {
        setIsModalOpen(false);
        setMainText("");
        setAuthor("");
        setPrice(0);
        setQuantity(0);
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
    }

    const handleOk = async () => {
        try {
            // Upload ảnh lên book
            const thumbnail = await handleUploadFile(selectedFile, "book");
            if (thumbnail) {
                const res = await createBookAPI(mainText, author, price, quantity, category, thumbnail.data.fileUploaded);
                if (res.data) {
                    notification.success({
                        description: "Tạo Mới Book Thành Công !!!"
                    })
                }
                beforeModal();
                await ListBook();
            }
        } catch (e) {
            notification.error({
                description: "Vui lòng Upload Ảnh !!!"
            })
        }
    };

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            selectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        try {
            const thumbnail = await handleUploadFile(selectedFile, "book");
            if (thumbnail) {
                const res = await createBookAPI(values.mainText, values.author, values.price, values.quantity, values.category, thumbnail.data.fileUploaded);
                if (res.data) {
                    notification.success({
                        description: "Tạo Mới Book Thành Công !!!"
                    })
                } else {
                    notification.error({
                        description: "Tạo Mới Book Thất Bại !!!"
                    })
                }
                setSelectedFile(null);
                setPreview(null);
                form.resetFields();
                setIsModalOpen(false);
                await ListBook();
            }
        } catch (e) {
            console.error(e); // Log lỗi để kiểm tra
            notification.error({
                description: "Vui lòng Upload Thumbnail !!!"
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="" style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <h3>Table Books</h3>
                <Button onClick={() => setIsModalOpen(true)} type="primary">Create Book</Button>
            </div>

            {/* Controlled component */}
            {/* <div>
                <Modal title="Create Book"
                    open={isModalOpen}
                    okText={"Created"}
                    onOk={handleOk}
                    maskClosable={false}
                    onCancel={handleCancel}
                >
                    <div style={{ marginBottom: "10px" }}>
                        <span>Tiêu Đề: </span>
                        <Input name="mainText" value={mainText} onChange={(event) => setMainText(event.target.value)} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <span>Tác Giả: </span>
                        <Input name="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <div>Giá Tiền: </div>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={' VNĐ'}
                            value={price}
                            onChange={(event) => setPrice(event)}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <div>Số Lượng: </div>
                        <InputNumber value={quantity} name="quantity" onChange={(event) => setQuantity(event)} style={{ width: "100%" }} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <div>Thể Loại: </div>
                        <Select
                            name="category"
                            value={category}
                            onChange={(event) => setCategory(event)}
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
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <div>Ảnh Thumbnail: </div>
                        <div>
                            <label
                                htmlFor='btnUpload'
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    // marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "orange",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Upload
                            </label>
                            <input
                                onChange={(event) => handleOnChangeFile(event)}
                                type="file"
                                hidden
                                id="btnUpload"
                                onClick={(event) => event.target.value = null}
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
                            </>
                        }
                    </div>
                </Modal>
            </div> */}

            {/* unControlled component */}

            <div>
                <Modal title="Create Book"
                    open={isModalOpen}
                    okText={"Created"}
                    onOk={() => form.submit()}
                    maskClosable={false}
                    onCancel={handleCancel}
                >
                    <Form
                        style={{
                            padding: "10px"
                        }}
                        name="basic"
                        form={form}
                        labelCol={{ span: 24 }} // Đưa label ra 1 dòng riêng
                        wrapperCol={{ span: 24 }} // Đưa input ra 1 dòng riêng
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="mainText"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên Sách!',
                                },
                            ]}

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tác Giả"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên tác giả!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Giá Tiền"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá tiền!',
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                addonAfter={' VNĐ'}
                            // value={price}
                            // onChange={(event) => setPrice(event)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số Lượng"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng sách!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Thể Loại"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập thể loại sách!',
                                },
                            ]}
                        >
                            <Select
                                name="category"
                                value={category}
                                onChange={(event) => setCategory(event)}
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
                            <div>Ảnh Thumbnail: </div>
                            <div>
                                <label
                                    htmlFor='btnUpload'
                                    style={{
                                        display: "block",
                                        width: "fit-content",
                                        // marginTop: "15px",
                                        padding: "5px 10px",
                                        background: "orange",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Upload
                                </label>
                                <input
                                    onChange={(event) => handleOnChangeFile(event)}
                                    style={{
                                        display: "none"
                                    }}
                                    type="file"
                                    hidden
                                    id="btnUpload"
                                    onClick={(event) => event.target.value = null}
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
                                </>
                            }
                        </div>
                    </Form>
                </Modal>
            </div>
        </>
    )
}

export default BookForm;