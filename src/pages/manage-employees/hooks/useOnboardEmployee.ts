import dayjs from "dayjs";
import { useFormik } from "formik";
import * as yup from "yup";

import { EmployeeData } from "@/models/responses/employee-data";

interface UseOnboardEmployeeProps {
    editData?: EmployeeData;
    handleSubmit: (data: EmployeeData) => void;
    handleClose: () => void;
}
const useOnboardEmployee = ({
    editData,
    handleSubmit: onSubmit,
}: UseOnboardEmployeeProps) => {
    const handleSubmit = ({ ...values }: typeof initialValues) => {
        onSubmit({ ...values, empId: "", status: "Active" });
    };

    const handleReset = () => { };
    const initialValues = {
        // workingHours: editData?.workingHours ?? 0,
        // shift: editData?.shift ?? "",
        // inTime: editData?.inTime ?? null,
        // outTime: editData?.outTime ?? null,
        // id: string,
        // empId: editData?.empId ?? null,
        name: editData?.name ?? null,
        dob: editData?.dob ?? null,
        phone: editData?.phone ?? null,
        gender: editData?.gender ?? null,
        position: editData?.position ?? null, // jobTitle
        departmentName: editData?.departmentName ?? null,
        employmentType: editData?.employmentType ?? null,
        shift: editData?.shift ?? null,
        dateOfJoining: editData?.dateOfJoining ?? null,
        skill: editData?.skill ?? null,
        site: editData?.site ?? null,
    };

    const validationSchema = yup.object().shape({
        // empId: yup
        //     .string()
        //     .label("Employee Id")
        //     .required("This is a mandatory field"),
        name: yup.string().label("Name").required("This is a mandatory field"),
        dob: yup
            .string()
            .label("Date of Birth")
            .required("This is a mandatory field"),
        phone: yup
            .string()
            .label("Phone Number")
            .required("This is a mandatory field"),
        gender: yup
            .string()
            .label("Gender")
            .required("This is a mandatory field"),
        position: yup
            .string()
            .label("Job Title")
            .required("This is a mandatory field"),
        departmentName: yup
            .string()
            .label("Department Name")
            .required("This is a mandatory field"),
        employmentType: yup
            .string()
            .label("Employment Type")
            .required("This is a mandatory field"),
        shift: yup
            .string()
            .label("Shift")
            .required("This is a mandatory field"),
        dateOfJoining: yup
            .string()
            .label("Date of Joining")
            .required("This is a mandatory field"),
        skill: yup
            .string()
            .label("Skill")
            .required("This is a mandatory field"),
        site: yup.string().label("Site").required("This is a mandatory field"),
        // status: yup
        //     .string()
        //     .label("Status")
        //     .required("This is a mandatory field"),
    });

    const editEmployeeData = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: handleSubmit,
        onReset: handleReset,
        enableReinitialize: true,
    });
    const formSchema = {
        // empId: {
        //     label: "Employee Id",
        //     name: "empId",
        //     value: editEmployeeData?.values?.empId,
        //     errorMessage: editEmployeeData?.errors?.empId,
        // },
        name: {
            label: "Name",
            name: "name",
            value: editEmployeeData?.values?.name,
            errorMessage: editEmployeeData?.errors?.name,
        },
        dob: {
            label: "Date of Birth",
            name: "dob",
            value: editEmployeeData?.values?.dob
                ? dayjs(editEmployeeData?.values?.dob)
                : null,
            errorMessage: editEmployeeData?.errors?.dob,
        },
        phone: {
            label: "Phone",
            name: "phone",
            value: editEmployeeData?.values?.phone,
            errorMessage: editEmployeeData?.errors?.phone,
        },
        gender: {
            label: "Gender",
            name: "gender",
            value: editEmployeeData?.values?.gender,
            errorMessage: editEmployeeData?.errors?.gender,
        },
        position: {
            label: "Job Title",
            name: "position",
            value: editEmployeeData?.values?.position,
            errorMessage: editEmployeeData?.errors?.position,
        },
        departmentName: {
            label: "Department Name",
            name: "departmentName",
            value: editEmployeeData?.values?.departmentName,
            errorMessage: editEmployeeData?.errors?.departmentName,
        },
        employmentType: {
            label: "Employment Type",
            name: "employmentType",
            value: editEmployeeData?.values?.employmentType,
            errorMessage: editEmployeeData?.errors?.employmentType,
        },
        shift: {
            label: "Shift",
            name: "shift",
            value: editEmployeeData?.values?.shift,
            errorMessage: editEmployeeData?.errors?.shift,
        },
        dateOfJoining: {
            label: "Date of Joining",
            name: "dateOfJoining",
            value: editEmployeeData?.values?.dateOfJoining
                ? dayjs(editEmployeeData?.values?.dateOfJoining)
                : null,
            errorMessage: editEmployeeData?.errors?.dateOfJoining,
        },
        skill: {
            label: "Skill",
            name: "skill",
            value: editEmployeeData?.values?.skill,
            errorMessage: editEmployeeData?.errors?.skill,
        },
        site: {
            label: "Site",
            name: "site",
            value: editEmployeeData?.values?.site,
            errorMessage: editEmployeeData?.errors?.site,
        },
    };
    return {
        formSchema,
        editEmployeeData,
    };
};

export default useOnboardEmployee;
