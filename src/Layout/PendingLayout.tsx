import { FC, ReactNode } from "react";
import { Layout } from "antd";

const { Content } = Layout;

interface PendingLayoutProps {
    children: ReactNode;
}

const PendingLayout: FC<PendingLayoutProps> = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '50px 20px'
            }}>
                {children}
            </Content>
        </Layout>
    );
}

export default PendingLayout;