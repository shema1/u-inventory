/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, Modal, ModalProps, Select } from "antd";
import { FC, useEffect } from "react";
import { IUser, IUserInvite } from "../../../../apis/user/interfaces";
import { useCreateInviteMutation, useUpdateUserMutation } from "../../../../apis/user/user";
import { useGetRolesQuery } from "../../../../apis/roles/roles";

interface UserEditModalProps extends ModalProps {
    open: boolean;
    onCancel: () => void;
    selectedUser: IUser | null
}

const UserEditModal: FC<UserEditModalProps> = ({ open, onCancel, selectedUser }) => {
    const [form] = Form.useForm<IUserInvite>();
    const [createInvite, { isLoading: isLoadingCreateInvite, isSuccess: isSuccessInviteUser }] = useCreateInviteMutation();
    const [updateUserInvite, { isLoading: isLoadingUserInviteUpdate, isSuccess: isSuccessUserInviteUpdate }] = useUpdateUserMutation();
    const { data: roles, isLoading: isLoadingRoles } = useGetRolesQuery();

    const formLoading = isLoadingCreateInvite || isLoadingUserInviteUpdate || isLoadingRoles;

    const onCreateUser = async () => {
        try {
            const values = await form.validateFields();
            await createInvite(values).unwrap();
        } catch (error) {
            console.error("Помилка при створенні користувача:", error);
        }
    }

    const onUpdateUserInvite = async () => {
        try {
            const values = await form.validateFields();
            console.log("values", values);
            await updateUserInvite({ id: selectedUser?.id, ...values }).unwrap();
        } catch (error) {
            console.error("Помилка при оновленні користувача:", error);
        }
    }

    const onClose = () => {
        form.resetFields();
        onCancel()
    }

    useEffect(() => {
        if (isSuccessInviteUser || isSuccessUserInviteUpdate) {
            onClose()
            form.resetFields();
        }
    }, [isSuccessInviteUser, isSuccessUserInviteUpdate])

    useEffect(() => {
        console.log("selectedUser", selectedUser);
        if (selectedUser) {
            form.setFieldsValue({
                email: selectedUser.email,
                lastName: selectedUser.lastName,
                firstName: selectedUser.firstName,
                roleId: selectedUser.role.id
            });
        }
    }, [selectedUser])

    const onFormValuesChange = (changedValues: any, allValues: any) => {
        console.log("Changed values:", changedValues);
        console.log("All form values:", allValues);
    };

    const onGenderChange = (value: string) => {
        console.log("value", value);
    };

    useEffect(() => {
        console.log("roles", roles);
    }, [roles])

    return <>
        <Modal
            title="Запросити користувача"
            okText={selectedUser ? "Оновити" : "Запросити"}
            cancelText="Скасувати"
            open={open}
            onCancel={onClose}
            onOk={selectedUser ? onUpdateUserInvite : onCreateUser}
            confirmLoading={formLoading}
        >
            <Form
                form={form}
                name="basic"
                layout='horizontal'
                labelCol={{ span: 4 }}
                autoComplete="off"
                style={{ marginTop: 26 }}
                onValuesChange={onFormValuesChange}
            >
                <Form.Item<IUserInvite>
                    label="Емейл"
                    name="email"
                    required
                    rules={[{ required: true, message: 'Вкажіть емейл' }, { type: 'email', message: 'Вкажіть коректний емейл' }]}
                >
                    <Input />
                </Form.Item>
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
                <Form.Item<IUserInvite>
                    label="Ім'я"
                    name="firstName"
                >
                    <Input />
                </Form.Item>
                <Form.Item<IUserInvite>
                    label="Прізвище"
                    name='lastName'
                >
                    <Input />
                </Form.Item>


            </Form>
        </Modal>
    </>
}

export default UserEditModal;