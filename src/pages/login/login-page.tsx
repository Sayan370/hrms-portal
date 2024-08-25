import { Link } from "react-router-dom";

import BrandLogo from "@/layouts/protected-layout/components/brand-logo";
import UnprotectedLayout from "@/layouts/unprotected-layout";
import {
    AppButton,
    AppCheckbox,
    AppInput,
    AppLink,
    AppLoaderButton,
} from "@/components/form";

import { useLogin } from "./hooks/useLogin";

const LoginPage = () => {
    const { formState } = useLogin();

    const formSchema = {
        username: {
            value: formState.values.username,
            label: "Email Address",
            name: "username",
            errorMessage: formState.errors.username,
        },
        password: {
            value: formState.values.password,
            label: "Password",
            name: "password",
            className: "mt-3",
            type: "password",
            errorMessage: formState.errors.password,
        },
        rememberMe: {
            checked: formState.values.rememberMe,
            label: "Rememeber Me",
            name: "rememberMe",
            className: "mt-2 justify-center",
            errorMessage: formState.errors.rememberMe,
        },
    };
    return (
        <UnprotectedLayout>
            <div className="flex h-full flex-row items-center justify-center">
                <div className="w-[56rem] min-w-fit max-w-screen-xsp bg-white px-8 py-10 drop-shadow-md dark:bg-slate-950 p:max-w-screen-p p:px-20">
                    <BrandLogo className="invert dark:invert-0" />
                    <h2 className="text-center">Sign In</h2>
                    <form className="w-full" onSubmit={formState.handleSubmit}>
                        <AppInput
                            {...formSchema.username}
                            onChange={formState.handleChange}
                        />
                        <AppInput
                            {...formSchema.password}
                            onChange={formState.handleChange}
                        />
                        <AppCheckbox
                            {...formSchema.rememberMe}
                            onChange={formState.handleChange}
                        />
                        <AppLoaderButton
                            type="submit"
                            variant="contained"
                            isLoading={formState.isSubmitting}
                            className="!mt-4 w-full"
                            shouldBeDisabledWhileLoading>
                            Sign In
                        </AppLoaderButton>
                    </form>
                    <div className="flex flex-row justify-end">
                        <AppLink
                            component={Link}
                            to="/reset-password"
                            className="!mt-4">
                            Forgot Password
                        </AppLink>
                    </div>
                </div>
            </div>
        </UnprotectedLayout>
    );
};

export default LoginPage;
