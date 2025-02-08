import { FC, useEffect, useState } from "react";
import { Table, Tag, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import MainLayout from "../../Layout/MainLayout";
import { useGetUsersByStatusQuery, useUpdateUserMutation } from "../../apis/user/user";
import { IUser } from "../../apis/user/interfaces";
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import ConfirmPendingUser from "./components/ConfirmPendingUser/ConfirmPendingUser";

const PendingUsers: FC = () => {
    const { data: pendingUsers, isLoading, refetch } = useGetUsersByStatusQuery({ status: 'pending' });
    const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (isUpdateSuccess) {
            refetch();
        }
    }, [isUpdateSuccess, refetch]);

    const handleApprove = (user: IUser) => {
        setSelectedUser(user);
        setIsModalVisible(true);
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

    const onCloseModal = () => {
        setSelectedUser(null);
        setIsModalVisible(false);
    }

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
            width: 120,
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<CheckOutlined style={{ color: '#52c41a', fontSize: 20 }} />}
                        onClick={() => handleApprove(record)}
                    />
                    <Button
                        type="text"
                        icon={<StopOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />}
                        onClick={() => handleReject(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <MainLayout>
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
            <ConfirmPendingUser
                visible={isModalVisible}
                onOk={onCloseModal}
                selectedUser={selectedUser}
                onCancel={onCloseModal}
            />
        </MainLayout>
    );
};

export default PendingUsers; 