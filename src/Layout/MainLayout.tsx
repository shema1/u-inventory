import React, { FC, useState } from 'react';
import {
    FileOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useProfileInfo } from '../slices/auth/selectors';
import { clearData } from '../slices/auth';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}



const items: MenuItem[] = [
    getItem('Користувачі', 'sub1', <UserOutlined />),
    getItem('Інвентар', 'sub1', <UserOutlined />),
];


interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const profileInfo = useProfileInfo();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const logout = () => {
        dispatch(clearData());
    }

    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" >
                    <Menu.Item key={'/users'} icon={<UserOutlined />} onClick={() => navigate('/users')}>
                        Користувачі
                    </Menu.Item>
                    <Menu.Item key={'/invitedusers'} icon={<UserOutlined />} onClick={() => navigate('/invitedusers')}>
                        Запрошені користувачі
                    </Menu.Item>
                    <Menu.Item key={'/inventory'} icon={<FileOutlined />} onClick={() => navigate('/inventory')}>
                        Інвентар
                    </Menu.Item>
                    <Menu.Item key={'/roles'} icon={<UserOutlined />} onClick={() => navigate('/roles')}>
                        Ролі
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: '12px 25px', background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
                    <div style={{ marginRight: 20 }}>{profileInfo?.firstName + " " + profileInfo?.lastName}</div>
                    <Button onClick={logout} type="primary" icon={<LogoutOutlined />} iconPosition='end'>
                        Вийти
                    </Button>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* Bill is a cat. */}
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    </>

}

export default MainLayout;