import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UsergroupAddOutlined, HomeOutlined, LoginOutlined, AliwangwangOutlined, AuditOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { Children, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";

const Header = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { user, setUser } = useContext(AuthContext);
    const onClick = (e) => {
        setCurrent(e.key);
    };

    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["users", "books"];
            const currentRoute = allRoutes.find(item => `/${item}` == location.pathname);
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }
    }, [location])

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            // clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Đăng xuất thành công");
            navigate("/");
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />
        },
        {
            label: <Link to={"/books"} >Books</Link>,
            key: 'books',
            icon: <AuditOutlined />
        },
        ...(!user.id ? [{
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),
        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                    key: 'logout',
                }
            ]
        }] : [])
    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal" items={items}
        />
    )
}

export default Header;