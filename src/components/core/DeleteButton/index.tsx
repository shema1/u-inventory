import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { FC } from "react";
import { red } from '@ant-design/colors';



interface DeleteButtonProps {
    onDelete: () => void;
    title?: string;
    description?: string
}

const DeleteButton: FC<DeleteButtonProps> = ({ 
    onDelete,
    title = "Delete the task",
    description = "Are you sure to delete this task?"
}) => {

    return <>
        <Popconfirm
            title={title}
            description={description}
            onConfirm={onDelete}
            okText="Так"
            cancelText="Ні"
        >
            <Button
                type='text' color="red"
                icon={<DeleteOutlined style={{ color: red[5], fontSize: 20 }} />} />
        </Popconfirm>

    </>

}

export default DeleteButton;