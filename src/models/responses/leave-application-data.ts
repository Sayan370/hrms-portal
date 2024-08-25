export enum TypeOfLeave {
    SickLeave,
    CasualLeave,
    AnnualLeave,
    MaternityPaternityLeave,
    BereavementLeave,
    UnpaidLeave,
    Other,
    NotApplicable
}

export interface LeaveApplicationFormData {
    id: string;
    fullName: string;
    employeeId: string;
    department: string;
    jobTitle: string;
    managerName: string;
    emailAddress: string;
    phoneNumber: string;
    typeOfLeave: TypeOfLeave;
    startDateOfLeave: string;
    endDateOfLeave: string;
    numberOfDaysOfLeave: string;
    reasonForLeave: string;
    remarks?: string; // Optional field
}