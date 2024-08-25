import { Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { FieldArray, FormikProvider } from "formik";

import { handleDateChange } from "@/utils/func-utills";
import InfoCard, { InfoCardActions } from "@/components/cards";
import {
    AppButton,
    AppDatePicker,
    AppInput,
    AppLoaderButton,
} from "@/components/form";

import useRequisitionForm from "../hooks/useRequisitionForm";

const RequisitionForm = () => {
    const { formState, addOrDeleteRow, getItemsTableDataByIndex } =
        useRequisitionForm();
    return (
        <FormikProvider value={formState}>
            <InfoCard
                className="my-2 !bg-white shadow-md dark:!bg-neutral-900"
                title="Requisition Form">
                <form
                    id="requisition-form"
                    className="mt-2 flex flex-col gap-3"
                    onSubmit={formState?.handleSubmit}
                    onReset={formState?.handleReset}>
                    <div className="flex flex-row items-center gap-3">
                        <AppDatePicker
                            type="date"
                            openTo="day"
                            size="small"
                            format="DD/MM/YYYY"
                            label="Date"
                            value={
                                formState.values.date
                                    ? dayjs(formState.values.date)
                                    : null
                            }
                            errorMessage={formState.errors.date ?? ""}
                            onChange={handleDateChange(
                                "date",
                                formState.setFieldValue
                            )}
                        />
                        <AppInput
                            label="Requester"
                            name="requester"
                            value={formState.values.requester ?? ""}
                            errorMessage={formState.errors.requester ?? ""}
                            size="small"
                            onChange={formState?.handleChange}
                        />
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <AppInput
                            label="Department"
                            name="department"
                            value={formState.values.department ?? ""}
                            errorMessage={formState.errors.department ?? ""}
                            size="small"
                            onChange={formState?.handleChange}
                        />
                        <AppInput
                            label="Door Manager"
                            name="doorManager"
                            value={formState.values.doorManager ?? ""}
                            errorMessage={formState.errors.doorManager ?? ""}
                            size="small"
                            onChange={formState?.handleChange}
                        />
                        <AppInput
                            label="Approver"
                            name="approver"
                            value={formState.values.approver ?? ""}
                            errorMessage={formState.errors.approver ?? ""}
                            size="small"
                            onChange={formState?.handleChange}
                        />
                    </div>
                    <FieldArray name="items">
                        {(params) =>
                            (formState.values.items || [])?.map((v, i) => (
                                <div className="flex flex-col" key={i}>
                                    {/* <div className="mt-3 flex flex-col gap-3">
                                        <AppSelect
                                        {...getItemsTableDataByIndex(
                                            params.form.errors,
                                            i,
                                                "Location Type",
                                                "dealershipLocationType"
                                            )}
                                            size="small"
                                            onChange={formState?.handleChange}
                                            />
                                            </div> */}
                                    <div className="flex flex-col items-center gap-3 tl:flex-row">
                                        {(i > 0 ||
                                            (formState?.values?.items?.length ||
                                                1) > 1) && (
                                            <Tooltip
                                                title="Delete Row"
                                                placement="top">
                                                <span>
                                                    <AppButton
                                                        type="button"
                                                        color="error"
                                                        size="small"
                                                        onClick={addOrDeleteRow(
                                                            "delete",
                                                            i
                                                        )}
                                                        variant="icon">
                                                        <Delete fontSize="small" />
                                                    </AppButton>
                                                </span>
                                            </Tooltip>
                                        )}
                                        <AppInput
                                            {...getItemsTableDataByIndex(
                                                params.form.errors,
                                                i,
                                                "Item name",
                                                "itemName"
                                            )}
                                            size="small"
                                            onChange={formState?.handleChange}
                                        />
                                        <AppInput
                                            {...getItemsTableDataByIndex(
                                                params.form.errors,
                                                i,
                                                "Item Category",
                                                "itemCategory"
                                            )}
                                            size="small"
                                            onChange={formState?.handleChange}
                                        />
                                        <AppInput
                                            {...getItemsTableDataByIndex(
                                                params.form.errors,
                                                i,
                                                "Quantity",
                                                "qty"
                                            )}
                                            size="small"
                                            type="number"
                                            onChange={formState?.handleChange}
                                        />
                                        {/* <AppInput
                                            {...getItemsTableDataByIndex(
                                                params.form.errors,
                                                i,
                                                "Team",
                                                "team"
                                            )}
                                            size="small"
                                            onChange={formState?.handleChange}
                                        /> */}
                                        <AppInput
                                            {...getItemsTableDataByIndex(
                                                params.form.errors,
                                                i,
                                                "Door No",
                                                "doorNo"
                                            )}
                                            size="small"
                                            onChange={formState?.handleChange}
                                        />
                                        <AppInput
                                            {...getItemsTableDataByIndex(
                                                params.form.errors,
                                                i,
                                                "Reason",
                                                "reason"
                                            )}
                                            size="small"
                                            onChange={formState?.handleChange}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </FieldArray>
                </form>
                <InfoCardActions>
                    <div className="flex grow flex-row items-center justify-between px-2">
                        <Tooltip title="Add Row">
                            <span>
                                <AppButton
                                    type="button"
                                    color="info"
                                    size="small"
                                    onClick={addOrDeleteRow("add")}
                                    variant="icon">
                                    <GridAddIcon fontSize="small" />
                                </AppButton>
                            </span>
                        </Tooltip>
                        <div className="flex flex-row">
                            <AppLoaderButton
                                isLoading={formState?.isSubmitting}
                                shouldBeDisabledWhileLoading
                                type="submit"
                                className="!mr-2"
                                variant="contained"
                                form="requisition-form">
                                Submit
                            </AppLoaderButton>
                            <AppButton
                                type="reset"
                                color="error"
                                variant="outlined"
                                form="requisition-form">
                                Reset
                            </AppButton>
                        </div>
                    </div>
                </InfoCardActions>
            </InfoCard>
        </FormikProvider>
    );
};

export default RequisitionForm;
