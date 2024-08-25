import { useEffect } from "react";
import { selectAuth } from "@/stores/modules/authentication";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { LoginCredential } from "@/models/login-credential";
import { getErrorString } from "@/utils/object-utils";
import { useAuthentication } from "@/hooks/useAuthetication";
import appToast from "@/components/app-toast";

export const useLogin = () => {
    const { loading, errors } = useSelector(selectAuth);
    const { handleLogin } = useAuthentication();

    useEffect(() => {
        if (errors?.length) {
            formState.setSubmitting(false);
            appToast.error(getErrorString(errors));
        }
    }, [errors]);

    const onFormSubmit = (values: LoginCredential) => {
        if (loading) {
            return;
        }

        handleLogin(values);
    };

    const formState = useFormik<LoginCredential>({
        initialValues: {
            username: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: yup.object().shape({
            username: yup.string().required().email(),
            password: yup.string().required(),
            rememberMe: yup.bool(),
        }),
        onSubmit: onFormSubmit,
    });

    return {
        formState,
    };
};
