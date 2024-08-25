import dayjs from "dayjs";
import { useFormik } from "formik";
import * as yup from "yup";

import {
    AttendanceDailyData,
    AttendanceDailyFormData,
} from "@/models/responses/attendance-data";

interface UseAttendanceDialogProps {
    editData?: AttendanceDailyData;
    handleSubmit: (data: AttendanceDailyFormData) => void;
}

const useAttendanceDialog = ({
    editData,
    handleSubmit: onSubmit,
}: UseAttendanceDialogProps) => {
    const handleSubmit = ({
        inTime,
        outTime,
        ...values
    }: typeof initialValues) => {
        onSubmit({ ...values, inTime: inTime || "", outTime: outTime || "" });
    };
    const handleReset = () => {};
    const initialValues = {
        workingHours: editData?.workingHours ?? 0,
        shift: editData?.shift ?? "",
        inTime: editData?.inTime ?? null,
        outTime: editData?.outTime ?? null,
    };
    const validationSchema = yup.object().shape({
        workingHours: yup
            .number()
            .label("Working Hours")
            .required("This is a mandatory field"),
        shift: yup
            .string()
            .label("In Time")
            .required("This is a mandatory field"),
        inTime: yup
            .string()
            .label("Shift")
            .required("This is a mandatory field"),
        outTime: yup
            .string()
            .label("Out Time")
            .required("This is a mandatory field"),
    });
    const editAttendanceData = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: handleSubmit,
        onReset: handleReset,
        enableReinitialize: true,
    });
    const formSchema = {
        workingHours: {
            label: "Working Hours",
            name: "workingHours",
            value: editAttendanceData?.values?.workingHours,
            errorMessage: editAttendanceData?.errors?.workingHours,
            type: "number",
        },
        shift: {
            label: "Shift",
            name: "shift",
            value: editAttendanceData?.values?.shift,
            errorMessage: editAttendanceData?.errors?.shift,
        },
        inTime: {
            label: "In Time",
            name: "inTime",
            value: editAttendanceData?.values?.inTime
                ? dayjs(editAttendanceData?.values?.inTime)
                : null,
            errorMessage: editAttendanceData?.errors?.inTime,
        },
        outTime: {
            label: "Out Time",
            name: "outTime",
            value: editAttendanceData?.values?.outTime
                ? dayjs(editAttendanceData?.values?.outTime)
                : null,
            errorMessage: editAttendanceData?.errors?.outTime,
        },
    };
    return {
        formSchema,
        editAttendanceData,
    };
};

export default useAttendanceDialog;
