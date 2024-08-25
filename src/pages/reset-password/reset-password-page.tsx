import { Link } from "react-router-dom";

import { NonAuthedRoutes } from "@/constants/route-constants";
import BrandLogo from "@/layouts/protected-layout/components/brand-logo";
import UnprotectedLayout from "@/layouts/unprotected-layout";
import {
    AppButton,
    AppCheckbox,
    AppInput,
    AppLink,
    AppLoaderButton,
} from "@/components/form";

import { useResetPassword } from "./hooks/useResetPassword";

const ResetPasswordPage = () => {
    const {
        formState,
        formSchema,
        forgotPassStatus,
        hash,
        resetFormSchema,
        resetFormState,
        resetPassStatus,
    } = useResetPassword();

    return (
        <UnprotectedLayout>
            <div className="flex h-full flex-row items-center justify-center">
                <div className="w-[56rem] min-w-fit max-w-screen-xsp bg-white px-8 py-10 drop-shadow-md dark:bg-slate-950 p:max-w-screen-p p:px-20">
                    <BrandLogo
                        className="invert dark:invert-0"
                        href={NonAuthedRoutes.login}
                    />
                    <h2 className="text-center">Reset Password</h2>
                    {hash ? (
                        <form
                            className="flex w-full flex-col gap-3"
                            onSubmit={resetFormState.handleSubmit}>
                            <AppInput
                                {...resetFormSchema.newPassword}
                                onChange={resetFormState.handleChange}
                            />
                            <AppInput
                                {...resetFormSchema.confirmPassword}
                                onChange={resetFormState.handleChange}
                            />
                            <AppLoaderButton
                                type="submit"
                                variant="contained"
                                isLoading={resetPassStatus === "loading"}
                                className="!mt-2 w-full"
                                shouldBeDisabledWhileLoading>
                                Submit
                            </AppLoaderButton>
                        </form>
                    ) : (
                        <form
                            className="w-full"
                            onSubmit={formState.handleSubmit}>
                            <AppInput
                                {...formSchema.username}
                                onChange={formState.handleChange}
                            />
                            <AppLoaderButton
                                type="submit"
                                variant="contained"
                                isLoading={forgotPassStatus === "loading"}
                                className="!mt-4 w-full"
                                shouldBeDisabledWhileLoading>
                                Submit
                            </AppLoaderButton>
                        </form>
                    )}
                </div>
            </div>
        </UnprotectedLayout>
    );
};

export default ResetPasswordPage;
