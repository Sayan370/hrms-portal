import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { EmployeeData } from "@/models/responses/employee-data";
import { RKLoadState } from "@/models/types";
import { handleDateChange } from "@/utils/func-utills";
import ActionDialog, {
    ActionDialogActions,
    ActionDialogBody,
    ActionDialogTitle,
} from "@/components/action-dialog";
import {
    AppButton,
    AppDatePicker,
    AppInput,
    AppLoaderButton,
} from "@/components/form";

import useOnboardEmployee from "../hooks/useOnboardEmployee";

interface EmployeeOnboardingDialogProps {
    isModalOpen?: boolean;
    handleClose: () => void;
    editData?: EmployeeData;
    handleSubmit: (data: EmployeeData) => void;
    submitStatus?: RKLoadState;
}

// interface FormValues {
//     firstName: string;
//     lastName: string;
//     email: string;
//     department: string;
//     dateOfJoining: string;
//     jobTitle: string;
//     employeeID: string;
// }

// const validationSchema = Yup.object({
//     firstName: Yup.string().required("First name is required"),
//     lastName: Yup.string().required("Last name is required"),
//     email: Yup.string()
//         .email("Invalid email format")
//         .required("Email is required"),
//     department: Yup.string().required("Department is required"),
//     dateOfJoining: Yup.date().required("Date of Joining is required"),
//     jobTitle: Yup.string().required("Job title is required"),
//     employeeID: Yup.string().required("Employee ID is required"),
// });
const EmployeeOnboardingDialog = ({
    handleClose,
    isModalOpen,
    editData,
    handleSubmit,
    submitStatus,
}: EmployeeOnboardingDialogProps) => {
    const { formSchema, editEmployeeData } = useOnboardEmployee({
        editData,
        handleSubmit,
        handleClose,
    });
    return (
        <ActionDialog open={isModalOpen} onClose={handleClose}>
            <ActionDialogTitle classes={{ root: "px-2" }}>
                {editData ? "Edit" : "Add"} Employee
            </ActionDialogTitle>
            <ActionDialogBody>
                <form
                    className="mt-2 space-y-3"
                    id="employee-edit"
                    onSubmit={editEmployeeData?.handleSubmit}
                    onReset={editEmployeeData?.handleReset}>
                    <div className="flex flex-col gap-3 p:flex-row">
                        {/* <AppInput
                            {...formSchema?.empId}
                            value={formSchema?.empId.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        /> */}

                        <AppInput
                            {...formSchema?.name}
                            value={formSchema?.name.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                        <AppDatePicker
                            className="w-full"
                            format="DD/MM/YYYY"
                            type="date"
                            views="d-m-y"
                            openTo="day"
                            maxDate={
                                formSchema.dob.value
                                    ? formSchema.dob.value
                                    : null
                            }
                            {...formSchema?.dob}
                            onChange={handleDateChange(
                                formSchema.dob.name,
                                editEmployeeData.setFieldValue
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-3 p:flex-row">
                        <AppInput
                            {...formSchema?.phone}
                            value={formSchema?.phone.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                        <AppInput
                            {...formSchema?.gender}
                            value={formSchema?.gender.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                        <AppInput
                            {...formSchema?.position}
                            value={formSchema?.position.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-3 p:flex-row">
                        <AppInput
                            {...formSchema?.departmentName}
                            value={formSchema?.departmentName.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                        <AppInput
                            {...formSchema?.employmentType}
                            value={formSchema?.employmentType.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                        <AppInput
                            {...formSchema?.shift}
                            value={formSchema?.shift.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3 p:flex-row">
                        <AppDatePicker
                            className="w-full"
                            format="DD/MM/YYYY"
                            type="date"
                            views="d-m-y"
                            openTo="day"
                            maxDate={
                                formSchema.dateOfJoining.value
                                    ? formSchema.dateOfJoining.value
                                    : null
                            }
                            {...formSchema?.dateOfJoining}
                            onChange={handleDateChange(
                                formSchema.dateOfJoining.name,
                                editEmployeeData.setFieldValue
                            )}
                        />
                        <AppInput
                            {...formSchema?.skill}
                            value={formSchema?.skill.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                        <AppInput
                            {...formSchema?.site}
                            value={formSchema?.site.value ?? ""}
                            onChange={editEmployeeData?.handleChange}
                        />
                    </div>

                    {/* <div className="flex gap-3">
                        <AppDatePicker
                            format="DD/MM/YYYY hh:mm A"
                            type="datetime"
                            views="d-m-y hh:mm"
                            openTo="day"
                            maxDate={
                                formSchema.outTime.value
                                    ? formSchema.outTime.value
                                    : null
                            }
                            {...formSchema?.inTime}
                            onChange={handleDateChange(
                                formSchema.inTime.name,
                                editAttendanceData.setFieldValue
                            )}
                        />
                        <AppDatePicker
                            format="DD/MM/YYYY hh:mm A"
                            type="datetime"
                            views="d-m-y hh:mm"
                            openTo="day"
                            minDate={
                                formSchema.inTime.value
                                    ? formSchema.inTime.value
                                    : null
                            }
                            {...formSchema?.outTime}
                            onChange={handleDateChange(
                                formSchema.outTime.name,
                                editAttendanceData.setFieldValue
                            )}
                        />
                    </div> */}
                </form>
            </ActionDialogBody>
            <ActionDialogActions classes={{ root: "px-2" }}>
                <AppLoaderButton
                    isLoading={submitStatus === "loading"}
                    shouldBeDisabledWhileLoading
                    type="submit"
                    className="!mr-2"
                    variant="contained"
                    form="employee-edit">
                    {editEmployeeData ? "Save" : "Submit"}
                </AppLoaderButton>
                <AppButton
                    type="reset"
                    color="error"
                    variant="outlined"
                    form="employee-edit">
                    Reset
                </AppButton>
            </ActionDialogActions>
        </ActionDialog>
    );
};

export default EmployeeOnboardingDialog;
