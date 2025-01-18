import { FC, useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import { IItem, IItemMetrics } from "../../apis/items/interfaces";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useLazyGetItemsQuery } from "../../apis/items/user";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import { MergeCellsOutlined } from "@ant-design/icons";



const Inventory: FC = () => {

    const [getItems, { data: itemsData, isLoading: isLoadingItemsData }] = useLazyGetItemsQuery()
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    useEffect(() => {
        getItems()
    }, [])


    const shortInfoColumns: TableColumnsType<IItem> = [
        { title: 'Номер', dataIndex: 'itemId', key: 'itemId' },
        { title: 'Назва', dataIndex: 'itemName', key: 'itemName' },
        { title: 'Відповідальний', dataIndex: 'ownerName', key: 'ownerName' },
    ]

    useEffect(() => {
        console.log("expandedRowKeys", expandedRowKeys)
    }, [expandedRowKeys])

    const handleExpand = (expanded: boolean, record: IItem) => {
        setExpandedRowKeys((prevExpandedRowKeys) => {
            if (expanded && !prevExpandedRowKeys.find((elem) => elem === record.id)) {
                return [...prevExpandedRowKeys, record.id];
            } else {
                return prevExpandedRowKeys.filter((key) => key !== record.id);
            }
        });
    };

    return <>
        <MainLayout>
            <h1>Inventory</h1>
            <Button icon={<MergeCellsOutlined />} />
            {/* <Table<IItem> dataSource={itemsData} loading={isLoadingItemsData} bordered>
                <ColumnGroup title="Найменування">
                    <Column title="Номер" dataIndex="itemId" key="itemId" />
                    <Column title="Назва" dataIndex="itemName" key="itemName" />
                </ColumnGroup>
                <ColumnGroup title="Вартість">
                    <Column title="Зал. на  поч." dataIndex="cost" key="commonValueStartPeriod" render={(value: IItemMetrics) => value.commonValueStartPeriod} />
                    <Column title="Прибуло" dataIndex="cost" key="arrived" render={(value: IItemMetrics) => value.arrived} />
                    <Column title="Вибуло" dataIndex="cost" key="departed" render={(value: IItemMetrics) => value.departed} />
                    <Column title="Зал. на кін." dataIndex="cost" key="commonValueEndPeriod" render={(value: IItemMetrics) => value.commonValueEndPeriod} />
                </ColumnGroup>
                <ColumnGroup title="Знос">
                    <Column title="Зал. на  поч." dataIndex="depreciation" key="commonValueStartPeriod" render={(value: IItemMetrics) => value.commonValueStartPeriod} />
                    <Column title="Прибуло" dataIndex="depreciation" key="arrived" render={(value: IItemMetrics) => value.arrived} />
                    <Column title="Вибуло" dataIndex="depreciation" key="departed" render={(value: IItemMetrics) => value.departed} />
                    <Column title="Зал. на кін." dataIndex="depreciation" key="commonValueEndPeriod" render={(value: IItemMetrics) => value.commonValueEndPeriod} />
                </ColumnGroup>
                <ColumnGroup title="Кількість">
                    <Column title="Зал. на  поч." dataIndex="quantity" key="commonValueStartPeriod" render={(value: IItemMetrics) => value.commonValueStartPeriod} />
                    <Column title="Прибуло" dataIndex="quantity" key="arrived" render={(value: IItemMetrics) => value.arrived} />
                    <Column title="Вибуло" dataIndex="quantity" key="departed" render={(value: IItemMetrics) => value.departed} />
                    <Column title="Зал. на кін." dataIndex="quantity" key="commonValueEndPeriod" render={(value: IItemMetrics) => value.commonValueEndPeriod} />
                </ColumnGroup>
                <Column title="Відповідальний" dataIndex="ownerName" key="ownerName" />
            </Table> */}

            <Table<IItem>
                columns={shortInfoColumns}
                rowKey={'id'}
                expandable={{
                    expandedRowRender: (record) => {
                        return (
                            <div 
                            style={{marginLeft: -5}}
                            >

                            <Table<IItem> 
                            dataSource={[record]} 
                            loading={isLoadingItemsData} 
                            bordered
                            pagination={false}
                            >
                                <ColumnGroup title="Вартість">
                                    <Column title="Зал. на  поч." dataIndex="cost" key="commonValueStartPeriod" render={(value: IItemMetrics) => value.commonValueStartPeriod} />
                                    <Column title="Прибуло" dataIndex="cost" key="arrived" render={(value: IItemMetrics) => value.arrived} />
                                    <Column title="Вибуло" dataIndex="cost" key="departed" render={(value: IItemMetrics) => value.departed} />
                                    <Column title="Зал. на кін." dataIndex="cost" key="commonValueEndPeriod" render={(value: IItemMetrics) => value.commonValueEndPeriod} />
                                </ColumnGroup>
                                <ColumnGroup title="Знос">
                                    <Column title="Зал. на  поч." dataIndex="depreciation" key="commonValueStartPeriod" render={(value: IItemMetrics) => value.commonValueStartPeriod} />
                                    <Column title="Прибуло" dataIndex="depreciation" key="arrived" render={(value: IItemMetrics) => value.arrived} />
                                    <Column title="Вибуло" dataIndex="depreciation" key="departed" render={(value: IItemMetrics) => value.departed} />
                                    <Column title="Зал. на кін." dataIndex="depreciation" key="commonValueEndPeriod" render={(value: IItemMetrics) => value.commonValueEndPeriod} />
                                </ColumnGroup>
                                <ColumnGroup title="Кількість">
                                    <Column title="Зал. на  поч." dataIndex="quantity" key="commonValueStartPeriod" render={(value: IItemMetrics) => value.commonValueStartPeriod} />
                                    <Column title="Прибуло" dataIndex="quantity" key="arrived" render={(value: IItemMetrics) => value.arrived} />
                                    <Column title="Вибуло" dataIndex="quantity" key="departed" render={(value: IItemMetrics) => value.departed} />
                                    <Column title="Зал. на кін." dataIndex="quantity" key="commonValueEndPeriod" render={(value: IItemMetrics) => value.commonValueEndPeriod} />
                                </ColumnGroup>
                            </Table>
                            </div>

                        )
                    },
                    expandedRowKeys,
                    onExpand: handleExpand, // Обробник розгортання
                    expandRowByClick: true

                }}
                dataSource={itemsData}
            />
        </MainLayout>
    </>

}

export default Inventory;