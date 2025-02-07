/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormProps, Input, Modal, ModalProps } from "antd";
import { FC, useEffect } from "react";
import { IUserInvite } from "../../../../apis/inviteUser/interfaces";
import { IUser } from "../../../../apis/user/interfaces";
import { useCreateInviteMutation, useUpdateUserMutation } from "../../../../apis/user/user";

interface InviteUserModalProps extends ModalProps {
    open: boolean;
    onCancel: () => void;
    selectedUser: IUser | null

}

const InviteUserModal: FC<InviteUserModalProps> = ({ open, onCancel, selectedUser }) => {

    const [form] = Form.useForm<IUserInvite>();
    const [createUser, { isLoading: isLoadingCreateInvite, isSuccess: isSuccessInviteUser }] = useCreateInviteMutation();

    const [updateUserInvite, { isLoading: isLoadingUserInviteUpdate, isSuccess: isSuccessUserInviteUpdate }] = useUpdateUserMutation();

    const formLoading = isLoadingCreateInvite || isLoadingUserInviteUpdate

    const onCreateUser = async () => {
        try {
            const values = await form.validateFields();
            await createUser(values).unwrap();
        } catch (error) {
            console.error("Помилка при створенні користувача:", error);
        }
    }

    const onUpdateUserInvite = async () => {
        try {
            const values = await form.validateFields();
            const { createdAt, ...userData } = values;
            await updateUserInvite({id: selectedUser?.id, ...userData}).unwrap();
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
        if (selectedUser) {
            form.setFieldsValue({
                email: selectedUser.email,
                lastName: selectedUser.lastName,
                firstName: selectedUser.firstName,
            });
        }
    }, [selectedUser])

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
                    label="Прізвище"
                    name='lastName'
                >
                    <Input />
                </Form.Item>
                <Form.Item<IUserInvite>
                    label="Ім'я"
                    name="firstName"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default InviteUserModal;