import { FC, useEffect } from "react";
import { Table, TableProps } from "antd";
import MainLayout from "../../Layout/MainLayout";
import { useLazyGetUsersQuery } from "../../apis/user/user";
import { IUser } from "../../apis/user/interfaces";



const Users: FC = () => {

    const [getUsers, { data: usersData, isLoading }] = useLazyGetUsersQuery()

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        console.log("usersData", usersData);
    }, [usersData])

    const columns: TableProps<IUser>['columns'] = [
        {
            title: "Ім'я",
            dataIndex: 'firstName',
            key: 'fullName',
            render: (text: string, userData: IUser) => {
                return <a>{text + " " + userData.lastName}</a>
            },
        },
        {
            title: "Емейл",
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => <a>{text}</a>,
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_: any, { tags }: any) => (
        //         <>
        //             {tags.map((tag: any) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_: any, record: any) => (
        //         <Space size="middle">
        //             <a>Заблокувати</a>
        //             <a>Видалити</a>
        //         </Space>
        //     ),
        // },
    ];


    return <>
        <MainLayout>
            <Table<IUser> columns={columns} dataSource={usersData} loading={isLoading} />
        </MainLayout>
    </>

}

export default Users