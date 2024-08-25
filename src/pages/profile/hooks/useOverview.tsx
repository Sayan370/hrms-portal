import { useState } from "react";
import { setUser } from "@/services/api/user-ep";
import { selectUser } from "@/stores/modules/authentication";
import { FormikHelpers, useFormik } from "formik";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { OperationType } from "@/models/enums";
import { UserData, UserStatus } from "@/models/responses/user-data";
import { UserRole } from "@/models/responses/user-role-data";
import { AwaitedReturnType } from "@/models/utility-types";
import logger from "@/utils/log-utils";
import appToast from "@/components/app-toast";

export const useOverview = () => {
    const [isModalOpen, setModalState] = useState<boolean>(false);
    const { user } = useSelector(selectUser);

    const { mutateAsync } = useMutation<
        AwaitedReturnType<typeof setUser>,
        Error,
        UserData
    >(["user/createorupdate"], (variables) =>
        setUser(variables, OperationType.Update)
    );

    const initialValues = {
        firstName: user?.given_name || "",
        lastName: user?.family_name || "",
        email: user?.email || "",
        phone: user?.phone_number || "",
    };

    type FormValues = typeof initialValues;

    const validationSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup
            .string()
            .matches(
                /[1-9](\d){9}/i,
                "This have to be a number containing 10 digits"
            ),
    });

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        try {
            const { phone, ...rest } = values;
            const data = await mutateAsync(
                {
                    ...rest,
                    phone: phone || null,
                    password: null,
                    role:
                        (user?.role ? UserRole[user?.role] : UserRole.User) ||
                        UserRole.User,
                    status: UserStatus.Active,
                } as UserData,
                { onError }
            );
            appToast.success(
                data?.message ?? "User has been saved successfully"
            );
            handleClose();
        } catch (error: any) {
            logger.info(error?.message);
        } finally {
            setSubmitting(false);
        }
    };
    const handleReset = (
        values: FormValues,
        { setValues }: FormikHelpers<FormValues>
    ) => {
        // logger.log("reset", getInitialValues(), values);
        setValues(initialValues, false);
    };

    const editUserData = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: handleSubmit,
        onReset: handleReset,
        enableReinitialize: true,
    });

    const formSchema = {
        firstName: {
            label: "First Name",
            name: "firstName",
            value: editUserData?.values?.firstName,
            errorMessage: editUserData?.errors?.firstName,
        },
        lastName: {
            label: "Last Name",
            name: "lastName",
            value: editUserData?.values?.lastName,
            errorMessage: editUserData?.errors?.lastName,
        },
        phone: {
            label: "Phone Number",
            name: "phone",
            value: editUserData?.values?.phone,
            errorMessage: editUserData?.errors?.phone,
        },
        email: {
            label: "Email",
            name: "email",
            value: editUserData?.values?.email,
            disabled: true,
            errorMessage: editUserData?.errors?.email,
        },
    };

    const onError = (err: Error, values: UserData) => {
        logger.error(`The user with id '${values.email}' couldn't be saved!`);
        appToast.error(err?.message ?? "Something went wrong!");
    };

    const handleClose = () => {
        setModalState(false);
        editUserData.resetForm();
    };
    const handleOpen = () => {
        setModalState(true);
    };

    return {
        user,
        handleClose,
        handleOpen,
        editUserData,
        formSchema,
        isModalOpen,
    };
};
