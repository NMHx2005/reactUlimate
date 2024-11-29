import React, { useContext, useState } from 'react';
import { Button, Form, Input, Typography, Row, Col, notification, message } from 'antd';
import './LoginPage.css';
import { loginAPI } from '../services/api.service';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../components/context/auth.context";
const LoginPage = () => {
    const { Title, Link } = Typography;

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        } else {
            notification.error({
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <div className="login-container">
            <Row justify="center" align="middle" className="full-height" gutter={0}>
                <Col xs={24} sm={20} md={16} lg={10} style={{ padding: 0 }}>
                    <div className="login-box">
                        <Title level={2} className="text-center">
                            Welcome Back
                        </Title>
                        <Form
                            form={form}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Email không được để trống !!!' },
                                    { type: 'email', message: 'Email không đúng định dạng !!!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !!!' }]}
                            >
                                <Input.Password onKeyDown={(event) => {
                                    if (event.key === 'Enter') form.submit()
                                }} />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={() => form.submit()}
                                    block
                                    loading={loading}
                                >
                                    Login
                                </Button>
                            </Form.Item>

                            <div className="extra-links">
                                <Link href="/">Home</Link>
                                <div style={{ display: "flex" }}>
                                    <Link href="/register" className="register-link"> Đăng kí tại đây </Link>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
