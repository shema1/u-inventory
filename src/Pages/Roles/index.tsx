import { FC, useEffect } from "react";
import { Table, TableProps } from "antd";
import MainLayout from "../../Layout/MainLayout";
import { useLazyGetRolesQuery } from "../../apis/roles/roles";
import { IRole } from "../../apis/roles/interfaces";

const Roles: FC = () => {
    const [getRoles, { data: rolesData, isLoading }] = useLazyGetRolesQuery();

    useEffect(() => {
        getRoles();
    }, []);

    const columns: TableProps<IRole>['columns'] = [
        {
            title: "Назва",
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
                <a style={{ color: '#1890ff', cursor: 'pointer' }}>{text}</a>
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
        </MainLayout>
    );
}

export default Roles;