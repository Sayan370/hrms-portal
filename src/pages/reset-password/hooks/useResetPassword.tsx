import { useEffect } from "react";
import { forgotPassword, resetPassword } from "@/services/api/auth-ep";
import { selectAuth } from "@/stores/modules/authentication";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { LoginCredential, ResetPassData } from "@/models/login-credential";
import { AwaitedReturnType } from "@/models/utility-types";
import { NonAuthedRoutes } from "@/constants/route-constants";
import { getErrorString } from "@/utils/object-utils";
import { useAuthentication } from "@/hooks/useAuthetication";
import appToast from "@/components/app-toast";

type ForgotPasswordModel = Pick<LoginCredential, "username">;
type ResetPasswordModel = Omit<ResetPassData, "requestHash" | "oldPassword"> & {
    confirmPassword: string;
};

export const useResetPassword = () => {
    const { hash } = useParams();
    const navigate = useNavigate();

    const onFormSubmit = (values: ForgotPasswordModel) => {
        mutate(values.username);
    };
    const onResetFormSubmit = ({ newPassword }: ResetPasswordModel) => {
        resetMutate({
            requestHash: hash || "",
            newPassword,
        });
    };

    const formState = useFormik<ForgotPasswordModel>({
        initialValues: {
            username: "",
        },
        validationSchema: yup.object().shape({
            username: yup.string().required().email(),
        }),
        onSubmit: onFormSubmit,
    });

    const {
        data,
        status: forgotPassStatus,
        error: forgotPassError,
        mutate,
    } = useMutation<AwaitedReturnType<typeof forgotPassword>, Error, string>(
        ["auth/password/reset", formState.values.username],
        forgotPassword
    );

    const formSchema = {
        username: {
            value: formState.values.username,
            label: "Email Address",
            name: "username",
            errorMessage: formState.errors.username,
        },
    };

    const resetFormState = useFormik<ResetPasswordModel>({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: yup.object().shape({
            newPassword: yup
                .string()
                .required("The password is required")
                .min(8, "The password must be at least 8 characters"),
            confirmPassword: yup
                .string()
                .required("The confirm password is required")
                .when("newPassword", ([newPassword], field) =>
                    newPassword
                        ? field.oneOf(
                              [yup.ref("newPassword")],
                              "The confirm password doesn't match with new password"
                          )
                        : field
                ),
        }),
        onSubmit: onResetFormSubmit,
    });

    const {
        data: resetData,
        status: resetPassStatus,
        error: resetPassError,
        mutate: resetMutate,
    } = useMutation<
        AwaitedReturnType<typeof resetPassword>,
        Error,
        Omit<ResetPassData, "oldPassword">
    >(
        ["auth/password/set", { ...resetFormState.values, requestHash: hash }],
        resetPassword
    );

    const resetFormSchema = {
        newPassword: {
            value: resetFormState.values.newPassword,
            label: "New Password",
            name: "newPassword",
            type: "password",
            errorMessage: resetFormState.errors.newPassword,
        },
        confirmPassword: {
            value: resetFormState.values.confirmPassword,
            label: "Confirm New Password",
            name: "confirmPassword",
            type: "password",
            errorMessage: resetFormState.errors.confirmPassword,
        },
    };

    useEffect(() => {
        if (data) appToast.success(data);
    }, [data]);

    useEffect(() => {
        if (resetData) {
            appToast.success(resetData);
            navigate(NonAuthedRoutes.login);
        }
    }, [resetData]);

    useEffect(() => {
        if (forgotPassError?.message) {
            appToast.error(forgotPassError?.message);
        }
    }, [forgotPassError?.message]);

    useEffect(() => {
        if (resetPassError?.message) {
            appToast.error(resetPassError?.message);
        }
    }, [resetPassError?.message]);

    return {
        formState,
        forgotPassStatus,
        formSchema,
        hash,
        resetFormSchema,
        resetFormState,
        resetPassStatus,
    };
};
