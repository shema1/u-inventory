import {  FC, useState } from "react";
import {  Space, Table, TableProps, Tag, theme } from "antd";
import MainLayout from "../../Layout/MainLayout";


interface DataType {
    key: string;
    name: string;
    tags: string[];
  }
  


const Users: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()


      const columns: TableProps<DataType>['columns'] = [
        {
          title: "Ім'я",
          dataIndex: 'name',
          key: 'name',
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (_:any, { tags }: any) => (
            <>
              {tags.map((tag: any) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_: any, record: any) => (
            <Space size="middle">
              <a>Заблокувати</a>
              <a>Видалити</a>
            </Space>
          ),
        },
      ];
      
      const data: DataType[] = [
        {
          key: '1',
          name: 'John Brown',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          tags: ['cool', 'teacher'],
        },
      ]
    return <>
        <MainLayout>
            <Table<DataType>  columns={columns} dataSource={data}/>
        </MainLayout>
    </>

}

export default Users