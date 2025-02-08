import { FC, useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";
import { IRole, ICreateRoleDto, Permission } from "../../../../apis/roles/interfaces";
import { useCreateRoleMutation, useUpdateRoleMutation } from "../../../../apis/roles/roles";

interface RoleModalProps {
    open: boolean;
    onCancel: () => void;
    selectedRole: IRole | null;
}

const RoleModal: FC<RoleModalProps> = ({ open, onCancel, selectedRole }) => {
    const [form] = Form.useForm<ICreateRoleDto>();
    const [createRole, { isLoading: isLoadingCreate, isSuccess: isSuccessCreate }] = useCreateRoleMutation();
    const [updateRole, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate }] = useUpdateRoleMutation();

    const formLoading = isLoadingCreate || isLoadingUpdate;

    const onCreateRole = async () => {
        try {
            const values = await form.validateFields();
            await createRole(values).unwrap();
        } catch (error) {
            console.error("Помилка при створенні ролі:", error);
        }
    }

    const onUpdateRole = async () => {
        try {
            const values = await form.validateFields();
            await updateRole({ id: selectedRole?.id!, ...values }).unwrap();
        } catch (error) {
            console.error("Помилка при оновленні ролі:", error);
        }
    }

    const onClose = () => {
        form.resetFields();
        onCancel();
    }

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            onClose();
        }
    }, [isSuccessCreate, isSuccessUpdate]);

    useEffect(() => {
        if (selectedRole) {
            form.setFieldsValue({
                name: selectedRole.name,
                description: selectedRole.description,
                permissions: selectedRole.permissions,
            });
        }
    }, [selectedRole]);

    return (
        <Modal
            title={selectedRole ? "Редагувати роль" : "Створити роль"}
            okText={selectedRole ? "Оновити" : "Створити"}
            cancelText="Скасувати"
            open={open}
            onCancel={onClose}
            onOk={selectedRole ? onUpdateRole : onCreateRole}
            confirmLoading={formLoading}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ marginTop: 20 }}
            >
                <Form.Item
                    label="Назва"
                    name="name"
                    rules={[{ required: true, message: 'Вкажіть назву ролі' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Опис"
                    name="description"
                    rules={[{ required: true, message: 'Вкажіть опис ролі' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Права доступу"
                    name="permissions"
                    rules={[{ required: true, message: 'Виберіть хоча б одне право доступу' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Виберіть права доступу"
                        style={{ width: '100%' }}
                        options={Object.values(Permission).map(permission => ({
                            label: permission,
                            value: permission
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default RoleModal; 