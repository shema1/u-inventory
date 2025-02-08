import { FC, useEffect } from "react";
import { Form, Modal, Select } from "antd";
import { useLazyGetRolesQuery } from "../../../../apis/roles/roles";
import { IUser, IUserConfirmPending, IUserInvite } from "../../../../apis/user/interfaces";
import { useUpdateUserMutation } from "../../../../apis/user/user";

interface ConfirmPendingUserProps {
    visible: boolean;
    selectedUser: IUser | null
    onOk: () => void;
    onCancel: () => void;
}


const ConfirmPendingUser: FC<ConfirmPendingUserProps> = ({ visible, onOk, onCancel, selectedUser }) => {
    const [form] = Form.useForm<IUserConfirmPending>();

    const [getRoles, { data: roles, isLoading: isLoadingRoles }] = useLazyGetRolesQuery();
    const [confirmUser, { isLoading: isLoadingUserInviteUpdate, }] = useUpdateUserMutation();

    const isLoading = isLoadingRoles || isLoadingUserInviteUpdate;
    const onSubmitUser = async () => {
        try {
            const values = await form.validateFields();
            if (selectedUser) {
                await confirmUser({ id: selectedUser.id, status: 'active', ...values }).unwrap();
                onOk();
            }
        } catch (error) {
            console.error("Помилка при оновленні користувача:", error);
        }
    }

    useEffect(() => {
        if (visible) {
            getRoles();
        }
    }, [visible, getRoles]);

    return (
        <Modal
            title="Виберіть роль для підтвердження"
            open={visible}
            onOk={onSubmitUser}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                form={form}
                name="basic"
                layout='horizontal'
                labelCol={{ span: 4 }}
                autoComplete="off"
                style={{ marginTop: 26 }}
            >

                <Form.Item<IUserInvite>
                    label="Роль"
                    name="roleId"
                    rules={[{ required: true, message: 'Виберіть роль користувача' }]}
                >
                    <Select
                        loading={isLoadingRoles}
                        placeholder="Виберіть роль"
                        options={roles?.map(role => ({
                            label: role.name,
                            value: role.id,
                            key: role.id
                        }))}
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default ConfirmPendingUser;