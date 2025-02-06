import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { FC, useEffect } from "react";
import { IUserLogin } from "../../apis/auth/interfaces";
import { useLoginMutation } from "../../apis/auth/auth";
import { passswordMinLengthdRule, requireFielddRule, validEmaildRule } from "../../services/formRules";




const Login: FC = () => {

    const [login, {data: loginData, isLoading: loginIsLoading}] = useLoginMutation()
    const onLogin = () => {
        console.log("work")
    }
    const onFinish = (values: IUserLogin) => {
        console.log("Success:", values);
        login(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        console.log("loginData", loginData)
    },[loginData])

    return <>
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', }}>
            <div style={{
                width: 350,
                height: 350,
                background: '#d5d5e4',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                padding: 22,
                alignItems: 'center'
            }}>
                <div className="p-6 bg-white rounded-2xl shadow-lg w-96">
                    <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item<IUserLogin>
                            name="email"
                            rules={[requireFielddRule, validEmaildRule]}
                        >
                            <Input
                                prefix={<UserOutlined className="text-gray-400" />}
                                placeholder="Емейл"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item<IUserLogin>
                            name="password"
                            rules={[requireFielddRule, passswordMinLengthdRule]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Пароль"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="large"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    </>
}

export default Login