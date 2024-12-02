import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const BookUpdateControlled = (props) => {
    const { ListBook, isOpenModalUpdate, setIsOpenModalUpdate, dataBookUpdate, setDataBookUpdate } = props;

    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (dataBookUpdate && dataBookUpdate._id) {
            setId(dataBookUpdate._id);
            setMainText(dataBookUpdate.mainText);
            setAuthor(dataBookUpdate.author);
            setPrice(dataBookUpdate.price);
            setQuantity(dataBookUpdate.quantity);
            setCategory(dataBookUpdate.category);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`);
        }
    }, [dataBookUpdate]);

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
    };

    const resetAndCloseModal = () => {
        setIsOpenModalUpdate(false);
        setId("");
        setMainText("");
        setAuthor("");
        setPrice(0);
        setQuantity(0);
        setCategory("");
        setPreview(null);
    }

    const handleOk = async () => {
        const thumbnailUpdate = selectedFile ? await handleUploadFile(selectedFile, "book") : {
            data: {
                fileUploaded: dataBookUpdate.thumbnail
            }
        };

        if (thumbnailUpdate) {
            const res = await updateBookAPI(id, mainText, author, price, quantity, category, thumbnailUpdate.data.fileUploaded);
            if (res.data) {
                notification.success({
                    description: "Cập nhật thành công !!!"
                });
            }
            resetAndCloseModal();
            setDataBookUpdate(null);
            ListBook();
        } else {
            notification.error({
                description: "Không cập nhật được !!!"
            });
        }
    };

    const handleCancel = () => {
        resetAndCloseModal();
    };

    return (
        <>
            <Modal
                title="Update Book"
                open={isOpenModalUpdate}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={"Save"}
                maskClosable={false}
            >
                <div>
                    <div>ID: </div>
                    <Input value={id} disabled />
                </div>
                <div>
                    <div>Tiêu đề: </div>
                    <Input value={mainText} onChange={(e) => setMainText(e.target.value)} />
                </div>
                <div>
                    <div>Tác Giả: </div>
                    <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <div>Giá Tiền: </div>
                    <InputNumber
                        value={price}
                        style={{ width: "100%" }}
                        addonAfter={' VNĐ'}
                        onChange={(value) => setPrice(value)}
                    />
                </div>
                <div>
                    <div>Số Lượng: </div>
                    <InputNumber
                        value={quantity}
                        style={{ width: "100%" }}
                        onChange={(value) => setQuantity(value)}
                    />
                </div>
                <div>
                    <div>Thể Loại: </div>
                    <Select
                        name="category"
                        value={category}
                        onChange={(value) => setCategory(value)}
                        showSearch
                        style={{ width: "100%" }}
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
                <div>
                    <div>Ảnh Thumbnail: </div>
                    <div>
                        <label
                            htmlFor='btnUpload'
                            style={{
                                display: "block",
                                width: "fit-content",
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
                </div>
            </Modal>
        </>
    );
}

export default BookUpdateControlled;
