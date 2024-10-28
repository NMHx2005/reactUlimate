// import axios from "axios";
import axios from "./axios.customize.js";

// Thêm mới người dùng
const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "api/v1/user";
    const data = { fullName, email, password, phone };
    return axios.post(URL_BACKEND, data);
}

const updateUserAPI = () => {

}

// Lấy ra danh sách người dùng
const fetchAllUserAPI = () => {
    const URL_BACKEND = "/api/v1/user";
    return axios.get(URL_BACKEND);
}

export { createUserAPI, updateUserAPI, fetchAllUserAPI };