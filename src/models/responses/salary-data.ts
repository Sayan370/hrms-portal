export interface SalaryData {
    id: string,
    empId: string,
    name: string,
    payDate: string,
    payPeriod: string,
    pfNo: string,
    pfUAN: string,
    panNo: string,
    jobRole: string,
    salaryDetails: {
        earnings: Record<string, number>,
        deductions: Record<string, number>,
    }
}