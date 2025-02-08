import { FC, useEffect } from "react";
import { Table, Tag, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import MainLayout from "../../Layout/MainLayout";
import { useGetUsersByStatusQuery, useUpdateUserMutation } from "../../apis/user/user";
import { IUser } from "../../apis/user/interfaces";

const PendingUsers: FC = () => {
    const { data: pendingUsers, isLoading, refetch } = useGetUsersByStatusQuery({ status: 'pending' });
    const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();

    useEffect(() => {
        if (isUpdateSuccess) {
            refetch();
        }
    }, [isUpdateSuccess, refetch]);

    const handleApprove = async (user: IUser) => {
        try {
            await updateUser({
                id: user.id,
                status: 'active'
            }).unwrap();
        } catch (error) {
            console.error('Помилка при підтвердженні користувача:', error);
        }
    };

    const handleReject = async (user: IUser) => {
        try {
            await updateUser({
                id: user.id,
                status: 'banned'
            }).unwrap();
        } catch (error) {
            console.error('Помилка при відхиленні користувача:', error);
        }
    };

    const columns: ColumnsType<IUser> = [
        {
            title: 'Емейл',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: "Ім'я",
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Прізвище',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            render: (role) => 'aaaa',
        },
        {
            title: 'Статус',
            key: 'status',
            dataIndex: 'status',
            render: () => (
                <Tag color="processing">
                    Очікує підтвердження
                </Tag>
            ),
        },
        {
            title: 'Дії',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        type="primary" 
                        onClick={() => handleApprove(record)}
                    >
                        Підтвердити
                    </Button>
                    <Button 
                        danger 
                        onClick={() => handleReject(record)}
                    >
                        Відхилити
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <MainLayout>
            <div style={{ padding: '24px' }}>
                <h2 style={{ marginBottom: '20px' }}>Користувачі, що очікують підтвердження</h2>
                <Table 
                    columns={columns} 
                    dataSource={pendingUsers} 
                    loading={isLoading}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Всього ${total} користувачів`,
                    }}
                />
            </div>
        </MainLayout>
    );
};

export default PendingUsers; 