import React, { useEffect, useRef, useState } from "react";
import { Add, Delete, Search } from "@mui/icons-material";
import {
    alpha,
    Box,
    InputBase,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import clsx from "clsx";

import { useDebounce } from "@/hooks/useDebounce";
import { AppButton } from "@/components/form";

type ToolbarEventType = "add" | "delete";

interface TableToolbarProps {
    numSelected: number;
    resetPagination?: () => void;
    onIconClick?: (eventType: ToolbarEventType) => void;
    onTextSearch?: (text?: string) => void;
}

const TableToolbar = (props: TableToolbarProps) => {
    // const classes = useToolbarStyles();
    const { numSelected, onIconClick, onTextSearch, resetPagination } = props;
    const [text, setText] = useState("");
    const delayedQuery = useDebounce(text);

    const onSearch = (
        evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newText = evt.currentTarget.value;
        setText(newText);
    };

    useEffect(() => {
        if (onTextSearch) {
            resetPagination?.call(this);
            onTextSearch(delayedQuery);
        }
    }, [delayedQuery]);

    return (
        <Toolbar
            className={clsx("px-2", {
                "rounded-tl rounded-tr bg-primary-300 text-neutral-900":
                    numSelected > 0,
            })}>
            {numSelected > 0 ? (
                <Typography
                    className="flex grow flex-row"
                    color="inherit"
                    variant="subtitle1"
                    component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className="flex grow flex-row"
                    variant="h6"
                    id="tableTitle"
                    component="div">
                    <Tooltip title="Add" placement="top">
                        <AppButton
                            variant="icon"
                            buttonProps={{ "aria-label": "add" }}
                            onClick={() => onIconClick && onIconClick("add")}>
                            <Add />
                        </AppButton>
                    </Tooltip>
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <AppButton
                        variant="icon"
                        buttonProps={{ "aria-label": "delete" }}
                        onClick={() => onIconClick && onIconClick("delete")}>
                        <Delete />
                    </AppButton>
                </Tooltip>
            ) : (
                <Box
                    className="relative ml-1 mr-1 w-full p:ml-0 p:w-auto"
                    sx={{
                        borderRadius: (theme) => theme.shape.borderRadius + 1,
                        backgroundColor: (theme) =>
                            alpha(
                                theme.palette.mode === "light"
                                    ? theme.palette.common.black
                                    : theme.palette.common.white,
                                0.05
                            ),
                        "&:hover": {
                            backgroundColor: (theme) =>
                                alpha(
                                    theme.palette.mode === "light"
                                        ? theme.palette.common.black
                                        : theme.palette.common.white,
                                    0.07
                                ),
                        },
                    }}>
                    <div className="pointer-events-none absolute flex h-full flex-row items-center justify-center p-2">
                        <Search />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        onChange={onSearch}
                        value={text}
                        classes={{
                            root: "text-inherit",
                            input: "py-1 pr-1 !pl-10 w-full transition-all focus:w-56",
                        }}
                        inputProps={{ "aria-label": "search" }}
                    />
                </Box>
            )}
        </Toolbar>
    );
};

export default TableToolbar;
