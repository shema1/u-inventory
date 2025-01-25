/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormProps, Input, Modal, ModalProps } from "antd";
import { FC, useEffect } from "react";
import { useCreateInviteMutation, useUpdateInviteMutation } from "../../../../apis/inviteUser/inviteUser";
import { IUserInvite } from "../../../../apis/inviteUser/interfaces";

interface InviteUserModalProps extends ModalProps {
    open: boolean;
    onCancel: () => void;
    selectedUser: IUserInvite | null

}

const InviteUserModal: FC<InviteUserModalProps> = ({ open, onCancel, selectedUser }) => {

    const [form] = Form.useForm();
    const [createUser, { isLoading: isLoadingCreateInvite, isSuccess: isSuccessInviteUser }] = useCreateInviteMutation();

    const [updateUserInvite, { isLoading: isLoadingUserInviteUpdate, isSuccess: isSuccessUserInviteUpdate }] = useUpdateInviteMutation();

    const formLoading = isLoadingCreateInvite || isLoadingUserInviteUpdate

    const onFinish: FormProps<IUserInvite>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<IUserInvite>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const onCreateUser = async () => {
        try {
            const values = await form.validateFields();
            createUser(values);
        } catch (error) {
            console.log("Помилка при валідації форми:", error);
        }
    }

    const onUpdateUserInvite = async () => {
        try {
            const values = await form.validateFields();
            updateUserInvite({id: selectedUser?.id, ...values})
        } catch (error) {
            console.log("Помилка при валідації форми:", error);

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
            loading={isLoadingCreateInvite}
        >
            <Form
                form={form}
                name="basic"
                layout='horizontal'
                labelCol={{ span: 4 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    label="Прізвише"
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