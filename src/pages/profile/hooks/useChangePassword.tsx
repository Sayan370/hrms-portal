import { useEffect } from "react";
import { changePassword } from "@/services/api/auth-ep";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as yup from "yup";

import { ResetPassData } from "@/models/login-credential";
import { AwaitedReturnType } from "@/models/utility-types";
import appToast from "@/components/app-toast";

type ChangePasswordModel = Omit<ResetPassData, "requestHash"> & {
    confirmPassword: string;
};

export const useChangePassword = () => {
    const onChangeFormSubmit = ({
        newPassword,
        oldPassword,
    }: ChangePasswordModel) => {
        mutate({
            newPassword,
            oldPassword,
        });
    };
    const changeFormState = useFormik<ChangePasswordModel>({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: yup.object().shape({
            oldPassword: yup.string().required("The old password is required"),
            newPassword: yup
                .string()
                .required("The password is required")
                .min(8, "The password must be at least 8 characters")
                .when("oldPassword", ([oldPassword], field) =>
                    oldPassword
                        ? field.notOneOf(
                              [yup.ref("oldPassword")],
                              "The new password shouldn't match with old password"
                          )
                        : field
                ),
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
        onSubmit: onChangeFormSubmit,
    });

    const { data, status, error, mutate } = useMutation<
        AwaitedReturnType<typeof changePassword>,
        Error,
        Omit<ResetPassData, "requestHash">
    >(["auth/password/set", { ...changeFormState.values }], changePassword);

    const changeFormSchema = {
        oldPassword: {
            value: changeFormState.values.oldPassword,
            label: "Old Password",
            name: "oldPassword",
            type: "password",
            errorMessage: changeFormState.errors.oldPassword,
        },
        newPassword: {
            value: changeFormState.values.newPassword,
            label: "New Password",
            name: "newPassword",
            type: "password",
            errorMessage: changeFormState.errors.newPassword,
        },
        confirmPassword: {
            value: changeFormState.values.confirmPassword,
            label: "Confirm New Password",
            name: "confirmPassword",
            type: "password",
            errorMessage: changeFormState.errors.confirmPassword,
        },
    };
    useEffect(() => {
        if (data) {
            appToast.success(data);
        }
    }, [data]);

    useEffect(() => {
        if (error?.message) {
            appToast.error(error?.message);
        }
    }, [error?.message]);
    return {
        status,
        changeFormSchema,
        changeFormState,
    };
};
