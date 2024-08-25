import React, { useCallback, useMemo, useState } from "react";
import { forgotPassword } from "@/services/api/auth-ep";
import { getUsers, setUser } from "@/services/api/user-ep";
import { selectUser } from "@/stores/modules/authentication";
import { FormikHelpers, useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { OperationType } from "@/models/enums";
import { UserData, UserStatus } from "@/models/responses/user-data";
import { UserRole } from "@/models/responses/user-role-data";
import { AwaitedReturnType } from "@/models/utility-types";
import { getFormattedDate } from "@/utils/date-utils";
import logger from "@/utils/log-utils";
import { generatePass, separateWords } from "@/utils/object-utils";
import useConfirm from "@/hooks/useConfirm";
import usePagination from "@/hooks/usePagination";
import useUserScope from "@/hooks/useUserScope";
import appToast from "@/components/app-toast";
import { HeaderData } from "@/components/tables/responsive-table";

import { RowEventType } from "../components/table-bodyrow";

export const useUsers = () => {
    const [isModalOpen, setModalState] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const { page, handlePageChange } = usePagination();
    const { disabled: editDisabled } = useUserScope("users.manage");
    const { user } = useSelector(selectUser);
    const confirm = useConfirm();
    const [searchText, setSearchText] = useState("");

    const MAX_ROWS_PER_PAGE = 10;

    const {
        data: rows,
        status: userLoadState,
        error: usersError,
        refetch,
    } = useQuery<AwaitedReturnType<typeof getUsers>, Error>(
        ["users", page],
        getUsers
    );
    const { mutateAsync } = useMutation<
        AwaitedReturnType<typeof setUser>,
        Error,
        UserData
    >(["user/createorupdate"], (variables) =>
        setUser(
            variables,
            selectedUserId ? OperationType.Update : OperationType.Create
        )
    );

    const { mutateAsync: resetPassword } = useMutation<
        AwaitedReturnType<typeof forgotPassword>,
        Error,
        string
    >(["auth/password/reset"], forgotPassword);

    const roleOptions = [
        {
            label: "User",
            value: UserRole.User,
        },
        {
            label: "Admin",
            value: UserRole.Admin,
        },
    ];

    const headCells: HeaderData<UserData>[] = [
        {
            id: "firstName",
            isSortable: true,
            disablePadding: true,
            label: "Name",
            align: "left",
        },
        {
            id: "email",
            isSortable: true,
            disablePadding: false,
            label: "Email",
            align: "left",
        },
        {
            id: "phone",
            isSortable: false,
            disablePadding: true,
            label: "Phone",
            align: "center",
        },
        {
            id: "role",
            isSortable: true,
            disablePadding: true,
            label: "Role",
            align: "center",
        },
        {
            id: "created",
            isSortable: false,
            disablePadding: true,
            label: "Created On",
            align: "center",
        },
        {
            id: "updated",
            isSortable: false,
            disablePadding: true,
            label: "Updated On",
            align: "center",
        },
        {
            id: "actions",
            isSortable: false,
            disablePadding: true,
            label: "Actions",
            align: "right",
            className:
                "sticky right-0 bg-gradient-to-l from-[#ffffff] from-80% to-transparent to-100%  dark:from-[#121212] dark:from-80% dark:to-transparent dark:to-100%",
        },
    ];
    const toggleDisabledUser = async (id: string, checked?: boolean) => {
        const data = rows?.find((r) => r.email === id);
        return mutateAsync({
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            role: data?.role ?? UserRole.User,
            email: data?.email || "",
            phone: data?.phone || null,
            password: null,
            status: checked ? UserStatus.Active : UserStatus.Disabled,
        });
    };
    const handleTableRowClick = (
        id: string,
        event: RowEventType,
        value?: any
    ) => {
        switch (event) {
            case "edit":
                setSelectedUserId(id);
                setModalState(true);
                break;
            case "disable":
                {
                    const user = rows?.find((r) => r.email === id);
                    confirm({
                        content: (
                            <>
                                This will{" "}
                                <strong>{value ? "enable" : "disable"}</strong>{" "}
                                the user{" "}
                                <strong>
                                    {user?.firstName} {user?.lastName} (
                                    <i>{user?.email}</i>)
                                </strong>
                                . <br />
                                Do you want to proceed?
                            </>
                        ),
                        cancellationText: "Leave",
                        confirmationText: "Proceed",
                        allowClose: false,
                    }).then(() => {
                        toggleDisabledUser(id, value)
                            .then(() => {
                                appToast.success(
                                    `The user has successfully ${
                                        value ? "enabled" : "disabled"
                                    }.`
                                );
                                refetch();
                            })
                            .catch(() => {
                                appToast.error(
                                    "The user couldn't be disabled."
                                );
                            });
                    });
                }
                break;
            case "reset":
                {
                    const user = rows?.find((r) => r.email === id);
                    confirm({
                        content: (
                            <>
                                This will send a reset password mail to the{" "}
                                <strong>
                                    {user?.firstName} {user?.lastName} (
                                    <i>{user?.email}</i>)
                                </strong>
                                . <br />
                                Do you want to proceed?
                            </>
                        ),
                        cancellationText: "Leave",
                        confirmationText: "Proceed",
                        allowClose: false,
                    }).then(() => {
                        resetPassword(id)
                            .then((message) => {
                                appToast.success(message);
                            })
                            .catch(() => {
                                appToast.error(
                                    "The user couldn't be disabled."
                                );
                            });
                    });
                }
                break;
            default:
                break;
        }
    };
    const handleClose = () => {
        setModalState(false);
        setSelectedUserId(null);
        editUserData.resetForm();
    };
    const selectedUser = useMemo(
        () => rows?.find((r) => r.email === selectedUserId),
        [selectedUserId]
    );
    const validationSchema = useMemo(() => {
        return yup.object().shape(
            !selectedUserId
                ? {
                      firstName: yup
                          .string()
                          .required("This is a mandatory field"),
                      lastName: yup
                          .string()
                          .required("This is a mandatory field"),
                      email: yup
                          .string()
                          .email()
                          .required("This is a mandatory field"),
                      phone: yup
                          .string()
                          .matches(
                              /^[1-9](\d){9}$/i,
                              "This have to be a number containing 10 digits"
                          ),
                      role: yup
                          .number()
                          .required("This is a mandatory field")
                          .oneOf(roleOptions.map((r) => r.value)),
                      password: yup
                          .string()
                          .required("This is a mandatory field"),
                  }
                : {
                      firstName: yup
                          .string()
                          .required("This is a mandatory field"),
                      lastName: yup
                          .string()
                          .required("This is a mandatory field"),
                      email: yup
                          .string()
                          .email()
                          .required("This is a mandatory field"),
                      phone: yup
                          .string()
                          .matches(
                              /^[1-9](\d){9}$/i,
                              "This have to be a number containing 10 digits"
                          ),
                      role: yup
                          .number()
                          .required("This is a mandatory field")
                          .oneOf(roleOptions.map((r) => r.value)),
                  }
        );
    }, [selectedUserId]);

    const getInitialValues = () => ({
        firstName: selectedUser?.firstName || "",
        lastName: selectedUser?.lastName || "",
        role: selectedUser?.role ?? UserRole.User,
        email: selectedUser?.email || "",
        phone: selectedUser?.phone || "",
        password: selectedUser ? undefined : "",
    });
    const initialValues = useMemo(getInitialValues, [selectedUser]);

    type FormValues = typeof initialValues;

    const onError = (err: Error, values: UserData) => {
        logger.error(`The user with id '${values.email}' couldn't be saved!`);
        appToast.error(err?.message ?? "Something went wrong!");
    };

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
                    status: selectedUserId
                        ? selectedUser?.status
                        : UserStatus.Uninitialized,
                } as UserData,
                { onError }
            );
            refetch();
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
            disabled: !!selectedUserId,
            errorMessage: editUserData?.errors?.email,
        },
        password: {
            label: "Password",
            name: "password",
            value: editUserData?.values?.password || "",
            errorMessage: editUserData?.errors?.password,
            readOnly: true,
        },
        role: {
            label: "User Role",
            name: "role",
            value: editUserData?.values?.role,
            errorMessage: editUserData?.errors?.role,
            showEmptyOption: false,
            options: roleOptions,
        },
    };

    const addUser = () => {
        setModalState(true);
    };

    const handleGeneratePassword = () => {
        const generatedPassword = generatePass();
        editUserData.setFieldValue(
            formSchema.password.name,
            generatedPassword,
            true
        );
    };

    const onTextSearch = (text?: string) => {
        setSearchText(text || "");
    };

    const onIconClick = (eventType: "add" | "delete") => {
        switch (eventType) {
            case "add":
                setModalState(true);
                break;
            default:
                break;
        }
    };

    const getFilterString = (user: UserData) =>
        `${user.firstName} ${user.lastName}|${user.email}|${
            user.phone
        }|${separateWords(UserRole[user.role])}|${
            UserStatus[user.status]
        }|${getFormattedDate(
            user.created,
            "DD/MM/YYYY hh:mm:ssA"
        )}|${getFormattedDate(user.updated, "DD/MM/YYYY hh:mm:ssA")}`;

    const filteredUsers = useMemo(
        () =>
            rows?.filter((r) =>
                getFilterString(r)
                    .trim()
                    .toLowerCase()
                    .includes(searchText.trim().toLowerCase())
            ),
        [rows, searchText]
    );

    return {
        page,
        headCells,
        rows,
        filteredUsers,
        userLoadState,
        usersError,
        isModalOpen,
        editUserData,
        editDisabled,
        formSchema,
        MAX_ROWS_PER_PAGE,
        handleClose,
        handleTableRowClick,
        handlePageChange,
        user,
        addUser,
        selectedUserId,
        handleGeneratePassword,
        onTextSearch,
        onIconClick,
    };
};
