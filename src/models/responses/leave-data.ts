export type LeaveType = "annual-leave" | "sick-leave" | "casual-leave";
export type LeaveApprovalStatus = "approved" | "pending" | "rejected";

export interface LeaveData {
    id: string,
    empId: string,
    name: string,
    department: string,
    leaveType: LeaveType,
    leaveStartDate: string,
    leaveEndDate: string,
    duration: number,
    status: LeaveApprovalStatus,
    approver: string,
    reasonForLeave: string,
    leaveBalance?: Record<LeaveType, number>,
}