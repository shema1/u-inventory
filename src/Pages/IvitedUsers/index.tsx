import { FC, useEffect, useState } from "react";
import { Button, Space, Table, TableProps } from "antd";
import MainLayout from "../../Layout/MainLayout";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import InviteUserModal from "./components/InviteUserModal";
import { useDeleteInviteMutation, useLazyGetInvitedUsersQuery } from "../../apis/inviteUser/inviteUser";
import { blue, red } from '@ant-design/colors';
import { IUserInvite } from "../../apis/inviteUser/interfaces";
import DeleteButton from "../../components/core/DeleteButton";
import { format } from "date-fns";

const IvitedUsers: FC = () => {

    
    const [getInvitedUsers, { data: invitedUsers, isLoading: invitedUsersIsLoading }] = useLazyGetInvitedUsersQuery();
    const [deleteInvite, { isLoading: deleteInviteLoading }] = useDeleteInviteMutation();

    const [selectedUser, setSelectedUser] = useState<IUserInvite | null>(null);
    const [inviteUserModalIsOpen, setInviteUserModalIsOpen] = useState<boolean>(false);

    const tableLoading = invitedUsersIsLoading || deleteInviteLoading;

    const onDeleteInvite = (id: string) => {
        deleteInvite(id)
    }

    const onSelectUser = (user: IUserInvite) => {
        setSelectedUser(user);
        setInviteUserModalIsOpen(true);
    }

    useEffect(() => {
        getInvitedUsers();
    }, [])

    useEffect(() => {
        if(!inviteUserModalIsOpen){
            setSelectedUser(null)
        }
    },[inviteUserModalIsOpen])

    const columns: TableProps<IUserInvite>['columns'] = [
        {
            title: "Ім'я",
            dataIndex: 'firstName',
            key: 'fullName',
            render: (text: string, userData: IUserInvite) => userData.lastName + " " + userData.firstName
        },
        {
            title: "Емейл",
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => text
        },
        {
            title: "Дата",
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => text ? format(new Date(text), 'yyyy/MM/dd HH:mm') : ''
        },
        {
            title: 'Дії',
            key: 'action',
            width: 150,
            render: (_: any, record: IUserInvite) => (
                <Space size="middle">
                    <Button
                        type='text'
                        icon={<EditOutlined
                            style={{ color: blue[5], fontSize: 20 }} />}
                        onClick={() => onSelectUser(record)}
                    />
                    <DeleteButton
                        onDelete={() => record?.id && onDeleteInvite(record?.id)}
                        title="Видалити запрошення?"
                        description="ви впевнені що хочете видалити запрошеного користувача?"
                    />
                </Space>
            ),
        },
    ];


    return <>
        <MainLayout>
            <div style={{
                display: 'flex',
                justifyContent: 'end',
                marginBottom: 20
            }}>
                <Button type='primary' icon={<PlusOutlined />} onClick={() => setInviteUserModalIsOpen(true)}>Додати користувача</Button>
            </div>
            <Table<IUserInvite> columns={columns} dataSource={invitedUsers} loading={tableLoading} />
        </MainLayout>
        <InviteUserModal
            open={inviteUserModalIsOpen}
            onCancel={() => setInviteUserModalIsOpen(false)}
            selectedUser={selectedUser}
        />
    </>

}

export default IvitedUsers