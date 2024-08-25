export interface StockMovementItem {
    serialNo: string;
    siteName: string;
    itemName: string;
    stockInDate: string;
    stockOutDate?: string;
    balanceStock: string;
    daysInventoryOutstanding: number;
}