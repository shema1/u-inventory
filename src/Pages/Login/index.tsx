/* eslint-disable react-hooks/exhaustive-deps */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Typography } from "antd";
import { FC, useEffect } from "react";
import { IUserLogin } from "../../apis/auth/interfaces";
import { useLoginMutation } from "../../apis/auth/auth";
import { passswordMinLengthdRule, requireFielddRule, validEmaildRule } from "../../services/formRules";
import { useAppDispatch } from "../../store/hooks";
import { setDataAfterLogin } from "../../slices/auth";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [login, {data: loginData, isLoading: loginIsLoading}] = useLoginMutation()


    const onFinish = (values: IUserLogin) => {
        login(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if(loginData){
            dispatch(setDataAfterLogin(loginData))
            if(loginData?.userInfo.status === 'pending'){
                navigate('/pending')
            }
            else if(loginData?.userInfo.status === 'banned'){
                navigate('/banned')
            }
            else{
                navigate('/users')
            }
            
        }
    },[loginData])

    return <>
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
                    Вхід в систему
                </Title>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item<IUserLogin>
                        name="email"
                        rules={[requireFielddRule, validEmaildRule]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                            placeholder="Емейл"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item<IUserLogin>
                        name="password"
                        rules={[requireFielddRule, passswordMinLengthdRule]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#1890ff' }} />}
                            placeholder="Пароль"
                            style={{ borderRadius: 6 }}
                        />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Запам'ятати мене</Checkbox>
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
                                loading={loginIsLoading}
                            >
                                Увійти
                            </Button>
                            <Button 
                                type="link" 
                                onClick={() => navigate('/signup')}
                                style={{ width: '100%' }}
                            >
                                Зареєструватися
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>;
}

export default Login;