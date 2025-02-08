import { FC, useState } from "react";
import { Button, Space, Table, TableProps, Tag } from "antd";
import MainLayout from "../../Layout/MainLayout";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DeleteButton from "../../components/core/DeleteButton";
import { IUser } from "../../apis/user/interfaces";
import { useDeleteUserMutation, useGetUsersQuery } from "../../apis/user/user";
import InviteUserModal from "../IvitedUsers/components/InviteUserModal";

const Users: FC = () => {
    const { data: users, isLoading } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [inviteUserModalIsOpen, setInviteUserModalIsOpen] = useState<boolean>(false);

    const onDeleteUser = async (id: string) => {
        await deleteUser(id).unwrap();
    };

    const columns: TableProps<IUser>['columns'] = [
        {
            title: "Ім'я",
            dataIndex: 'firstName',
            key: 'fullName',
            render: (text: string, userData: IUser) => userData.lastName + " " + userData.firstName
        },
        {
            title: "Емейл",
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => text
        },
        {
            title: "Роль",
            dataIndex: 'role',
            key: 'role',
            render: (role: { name: string }) => (
                <Tag color="blue">
                    {role?.name || 'Не призначено'}
                </Tag>
            )
        },
        {
            title: 'Дії',
            key: 'action',
            width: 120,
            render: (_: any, record: IUser) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined style={{ color: '#1890ff', fontSize: 20 }} />}
                        onClick={() => {
                            setSelectedUser(record);
                            setInviteUserModalIsOpen(true);
                        }}
                    />
                    <DeleteButton
                        buttonProps={{
                            type: "text",
                            icon: <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
                        }}
                        onDelete={() => record?.id && onDeleteUser(record?.id)}
                        title="Видалити користувача?"
                        description="Ви впевнені що хочете видалити користувача?"
                    />
                </Space>
            ),
        },
    ];

    return (
        <MainLayout>
            <h2 style={{ margin: 0 }}>Список користувачів</h2>
            <div style={{
                display: 'flex',
                justifyContent: 'end',
                marginBottom: 20
            }}>
                <Button type='primary' icon={<PlusOutlined />} onClick={() => setInviteUserModalIsOpen(true)}>Додати користувача</Button>
            </div>
            <Table<IUser> columns={columns} dataSource={users} loading={isLoading} />
            <InviteUserModal
                open={inviteUserModalIsOpen}
                onCancel={() => setInviteUserModalIsOpen(false)}
                selectedUser={selectedUser}
            />
        </MainLayout>
    );
};

export default Users;