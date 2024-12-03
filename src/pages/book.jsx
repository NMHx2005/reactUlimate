import { useEffect, useState } from "react";
import BookForm from "../components/book/book.form";
import BookTable from "../components/book/book.table";
import { getListBooksAPI } from "../services/api.service";


const BookPage = () => {
    const [dataBook, setDataBook] = useState(null);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        ListBook();
    }, [current, pageSize]);

    const ListBook = async () => {
        setLoadingTable(true);
        const res = await getListBooksAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setLoadingTable(false);
    }

    return (
        <>
            <div style={{
                padding: "40px"
            }}>
                <BookForm
                    ListBook={ListBook}
                />
                <BookTable
                    loadingTable={loadingTable}
                    ListBook={ListBook}
                    current={current}
                    dataBook={dataBook}
                    pageSize={pageSize}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                    total={total}
                />
            </div>
        </>
    )
}

export default BookPage;