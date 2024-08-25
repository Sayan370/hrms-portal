export enum MaintenanceType {
    Daily_Maintenance,
    Schedule_Maintenance,
    Grease,
    Washing
}


export interface MaintenanceData {
    id: string,
    doorNo: string,
    date: string,
    maintenanceType: MaintenanceType,
    timeTaken: string,
    maintenanceDone: string[],
    totalTimeTakenDay: string,
    totalTimeTakenVehicle: string,
}

export interface MaintenanceFormData extends Pick<MaintenanceData, 'id' | 'doorNo' | 'date' | 'maintenanceDone' | 'maintenanceType'> {
    start_Time: string;
    end_Time: string;
    vehicle_category: string;
    others: string;
}