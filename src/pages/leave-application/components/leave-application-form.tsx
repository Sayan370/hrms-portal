import { AppAutocomplete, AppButton, AppDatePicker, AppInput, AppLoaderButton, AppSelect } from '@/components/form'
import { MinimalAutoComplete } from '@/components/form/inputElements/app-autocomplete/list-items';
import { handleAutcompleteChange, handleAutcompleteMultiChange, handleDateChange } from '@/utils/func-utills';
import InfoCard, { InfoCardActions } from '@/components/cards';
import useLeaveApplication from '../hooks/useLeaveApplication';

export interface useMaintenanceModalProps {
}

const LeaveApplicationForm = (props: useMaintenanceModalProps) => {
    const { formSchema, leaveApplicationFormState } = useLeaveApplication();
    return (
        <InfoCard title="Leave Application">
            <form
                className="mt-2"
                id="leave-application-add"
                onSubmit={leaveApplicationFormState?.handleSubmit}
                onReset={leaveApplicationFormState?.handleReset}>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-3">
                    <AppInput
                        {...formSchema.fullName}
                        size="small"
                        className='w-full'
                        onChange={leaveApplicationFormState?.handleChange}
                    />
                    <AppInput
                        {...formSchema.employeeId}
                        size="small"
                        className='w-full'
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                    <AppInput
                        {...formSchema.department}
                        size="small"
                        className='w-full'
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                    <AppInput
                        {...formSchema.jobTitle}
                        size="small"
                        className='w-1/3'
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                    <AppInput
                        {...formSchema.managerName}
                        size="small"
                        className='w-1/3'
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                    <AppInput
                        {...formSchema.emailAddress}
                        size="small"
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                    <AppInput
                        {...formSchema.phoneNumber}
                        size="small"
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                    <AppAutocomplete
                        className="w-full"
                        size="small"
                        {...formSchema.typeOfLeave}
                        isOptionEqualToValue={(option: any, value) =>
                            option.value === value?.value
                        }
                        onChange={handleAutcompleteChange(
                            formSchema
                                .typeOfLeave
                                .name,
                            leaveApplicationFormState.setFieldValue,
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
                    <AppDatePicker
                        type="date"
                        views="d-m-y"
                        className="w-full"
                        size="small"
                        openTo="day"
                        {...formSchema.startDateOfLeave}
                        onChange={handleDateChange(
                            formSchema.startDateOfLeave.name,
                            leaveApplicationFormState.setFieldValue
                        )}
                    />
                    <AppDatePicker
                        type="date"
                        views="d-m-y"
                        className="w-full"
                        size="small"
                        openTo="day"
                        {...formSchema.endDateOfLeave}
                        onChange={handleDateChange(
                            formSchema.endDateOfLeave.name,
                            leaveApplicationFormState.setFieldValue
                        )}
                    />
                    <AppInput
                        {...formSchema.numberOfDaysOfLeave}
                        size="small"
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                    <AppInput
                        {...formSchema.reasonForLeave}
                        size="small"
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                    <AppInput
                        {...formSchema.remarks}
                        size="small"
                        onChange={leaveApplicationFormState?.handleChange}
                    />

                </div>
            </form>
            <InfoCardActions>
                <div className='flex items-end w-full justify-end'>
                    <AppLoaderButton
                        isLoading={leaveApplicationFormState?.isSubmitting}
                        shouldBeDisabledWhileLoading
                        type="submit"
                        className="!mr-2"
                        variant="contained"
                        form="leave-application-add">
                        Save
                    </AppLoaderButton>
                    <AppButton
                        type="reset"
                        color="error"
                        variant="outlined"
                        form="leave-application-add">
                        Reset
                    </AppButton>
                </div>
            </InfoCardActions>
        </InfoCard>
    )
}

export default LeaveApplicationForm;