import React from "react";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";

import { CommonRowEventType } from "@/models/types";
import appToast from "@/components/app-toast";

const useRequisitionForm = () => {
    const initialValues = {
        date: "",
        requester: "",
        department: "",
        doorManager: "",
        approver: "",
        items: [
            {
                itemCategory: "",
                itemName: "",
                qty: 0,
                // team: "",
                doorNo: "",
                reason: "",
            },
        ],
    };
    const handleSubmit = (values: typeof initialValues) => {
        formState.setSubmitting(false);
        appToast.success("Form submitted successfully!");
    };
    const handleReset = () => {};
    const formState = useFormik({
        initialValues,
        validationSchema: yup.object().shape({
            date: yup.string().required("This is a mandatory field"),
            requester: yup.string().required("This is a mandatory field"),
            department: yup.string().required("This is a mandatory field"),
            doorManager: yup.string().required("This is a mandatory field"),
            approver: yup.string().required("This is a mandatory field"),
            items: yup.array().of(
                yup.object().shape({
                    itemCategory: yup.string().label("Item Category"),
                    // .required("This is a mandatory field"),
                    itemName: yup.string().label("Item Name"),
                    // .required("This is a mandatory field"),
                    qty: yup.number().label("Quantity"),
                    // .required("This is a mandatory field"),
                    // team: yup.string().label("Team").nullable(),
                    doorNo: yup.string().label("Door No."),
                    // .required("This is a mandatory field"),
                    reason: yup.string().label("Reason"),
                    // .required("This is a mandatory field"),
                })
            ),
        }),
        onSubmit: handleSubmit,
        onReset: handleReset,
        enableReinitialize: true,
    });
    const addOrDeleteRow =
        (
            type: Exclude<
                CommonRowEventType,
                "edit" | "view" | "print" | "status"
            >,
            index?: number
        ) =>
        (evt: React.ChangeEvent<any>) => {
            let itemVal = [...formState.values.items];
            if (type === "add") {
                itemVal.push({
                    itemCategory: "",
                    itemName: "",
                    qty: 0,
                    // team: "",
                    doorNo: "",
                    reason: "",
                });
            } else {
                itemVal = [
                    ...itemVal.slice(0, index || 0),
                    ...itemVal.slice((index || 0) + 1),
                ];
            }
            formState.setFieldValue("items", itemVal);
        };

    const getItemsTableDataByIndex = (
        errors: FormikErrors<Partial<(typeof initialValues)["items"][0]>>,
        i: number,
        label: string,
        variable: keyof (typeof initialValues)["items"][0]
    ) => {
        const fieldInfo: any = {
            label,
            name: `items.${i}.${variable}`,
        };

        switch (variable) {
            case "qty": {
                fieldInfo.errorMessage =
                    (errors as any)?.items?.[i]?.[variable] ?? "";
                fieldInfo.value = formState.values.items?.[i]?.[variable] ?? 0;
                break;
            }
            default: {
                fieldInfo.value = formState.values.items?.[i]?.[variable] ?? "";
                fieldInfo.errorMessage =
                    (errors as any)?.items?.[i]?.[variable] ?? "";
                break;
            }
        }

        // if (variable === "dealershipLocationType") {
        //     fieldInfo.options = dealerShipLocationTypeOptions();
        //     fieldInfo.errorMessage =
        //         (errors as any)?.locations?.[i]?.[variable] ||
        //         formState.values.locations.some(
        //             (d, x) =>
        //                 d.dealershipLocationType ===
        //                     formState.values.locations?.[i]?.[variable] &&
        //                 x !== i
        //         )
        //             ? "DealerShip Location Type Must be Unique"
        //             : "";
        // } else {
        //     fieldInfo.errorMessage =
        //         (errors as any)?.locations?.[i]?.[variable] ?? "";
        // }
        // if (variable === "state") {
        //     fieldInfo.options = getStateCityData("state", i);
        //     fieldInfo.filterOptions = filterOptions;
        //     fieldInfo.value = getStateCityValue(
        //         formState?.values?.locations[i].state || "",
        //         "state",
        //         i
        //     );
        // } else if (variable === "district") {
        //     fieldInfo.options = getStateCityData("district", i);
        //     fieldInfo.filterOptions = filterOptions;
        //     fieldInfo.value = getStateCityValue(
        //         formState?.values?.locations[i].district || "",
        //         "district",
        //         i
        //     );
        // } else {
        //     fieldInfo.value = formState.values.locations?.[i]?.[variable] ?? "";
        // }
        return fieldInfo;
    };
    return { formState, addOrDeleteRow, getItemsTableDataByIndex };
};

export default useRequisitionForm;
