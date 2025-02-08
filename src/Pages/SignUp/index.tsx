/* eslint-disable react-hooks/exhaustive-deps */
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography } from "antd";
import { FC, useEffect } from "react";
import { useSignUpMutation } from "../../apis/auth/auth";
import { passswordMinLengthdRule, requireFielddRule, validEmaildRule } from "../../services/formRules";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setDataAfterLogin } from "../../slices/auth";

const { Title } = Typography;

interface ISignUpForm {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
}

const SignUp: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [signUp, { data: signUpData, isLoading }] = useSignUpMutation();

    const onFinish = (values: ISignUpForm) => {
        signUp(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(()=> {
      if(signUpData){
        dispatch(setDataAfterLogin(signUpData))
      }
    },[signUpData])

    return (
        <div style={{ 
            display: 'flex', 
            height: '100vh', 
            justifyContent: 'center', 
            alignItems: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                width: 420,
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 15,
                padding: '30px 40px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 30, color: '#1a237e' }}>
                    Реєстрація
                </Title>
                <Form
                    name="signup"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[requireFielddRule, validEmaildRule]}
                    >
                        <Input
                            prefix={<MailOutlined style={{ color: '#1890ff' }} />}
                            placeholder="Емейл"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="firstName"
                        rules={[requireFielddRule]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                            placeholder="Ім'я"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        rules={[requireFielddRule]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                            placeholder="Прізвище"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[requireFielddRule, passswordMinLengthdRule]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#1890ff' }} />}
                            placeholder="Пароль"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            requireFielddRule,
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Паролі не співпадають'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#1890ff' }} />}
                            placeholder="Підтвердження паролю"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space direction="vertical" style={{ width: '100%', gap: 8 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ 
                                    width: '100%', 
                                    height: 45,
                                    borderRadius: 6,
                                    fontSize: 16,
                                    fontWeight: 500
                                }}
                                loading={isLoading}
                            >
                                Зареєструватися
                            </Button>
                            <Button 
                                type="link" 
                                onClick={() => navigate('/login')}
                                style={{ width: '100%' }}
                            >
                                Вже маєте акаунт? Увійти
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;