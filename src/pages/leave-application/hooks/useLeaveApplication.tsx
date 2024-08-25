import appToast from "@/components/app-toast";
import { QueryConst } from "@/constants/query-constants";
import { AwaitedReturnType } from "@/models/utility-types";
import { setMainenance } from "@/services/api/maintenance-ep";
import { getEnumEntries, separateWords } from "@/utils/object-utils";
import { createFilterOptions } from "@mui/material";
import dayjs from "dayjs";
import { FormikHelpers, useFormik } from "formik";
import { useMutation } from "react-query";
import * as yup from "yup";
import { LeaveApplicationFormData, TypeOfLeave } from "@/models/responses/leave-application-data";
import { setLeaveApplication } from "@/services/api/leave-ep";
import { useEffect } from "react";



interface ListValue {
    label: string;
    value: string;
}

const useLeaveApplication = () => {
    const {
        data: mutData,
        error: mutError,
        status: mutStatus,
        mutateAsync,
    } = useMutation<
        AwaitedReturnType<typeof setLeaveApplication>,
        Error,
        LeaveApplicationFormData
    >([QueryConst.setLeaveApplication], setLeaveApplication);

    const getTypeofLeave = () =>
        getEnumEntries(TypeOfLeave).map(
            ([label, value]: [string, string]) => ({
                label: separateWords(label),
                value,
            })
        );
    const getLeaveApplicationValue = (value: TypeOfLeave) => {
        const data = getTypeofLeave()?.find(
            (d) => Number(d?.value) === value
        );
        return data
            ? {
                label: data?.label ?? "",
                value: data.value,
            }
            : null;
    };

    const filterOptions = createFilterOptions<ListValue>({
        matchFrom: "any",
        stringify: (option) =>
            `${option.label}-${option.value}`,
    });

    const handleLeaveApplicationSubmit = async (
        values: LeaveApplicationFormData,
        { setSubmitting }: FormikHelpers<LeaveApplicationFormData>
    ) => {

        mutateAsync(values).then((d) => {
            appToast.success(d || "Leave Application Submitted successfully");
            leaveApplicationFormState.resetForm();
        });
    };
    const initialValues: LeaveApplicationFormData = {
        id: "",
        fullName: "",
        employeeId: "",
        department: "",
        jobTitle: "",
        managerName: "",
        emailAddress: "",
        phoneNumber: "",
        typeOfLeave: TypeOfLeave.SickLeave,
        startDateOfLeave: "",
        endDateOfLeave: "",
        numberOfDaysOfLeave: "",
        reasonForLeave: "",
        remarks: "",
    }
    type FormValues = typeof initialValues;

    const handleReset = (
        values: FormValues,
        { setValues }: FormikHelpers<FormValues>
    ) => {
        // logger.log("reset", getInitialValues(), values);
        setValues(initialValues, false);
    };

    const leaveApplicationFormState = useFormik<LeaveApplicationFormData>({
        initialValues,
        validationSchema: yup.object().shape({
            fullName: yup.string().required("This is a mandatory field"),
            employeeId: yup.string().required("This is a mandatory field"),
            department: yup.string().required("This is a mandatory field"),
            jobTitle: yup.string().required("This is a mandatory field"),
            managerName: yup.string().required("This is a mandatory field"),
            emailAddress: yup
                .string()
                .email("Invalid email address")
                .required("This is a mandatory field"),
            phoneNumber: yup
                .string()
                .test("len", "Please Enter a 10 digit number", (val) => {
                    const filteredData = val?.replace(
                        /^\+?91|\D|\s|\(|\)/g,
                        ""
                    ).length;
                    return filteredData === 10;
                })
                .required("This is a mandatory field"),
            typeOfLeave: yup.string().required("This is a mandatory field"),
            startDateOfLeave: yup.string().required("This is a mandatory field"),
            endDateOfLeave: yup.string().required("This is a mandatory field"),
            numberOfDaysOfLeave: yup.string().required("This is a mandatory field"),
            reasonForLeave: yup.string().required("This is a mandatory field"),
            remarks: yup.string().nullable(),
        }),
        onSubmit: handleLeaveApplicationSubmit,
        onReset: handleReset
    });

    useEffect(() => {
        if (leaveApplicationFormState.values.startDateOfLeave && leaveApplicationFormState.values.endDateOfLeave) {
            const startDate = dayjs(leaveApplicationFormState.values.startDateOfLeave);
            const endDate = dayjs(leaveApplicationFormState.values.endDateOfLeave);

            // Calculate the difference in days, including both start and end dates
            const numberOfDaysOfLeave = endDate.diff(startDate, 'day') + 1;

            if (!Number.isNaN(numberOfDaysOfLeave)) {

                leaveApplicationFormState.setFieldValue("numberOfDaysOfLeave", numberOfDaysOfLeave);
            }


        }

    }, [leaveApplicationFormState.values.startDateOfLeave, leaveApplicationFormState.values.endDateOfLeave])
    const formSchema = {
        fullName: {
            value: leaveApplicationFormState?.values?.fullName,
            label: "Full Name",
            name: "fullName",
            errorMessage: leaveApplicationFormState?.errors?.fullName as any,
        },
        employeeId: {
            value: leaveApplicationFormState.values?.employeeId || "",
            label: "Employee ID",
            name: "employeeId",
            errorMessage: leaveApplicationFormState?.errors?.employeeId as any,
        },
        department: {
            value: leaveApplicationFormState.values?.department || "",
            label: "Department",
            name: "department",
            errorMessage: leaveApplicationFormState?.errors?.department as any,
        },
        jobTitle: {
            value: leaveApplicationFormState.values?.jobTitle || "",
            label: "Job Title",
            name: "jobTitle",
            errorMessage: leaveApplicationFormState?.errors?.jobTitle as any,
        },
        managerName: {
            value: leaveApplicationFormState.values?.managerName || "",
            label: "Manager Name",
            name: "managerName",
            errorMessage: leaveApplicationFormState?.errors?.managerName as any,
        },
        emailAddress: {
            value: leaveApplicationFormState?.values.emailAddress || "",
            label: "Email Address",
            name: "emailAddress",
            errorMessage: leaveApplicationFormState?.errors?.emailAddress as any,
        },
        phoneNumber: {
            value: leaveApplicationFormState.values?.phoneNumber || "",
            label: "Phone Number",
            name: "phoneNumber",
            errorMessage: leaveApplicationFormState?.errors?.phoneNumber as any,
            mask: "+\\91 (999) 999 9999",
            maskChar: "_",
        },
        typeOfLeave: {
            value: getLeaveApplicationValue(leaveApplicationFormState.values.typeOfLeave),
            label: "Type of Leave",
            name: "typeOfLeave",
            errorMessage: leaveApplicationFormState?.errors?.typeOfLeave as any,
            options: getTypeofLeave(),
            filterOptions,
        },
        startDateOfLeave: {
            name: "startDateOfLeave",
            label: "Start date of leave",
            value: leaveApplicationFormState.values.startDateOfLeave ? dayjs(leaveApplicationFormState.values.startDateOfLeave) : null,
            errorMessage: leaveApplicationFormState.errors.startDateOfLeave,
            disabled: false,
            minDate: dayjs(leaveApplicationFormState?.values?.startDateOfLeave) || dayjs(),
        },
        endDateOfLeave: {
            name: "endDateOfLeave",
            label: "End date of leave",
            value: leaveApplicationFormState.values.endDateOfLeave ? dayjs(leaveApplicationFormState.values.endDateOfLeave) : null,
            errorMessage: leaveApplicationFormState.errors.endDateOfLeave,
            disabled: false,
            minDate: dayjs(leaveApplicationFormState?.values?.endDateOfLeave),
        },
        numberOfDaysOfLeave: {
            value: leaveApplicationFormState?.values.numberOfDaysOfLeave,
            label: "Number of Days of Leave",
            name: "numberOfDaysOfLeave",
            errorMessage: leaveApplicationFormState?.errors?.numberOfDaysOfLeave as any,
        },
        reasonForLeave: {
            value: leaveApplicationFormState?.values.reasonForLeave || "",
            label: "Reason for Leave",
            name: "reasonForLeave",
            errorMessage: leaveApplicationFormState?.errors?.reasonForLeave as any,
        },
        remarks: {
            value: leaveApplicationFormState?.values.remarks || "",
            label: "Remarks",
            name: "remarks",
            errorMessage: leaveApplicationFormState?.errors?.remarks as any,
        },
    };
    return {
        formSchema,
        leaveApplicationFormState
    }

}

export default useLeaveApplication;