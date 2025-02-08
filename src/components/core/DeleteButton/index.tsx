import { Button, Popconfirm, ButtonProps } from "antd";
import { FC } from "react";



interface DeleteButtonProps {
    onDelete: () => void;
    title: string;
    description: string;
    buttonProps?: ButtonProps;
}

const DeleteButton: FC<DeleteButtonProps> = ({ 
    onDelete, 
    title, 
    description,
    buttonProps 
}) => {
    return (
        <Popconfirm
            title={title}
            description={description}
            onConfirm={onDelete}
            okText="Так"
            cancelText="Ні"
        >
            <Button danger {...buttonProps}>
                {buttonProps?.children || ''}
            </Button>
        </Popconfirm>
    );
}

export default DeleteButton;