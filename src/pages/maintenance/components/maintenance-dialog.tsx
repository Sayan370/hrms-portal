import ActionDialog, { ActionDialogActions, ActionDialogBody, ActionDialogTitle } from '@/components/action-dialog'
import { AppAutocomplete, AppButton, AppDatePicker, AppInput, AppLoaderButton, AppSelect } from '@/components/form'
import { MinimalAutoComplete } from '@/components/form/inputElements/app-autocomplete/list-items';
import { handleAutcompleteChange, handleAutcompleteMultiChange, handleDateChange } from '@/utils/func-utills';
import useMaintenanceModal from '../hooks/useMaintenanceModal';

export interface useMaintenanceModalProps {
    modalState: boolean;
    handleClose: () => void;
}

const MaintenanceDialog = (props: useMaintenanceModalProps) => {
    const { handleClose, modalState } = props;
    const { formSchema, maintenanceFormState } = useMaintenanceModal(props);
    return (
        <ActionDialog open={modalState} onClose={handleClose} grow maxWidth="tp">
            <ActionDialogTitle classes={{ root: "px-2" }}>
                Maintenance Entry
            </ActionDialogTitle>
            <ActionDialogBody>
                <form
                    className="mt-2"
                    id="maintenance-add"
                    onSubmit={maintenanceFormState?.handleSubmit}
                    onReset={maintenanceFormState?.handleReset}>
                    <div className="flex gap-3">
                        <AppAutocomplete
                            className="w-full"
                            size="small"
                            {...formSchema.vehicle_category}
                            isOptionEqualToValue={(option: any, value) =>
                                option.value === value?.value
                            }
                            onChange={handleAutcompleteChange(
                                formSchema
                                    .vehicle_category
                                    .name,
                                maintenanceFormState.setFieldValue,
                                (val) =>
                                    val &&
                                        typeof val !==
                                        "string" &&
                                        "value" in val
                                        ? val?.value
                                        : null
                            )}
                            primaryKey="value"
                            virtualized
                            components={{
                                ListItem: MinimalAutoComplete,
                            }}
                        />
                        <AppAutocomplete
                            className="w-full"
                            size="small"
                            {...formSchema.doorNo}
                            isOptionEqualToValue={(option: any, value) =>
                                option.value === value?.value
                            }
                            onChange={handleAutcompleteChange(
                                formSchema
                                    .doorNo
                                    .name,
                                maintenanceFormState.setFieldValue,
                                (val) =>
                                    val &&
                                        typeof val !==
                                        "string" &&
                                        "value" in val
                                        ? val?.value
                                        : null
                            )}
                            primaryKey="value"
                            virtualized
                            components={{
                                ListItem: MinimalAutoComplete,
                            }}
                        />

                    </div>
                    <div className="mt-3 flex gap-3">
                        <AppDatePicker
                            type="date"
                            views="d-m-y"
                            className="w-full"
                            size="small"
                            openTo="day"
                            {...formSchema.date}
                            onChange={handleDateChange(
                                formSchema.date.name,
                                maintenanceFormState.setFieldValue
                            )}
                        />
                        <AppDatePicker
                            views="hh:mm:ss"
                            size="small"
                            type="time"
                            className="w-full"
                            format='hh:mm'
                            openTo="hours"
                            {...formSchema.start_Time}
                            onChange={handleDateChange(
                                formSchema.start_Time.name,
                                maintenanceFormState.setFieldValue
                            )}
                        />
                    </div>
                    <div className="mt-3 flex gap-3">
                        <AppDatePicker
                            views="hh:mm:ss"
                            size="small"
                            type="time"
                            className="w-full"
                            format='hh:mm'
                            openTo="hours"
                            {...formSchema.end_Time}
                            onChange={handleDateChange(
                                formSchema.end_Time.name,
                                maintenanceFormState.setFieldValue
                            )}
                        />
                        <AppAutocomplete
                            className="w-full"
                            size="small"
                            {...formSchema.maintenanceDone}
                            isOptionEqualToValue={(option: any, value) =>
                                option.value === value?.value
                            }
                            multiple
                            limitTags={2}
                            onChange={handleAutcompleteMultiChange(
                                true,
                                formSchema.maintenanceDone.name,
                                maintenanceFormState.setFieldValue,
                                (r: any) =>
                                    r.map((val: any) =>
                                        val &&
                                            typeof val !== "string" &&
                                            "value" in val
                                            ? val?.value
                                            : null
                                    )
                            )}
                            primaryKey="value"
                            virtualized
                            components={{
                                ListItem: MinimalAutoComplete,
                            }}
                        />
                    </div>
                    {maintenanceFormState.values.maintenanceDone.includes("Others") && (<div className="mt-3 flex gap-3">
                        <AppInput {...formSchema.others} size='small' onChange={maintenanceFormState?.handleChange} />
                    </div>)}
                </form>
            </ActionDialogBody>
            <ActionDialogActions classes={{ root: "px-2" }}>
                <AppLoaderButton
                    isLoading={maintenanceFormState?.isSubmitting}
                    shouldBeDisabledWhileLoading
                    type="submit"
                    className="!mr-2"
                    variant="contained"
                    form="maintenance-add">
                    Save
                </AppLoaderButton>
                <AppButton
                    type="reset"
                    color="error"
                    variant="outlined"
                    form="maintenance-add">
                    Reset
                </AppButton>
            </ActionDialogActions>
        </ActionDialog>
    )
}

export default MaintenanceDialog;