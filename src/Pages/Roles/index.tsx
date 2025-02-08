import { FC, useEffect, useState } from "react";
import { Table, TableProps, Button, Space } from "antd";
import MainLayout from "../../Layout/MainLayout";
import { useLazyGetRolesQuery } from "../../apis/roles/roles";
import { IRole } from "../../apis/roles/interfaces";
import RoleModal from "./components/RoleModal";

const Roles: FC = () => {
    const [getRoles, { data: rolesData, isLoading }] = useLazyGetRolesQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<IRole | null>(null);

    useEffect(() => {
        getRoles();
    }, []);

    const columns: TableProps<IRole>['columns'] = [
        {
            title: "Назва",
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: IRole) => (
                <a 
                    style={{ color: '#1890ff', cursor: 'pointer' }}
                    onClick={() => {
                        setSelectedRole(record);
                        setIsModalOpen(true);
                    }}
                >
                    {text}
                </a>
            ),
        },
        {
            title: "Опис",
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (
                <span style={{ color: '#666666' }}>{text}</span>
            ),
        },
        {
            title: "Права доступу",
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions: string[]) => (
                <span>{permissions.join(', ')}</span>
            ),
        },
    ];

    return (
        <MainLayout>
            <div style={{ marginBottom: 16 }}>
                <Button 
                    type="primary" 
                    onClick={() => {
                        setSelectedRole(null);
                        setIsModalOpen(true);
                    }}
                >
                    Створити роль
                </Button>
            </div>
            <Table<IRole> 
                style={{ 
                    width: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                }}
                columns={columns} 
                dataSource={rolesData} 
                loading={isLoading} 
            />
            <RoleModal
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setSelectedRole(null);
                }}
                selectedRole={selectedRole}
            />
        </MainLayout>
    );
}

export default Roles;