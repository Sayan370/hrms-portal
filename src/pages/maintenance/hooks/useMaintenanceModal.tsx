import { useMemo } from "react";
import { setMainenance } from "@/services/api/maintenance-ep";
import { createFilterOptions } from "@mui/material";
import dayjs from "dayjs";
import { FormikHelpers, useFormik } from "formik";
import { useMutation } from "react-query";
import * as yup from "yup";

import {
    MaintenanceFormData,
    MaintenanceType,
} from "@/models/responses/maintenance-data";
import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import { getEnumEntries, separateWords } from "@/utils/object-utils";
import appToast from "@/components/app-toast";

import { useMaintenanceModalProps } from "../components/maintenance-dialog";

interface ListValue {
    label: string;
    value: string;
}

const useMaintenanceModal = ({ handleClose }: useMaintenanceModalProps) => {
    const {
        data: mutData,
        error: mutError,
        status: mutStatus,
        mutateAsync,
    } = useMutation<
        AwaitedReturnType<typeof setMainenance>,
        Error,
        MaintenanceFormData
    >([QueryConst.setMaintenance], setMainenance);

    const vehicleCategoryList = ["Excavator", "Tipper"];

    const getMaintanceTypeList = () =>
        getEnumEntries(MaintenanceType).map(
            ([label, value]: [string, number]) => ({
                label: separateWords(label),
                value,
            })
        );
    const getMaintanceDoneList = () => {
        const maintenanceDoneList = [
            "Grease",
            "Air Filter Cleaning",
            "Oil Filter Cleaning",
            "AC Filter Cleaning",
            "AC Filter Change",
            "Washing",
            "Hydraulic Oil Change",
            "Engine Oil Change",
            "Others",
        ];
        return maintenanceDoneList.map((d, i) => ({
            label: separateWords(d),
            value: separateWords(d),
        }));
    };
    const getVehicleCategoryList = () => {
        return vehicleCategoryList.map((d, i) => ({
            label: separateWords(d),
            value: i.toString(),
        }));
    };
    const getMaintenanceValue = (value: string | number) => {
        const data = getMaintanceTypeList()?.find((d) => d?.value === value);
        return data
            ? {
                  label: data?.label ?? "",
                  value: value as string,
              }
            : null;
    };
    const getVehicleCategoryValue = (value: string | number) => {
        const data = getVehicleCategoryList()?.find((d) => d?.value === value);
        return data
            ? {
                  label: data?.label ?? "",
                  value: value as string,
              }
            : null;
    };

    const getMaintenanceDoneValue = (value: string[]) => {
        const data = getMaintanceDoneList()?.filter((d) =>
            value.includes(d.value)
        );
        return data
            ? data?.map((r) => ({
                  label: r?.label ?? "",
                  value: r.value,
              }))
            : undefined;
    };

    const filterOptions = createFilterOptions<ListValue>({
        matchFrom: "any",
        stringify: (option) => `${option.label}-${option.value}`,
    });

    const handleMaintenanceSubmit = async (
        values: MaintenanceFormData,
        { setSubmitting }: FormikHelpers<MaintenanceFormData>
    ) => {
        mutateAsync(values).then((d) => {
            handleClose();
            appToast.success(d || "Maintenance added successfully");
        });
    };

    const maintenanceFormState = useFormik<MaintenanceFormData>({
        initialValues: {
            id: "",
            doorNo: "",
            date: "",
            maintenanceDone: [],
            maintenanceType: MaintenanceType.Daily_Maintenance, // Assuming a default value
            start_Time: "",
            end_Time: "",
            vehicle_category: "",
            others: "",
        },
        validationSchema: yup.object().shape({}),
        onSubmit: handleMaintenanceSubmit,
    });
    const getDoorNoList = useMemo(() => {
        const doorNoList = [
            "Exec-1",
            "Exec-2",
            "Exec-3",
            "Exec-4",
            "T1",
            "T2",
            "T3",
            "T4",
        ];
        return doorNoList
            .filter((data) => {
                if (
                    vehicleCategoryList[
                        Number(maintenanceFormState.values.vehicle_category)
                    ] === "Excavator"
                ) {
                    return data.includes("Exec");
                }
                return data.includes("T");
            })
            .map((d, i) => ({
                label: separateWords(d),
                value: i.toString(),
            }));
    }, [maintenanceFormState.values.vehicle_category]);
    const getDoorNoValue = (value: string | number) => {
        const data = getDoorNoList?.find((d) => d?.value === value);
        return data
            ? {
                  label: data?.label ?? "",
                  value: value as string,
              }
            : null;
    };
    const formSchema = {
        date: {
            name: "date",
            label: "Date",
            value: dayjs(maintenanceFormState.values.date),
            errorMessage: maintenanceFormState.errors.date,
            disabled: false,
            maxDate: dayjs(maintenanceFormState?.values?.date) || dayjs(),
        },
        start_Time: {
            name: "start_Time",
            label: "Start Time",
            value: dayjs(maintenanceFormState.values.start_Time),
            errorMessage: maintenanceFormState.errors.start_Time,
            disabled: false,
            maxDate: dayjs(maintenanceFormState?.values?.start_Time) || dayjs(),
        },
        end_Time: {
            name: "end_Time",
            label: "End Time",
            value: dayjs(maintenanceFormState.values.end_Time),
            errorMessage: maintenanceFormState.errors.end_Time,
            disabled: false,
            minDate: dayjs(maintenanceFormState?.values?.end_Time),
        },
        maintenanceType: {
            value: getMaintenanceValue(
                maintenanceFormState?.values?.maintenanceType || ""
            ),
            label: "Maintenance Type",
            name: "maintenanceType",
            errorMessage: maintenanceFormState?.errors?.maintenanceType as any,
            options: getMaintanceTypeList(),
            filterOptions,
        },
        maintenanceDone: {
            value: getMaintenanceDoneValue(
                maintenanceFormState?.values?.maintenanceDone || ""
            ),
            label: "Maintenance Done",
            name: "maintenanceDone",
            errorMessage: maintenanceFormState?.errors?.maintenanceDone as any,
            options: getMaintanceDoneList(),
            filterOptions,
        },
        vehicle_category: {
            value: getVehicleCategoryValue(
                maintenanceFormState?.values?.vehicle_category || ""
            ),
            label: "Vehicle Category",
            name: "vehicle_category",
            errorMessage: maintenanceFormState?.errors?.vehicle_category as any,
            options: getVehicleCategoryList(),
            filterOptions,
        },
        doorNo: {
            value: getDoorNoValue(maintenanceFormState?.values?.doorNo || ""),
            label: "Door No",
            name: "doorNo",
            errorMessage: maintenanceFormState?.errors?.doorNo as any,
            options: getDoorNoList,
            filterOptions,
        },
        others: {
            value: maintenanceFormState?.values?.others,
            label: "Other Reason",
            name: "others",
            errorMessage: maintenanceFormState?.errors?.others,
        },
    };
    return {
        formSchema,
        maintenanceFormState,
    };
};

export default useMaintenanceModal;
