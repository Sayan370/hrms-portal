export type AttendanceStatus = "leave" | "present" | "late-arrival" | "absent" | "over-time"

export interface AttendanceData {
    id: string,
    empId: string,
    name: string,
    // date: string,
    attendanceStatus: Record<string, { status: AttendanceStatus, workingHours: number }>
}
export interface AttendanceDailyData {
    id: string,
    empId: string,
    name: string,
    date: string,
    shift: string,
    profileType: string,
    profile: string,
    inTime: string,
    outTime: string,
    workingHours: number,
    attendanceStatus: AttendanceStatus,
}

export type AttendanceDailyFormData = Pick<AttendanceDailyData, "workingHours" | "shift" | "inTime" | "outTime">;