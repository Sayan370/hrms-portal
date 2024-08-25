
export enum StockHistoryCategory {
    Exc,
    Tippers,
    Maintenance_Team
}


export interface StockHistoryData {
    id: string,
    category: StockHistoryCategory,
    name: string,
    qty: number,
    unit: string,
    rateOfUnit: number,
    amount: number,
    sellerName: string,
    dateOfPurchase: string,
    dateOfRecieving: string,
    qtyOfRecieving: number,
    dateOfRequisition: string,
    qtyOfRequisition: number,
    requesterName: string
}
export interface RequisitionData {
    id: string,
    category: StockHistoryCategory,
    name: string,
    dateOfRequisition: string,
    dateOfRecieving: string,
    qty: number,
    unit: string,
    rateOfUnit: number,
    amount: number,
    requesterName: string,
    authorizerL1: string,
    authorizerL2: string,
}