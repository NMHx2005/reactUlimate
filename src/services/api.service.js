// import axios from "axios";
import axios from "./axios.customize.js";

// Thêm mới người dùng
const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "api/v1/user";
    const data = { fullName, email, password, phone };
    return axios.post(URL_BACKEND, data);
}

// Cập nhật người dùng
const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "api/v1/user";
    const data = { _id, fullName, phone };
    return axios.put(URL_BACKEND, data);
}

// Lấy ra danh sách người dùng
const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

// Xóa người dùng dựa vào id được gửi lên
const deleteUserAPI = (id) => {
    const URL_BACKEND = `api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}

// Đẩy ảnh lên
const handleUploadFile = (file, folder) => {
    // Lấy ra URL backend
    const URL_BACKEND = "/api/v1/file/upload";
    const config = {
        headers: {
            "upload-type": folder,
            'Content-Type': 'multipart/form-data'
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);
    return axios.post(URL_BACKEND, bodyFormData, config);
}

// Cập nhật avatar người dùng
const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone,
        avatar: avatar
    }
    return axios.put(URL_BACKEND, data);
}

// Thêm mới tài khoản người dùng
const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "api/v1/user/register";
    const data = { fullName, email, password, phone };
    return axios.post(URL_BACKEND, data);
}

// Đăng Nhập
const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 2000
    }
    return axios.post(URL_BACKEND, data);
}

// Lấy ra tài khoản người dùng sau khi đăng nhập
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}

// Đăng xuất
const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

// Lấy ra danh sách books
const getListBooksAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

// Thêm mới Book
const createBookAPI = (mainText, author, price, quantity, category, thumbnail) => {
    const URL_BACKEND = "api/v1/book";
    const data = { mainText, author, price, quantity, category, thumbnail };
    return axios.post(URL_BACKEND, data);
}

export {
    createUserAPI, updateUserAPI, fetchAllUserAPI,
    deleteUserAPI, handleUploadFile, updateUserAvatarAPI,
    registerUserAPI, loginAPI, getAccountAPI,
    logoutAPI, getListBooksAPI, createBookAPI
};