import dayjs from "dayjs";

import {
    AttendanceDailyData,
    AttendanceDailyFormData,
} from "@/models/responses/attendance-data";
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

import useAttendanceDialog from "../hooks/useAttendanceDialog";

interface AttendanceDialogProps {
    isModalOpen?: boolean;
    handleClose: () => void;
    editData?: AttendanceDailyData;
    handleSubmit: (data: AttendanceDailyFormData) => void;
    submitStatus?: RKLoadState;
}

const AttendanceDialog = ({
    handleClose,
    isModalOpen,
    editData,
    handleSubmit,
    submitStatus,
}: AttendanceDialogProps) => {
    const { formSchema, editAttendanceData } = useAttendanceDialog({
        editData,
        handleSubmit,
    });
    return (
        <ActionDialog open={isModalOpen} onClose={handleClose}>
            <ActionDialogTitle classes={{ root: "px-2" }}>
                {editData ? "Edit" : "Add"} Attendance
            </ActionDialogTitle>
            <ActionDialogBody>
                <form
                    className="mt-2 space-y-3"
                    id="attendance-edit"
                    onSubmit={editAttendanceData?.handleSubmit}
                    onReset={editAttendanceData?.handleReset}>
                    <div className="flex gap-3">
                        <AppInput
                            {...formSchema?.workingHours}
                            onChange={editAttendanceData?.handleChange}
                        />
                        <AppInput
                            {...formSchema?.shift}
                            onChange={editAttendanceData?.handleChange}
                        />
                    </div>
                    <div className="flex gap-3">
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
                    </div>
                </form>
            </ActionDialogBody>
            <ActionDialogActions classes={{ root: "px-2" }}>
                <AppLoaderButton
                    isLoading={submitStatus === "loading"}
                    shouldBeDisabledWhileLoading
                    type="submit"
                    className="!mr-2"
                    variant="contained"
                    form="attendance-edit">
                    {editAttendanceData ? "Save" : "Submit"}
                </AppLoaderButton>
                <AppButton
                    type="reset"
                    color="error"
                    variant="outlined"
                    form="attendance-edit">
                    Reset
                </AppButton>
            </ActionDialogActions>
        </ActionDialog>
    );
};

export default AttendanceDialog;
