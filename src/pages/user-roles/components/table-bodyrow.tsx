import { FC } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { TableCell } from "@mui/material";

import { UserRoleData } from "@/models/responses/user-role-data";
import { CellAlignment, CommonRowEventType } from "@/models/types";
import { AppButton } from "@/components/form";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

interface BodyRowItemProps<T, K extends keyof T> extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    onRowEvent: (id: number, eventType: CommonRowEventType) => void;
    editDisabled: boolean;
    deleteDisabled: boolean;
}

const TableBodyRowItem: FC<BodyRowItemProps<UserRoleData, "id">> = (props) => {
    const {
        data: row,
        alignments,
        onRowEvent,
        deleteDisabled,
        editDisabled,
    } = props;
    const handleClick = (id: number, event: CommonRowEventType) => () =>
        onRowEvent(id, event);
    return (
        <>
            <TableCell align={alignments?.name || "left"}>{row.name}</TableCell>
            <TableCell align={alignments?.description || "left"}>
                {row.description}
            </TableCell>
            <TableCell align={alignments?.scopes || "left"}>
                {row.scopes.length}
            </TableCell>
            <TableCell align="right">
                <div className="flex items-center gap-1">
                    <AppButton
                        variant="icon"
                        size="small"
                        onClick={handleClick(row.id, "edit")}
                        disabled={editDisabled}>
                        <Edit fontSize="small" />
                    </AppButton>
                    <AppButton
                        variant="icon"
                        size="small"
                        onClick={handleClick(row.id, "delete")}
                        disabled={deleteDisabled || !row.canBeDeleted}>
                        <Delete fontSize="small" />
                    </AppButton>
                </div>
            </TableCell>
        </>
    );
};

export default TableBodyRowItem;
