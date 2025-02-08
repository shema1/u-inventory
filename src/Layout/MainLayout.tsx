import React, { FC, useState } from 'react';
import {
    UsergroupAddOutlined,
    TeamOutlined,
    AppstoreOutlined,
    SafetyCertificateOutlined,
    DatabaseOutlined,
    AuditOutlined,
    AppstoreAddOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useProfileInfo } from '../slices/auth/selectors';
import { clearData } from '../slices/auth';
import HeaderLayoutComponent from './components/HeaderLayout';

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

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const logout = () => {
        dispatch(clearData());
    }

    const items: MenuItem[] = [
        {
            key: 'users-submenu',
            icon: <TeamOutlined />,
            label: 'Користувачі',
            children: [
                {
                    key: '/users',
                    icon: <DatabaseOutlined />,
                    label: 'Всі користувачі',
                    onClick: () => navigate('/users')
                },
                {
                    key: '/invitedusers',
                    icon: <UsergroupAddOutlined />,
                    label: 'Запрошені користувачі',
                    onClick: () => navigate('/invitedusers')
                },
                {
                    key: '/pending-users',
                    icon: <SafetyCertificateOutlined />,
                    label: 'Очікують підтвердження',
                    onClick: () => navigate('/pending-users')
                }
            ]
        },
        {
            key: '/inventory',
            icon: <AppstoreOutlined />,
            label: 'Інвентар',
            onClick: () => navigate('/inventory')
        },
        {
            key: '/roles',
            icon: <AuditOutlined />,
            label: 'Ролі',
            onClick: () => navigate('/roles')
        }
    ];

    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                collapsible 
                collapsed={collapsed} 
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
                    zIndex: 2
                }}
            >
                <div style={{ 
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: collapsed ? '20px' : '18px',
                    margin: '16px 0',
                    transition: 'all 0.2s',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    paddingBottom: '16px'
                }}>
                    <AppstoreAddOutlined style={{ 
                        fontSize: '28px',
                        marginRight: collapsed ? '0' : '10px',
                        color: '#1890ff'
                    }} />
                    {!collapsed && <span style={{ fontWeight: 600 }}>U-Inventory</span>}
                </div>
                <Menu 
                    theme="dark" 
                    selectedKeys={[location.pathname]} 
                    defaultOpenKeys={['users-submenu']}
                    mode="inline" 
                    items={items}
                    style={{
                        borderRight: 'none'
                    }}
                />
            </Sider>
            <Layout>
                <HeaderLayoutComponent/>
                <Content style={{ margin: '16px', }}>
                    <div
                        style={{
                            padding: '24px',
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            height: '100%'
                        }}
                    >
                        {/* Bill is a cat. */}
                        {children}
                    </div>
                </Content>
                <Footer style={{ 
                    textAlign: 'center',
                    background: 'transparent',
                    color: '#666'
                }}>
                    U-Inventory ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    </>

}

export default MainLayout;