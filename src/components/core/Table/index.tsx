import { FC } from "react"
import { Table as AntTable, TableProps } from 'antd';
const Table: FC<TableProps> = (props) => {
    return <AntTable {...props} />
}

export default Table