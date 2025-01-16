import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { createElement, FC, useState } from "react";
import MainLayout from "../../Layout/MainLayout";

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: createElement(icon),
        label: `nav ${index + 1}`,
    }),
);


const Users: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return <>
        <MainLayout>
            <h1>Users</h1>
        </MainLayout>
    </>

}

export default Users