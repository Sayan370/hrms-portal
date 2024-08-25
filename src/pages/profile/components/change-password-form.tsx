import { AppInput, AppLoaderButton } from "@/components/form";
import { useChangePassword } from "../hooks/useChangePassword";

const ChangePasswordForm = () => {
    const { changeFormSchema, status, changeFormState } = useChangePassword()
    return (
        <form className="flex flex-col gap-3" onSubmit={changeFormState.handleSubmit}>
            <AppInput
                {...changeFormSchema.oldPassword}
                onChange={changeFormState.handleChange}
            />
            <AppInput
                {...changeFormSchema.newPassword}
                onChange={changeFormState.handleChange}
            />
            <AppInput
                {...changeFormSchema.confirmPassword}
                onChange={changeFormState.handleChange}
            />
            <AppLoaderButton
                type="submit"
                variant="contained"
                isLoading={status === "loading"}
                className="!mt-2 w-full"
                shouldBeDisabledWhileLoading>
                Submit
            </AppLoaderButton>
        </form>
    )
}

export default ChangePasswordForm;