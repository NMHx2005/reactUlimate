import { Drawer } from "antd";

const BookDetailModal = (props) => {
    const { isOpenModal, setIsOpenModal, dataDetailBook, setDataDetailBook } = props;

    const onClose = () => {
        setIsOpenModal(false);
        setDataDetailBook(null);
    };

    const styles = {
        drawerContent: {
            background: "linear-gradient(to bottom right, #ffffff, #f0f0f0)",
            borderRadius: "12px 12px 0 0",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        },
        title: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "#4A4A4A",
        },
        body: {
            padding: "20px",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#333",
        },
        paragraph: {
            margin: "10px 0",
        },
        noData: {
            textAlign: "center",
            fontStyle: "italic",
            color: "#888",
        },
        thumbnail: {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            marginTop: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
    };

    return (
        <>
            <div>
                <Drawer
                    width={"50%"}
                    title={<span style={styles.title}>Book Detail</span>}
                    onClose={onClose}
                    open={isOpenModal}
                >
                    {dataDetailBook ? (
                        <div>
                            <p style={styles.paragraph}>ID: {dataDetailBook._id}</p>
                            <p style={styles.paragraph}>Tiêu Đề: {dataDetailBook.mainText}</p>
                            <p style={styles.paragraph}>Tác Giả: {dataDetailBook.author}</p>
                            <p style={styles.paragraph}>Thể Loại: {dataDetailBook.category}</p>
                            <p style={styles.paragraph}>
                                Giá Tiền: {dataDetailBook.price.toLocaleString("vi-VN")} VNĐ
                            </p>
                            <p style={styles.paragraph}>Số Lượng: {dataDetailBook.quantity}</p>
                            <p style={styles.paragraph}>Đã Bán: {dataDetailBook.sold}</p>
                            <div style={{
                                width: "200px",
                                height: "200px"
                            }}>
                                <p style={styles.paragraph}>Thumbnail: </p>
                                <img
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain"
                                    }}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetailBook.thumbnail}`}
                                />
                            </div>
                        </div>
                    ) : (
                        <p style={styles.noData}>Không tìm thấy dữ liệu</p>
                    )}
                </Drawer>
            </div>
        </>
    );
};

export default BookDetailModal;
