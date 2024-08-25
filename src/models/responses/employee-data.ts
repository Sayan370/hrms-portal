export type EmployeeStatus = "active" | "inactive";

export type EmployeeRole =
    | "Driller"
    | "Heavy Equipment Operator"
    | "Surveyor"
    | "Maintenance Technician"
    | "Site Manager"
    | "HR Admin"
    | "Tipper Driver";

export type EmployeeSkill =
    | "Unskilled"
    | "Semi-Skilled"
    | "Skilled"
    | "Highly Skilled";

export interface EmployeeData {
    // id: string | null;
    empId: string | null;
    name: string | null;
    dob: string | null;
    phone: string | null;
    gender: "Male" | "Female" | "Other" | null;
    position: string | null; // jobTitle
    departmentName: string | null;
    employmentType: "Permanent" | "Contractual" | null;
    shift: "Morning" | "Afternoon" | "Night" | null;
    dateOfJoining: string | null;
    skill: string | null;
    site: string | null;
    status: "Active" | "Inactive" | null;
}
