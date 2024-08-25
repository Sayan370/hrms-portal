import { FC } from "react";
import { TableCell } from "@mui/material";
import clsx from "clsx";

import {
    MaintenanceData,
    MaintenanceType,
} from "@/models/responses/maintenance-data";
import { getFormattedDate } from "@/utils/date-utils";
import { separateWords } from "@/utils/object-utils";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    // onRowEvent: (id: string, eventType: CommonRowEventType) => void;
}

const TableBodyRowItem: FC<BodyRowItemProps<MaintenanceData, "id">> = (
    props
) => {
    const { data: row, alignments, arrayData } = props;

    const getColor = () => {
        const tailwindColors = ["bg-red-200", "bg-green-200"];
        const randomIndex = Math.floor(Math.random() * tailwindColors.length);
        return tailwindColors[randomIndex];
    };
    return (
        <>
            <TableCell align={alignments?.id || "left"}>
                {arrayData.index + 1}
            </TableCell>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.doorNo || "left"}>
                {row.doorNo}
            </TableCell>
            <TableCell align={alignments?.date || "left"}>
                {getFormattedDate(row.date, "DD/MM/YYYY")}
            </TableCell>
            <TableCell align={alignments?.maintenanceType || "left"}>
                {separateWords(MaintenanceType[row.maintenanceType])}
            </TableCell>
            <TableCell
                className={clsx(getColor(), "min-w-[100px] capitalize")}
                align={alignments?.timeTaken || "left"}>
                <span
                    className={clsx(
                        `flex items-center justify-center text-black`
                    )}>
                    {row.timeTaken}
                </span>
            </TableCell>
            <TableCell align={alignments?.maintenanceDone || "left"}>
                <span className="flex flex-col whitespace-nowrap">
                    {row.maintenanceDone?.map((d, i) => (
                        <span className="flex flex-row gap-1">
                            <span>{i + 1}</span> <span>{d}</span>
                        </span>
                    ))}
                </span>
            </TableCell>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.totalTimeTakenDay || "left"}>
                {row.totalTimeTakenDay}
            </TableCell>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.totalTimeTakenVehicle || "left"}>
                {row.totalTimeTakenVehicle}
            </TableCell>
        </>
    );
};

export default TableBodyRowItem;
