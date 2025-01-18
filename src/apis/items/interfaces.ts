
export interface IItemMetrics {
    commonValueStartPeriod: number;
    arrived: number;
    departed: number;
    commonValueEndPeriod: number;
}

export interface IItem {
    id: string;
    itemId: string;
    itemName: string;
    ownerName: string;
    cost: IItemMetrics;
    depreciation: IItemMetrics;
    quantity: IItemMetrics;
}
