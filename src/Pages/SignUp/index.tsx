/* eslint-disable react-hooks/exhaustive-deps */
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FC, useEffect } from "react";
import { IUserSignUp } from "../../apis/auth/interfaces";
import { passswordMinLengthdRule, requireFielddRule, validEmaildRule } from "../../services/formRules";
import { useSignUpMutation } from "../../apis/auth/auth";
import { setDataAfterLogin } from "../../slices/auth";
import { useAppDispatch } from "../../store/hooks";

const SignUp: FC = () => {

  const [singUp, {data: singUpData, isLoading: singUpDataIsLoading}] = useSignUpMutation();

  const dispatch = useAppDispatch();
  const onFinish = (values: IUserSignUp) => {
    console.log("Success:", values);
    singUp(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(()=> {
    if(singUpData){
      dispatch(setDataAfterLogin(singUpData))
    }
  },[singUpData])

  return <>
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', }}>
      <div style={{
        width: 380,
        height: 480,
        background: '#d5d5e4',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        padding: 22,
        alignItems: 'center'
      }}>
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <Form
          name="register"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ width: '100%' }}
        >
          <Form.Item<IUserSignUp>
            name="email"
            rules={[
              requireFielddRule,
              validEmaildRule
              // { type: 'email', message: "Введіть коректний емейл!" }
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Емейл"
              size="large"
            />
          </Form.Item>

          <Form.Item<IUserSignUp>
            name="firstName"
            rules={[requireFielddRule]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Ім'я"
              size="large"
            />
          </Form.Item>
          <Form.Item<IUserSignUp>
            name="lastName"
            rules={[requireFielddRule]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Прізвище"
              size="large"
            />
          </Form.Item>

          <Form.Item<IUserSignUp>
            name="password"
            rules={[requireFielddRule, passswordMinLengthdRule]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item<IUserSignUp>
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              requireFielddRule,
              passswordMinLengthdRule,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Паролі не співпадають!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Підтвердження паролю"
              size="large"
            />
          </Form.Item>
          <Form.Item<IUserSignUp>>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={singUpDataIsLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </>;
}

export default SignUp;