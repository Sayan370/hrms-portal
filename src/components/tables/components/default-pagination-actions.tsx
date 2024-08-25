import { ChangeEvent, useEffect, useMemo, useState } from "react";
import TablePaginationActions, {
    TablePaginationActionsProps,
} from "@mui/material/TablePagination/TablePaginationActions";

import { useDebounce } from "@/hooks/useDebounce";
import { AppInput } from "@/components/form";

const DefaultPaginationActions = ({
    page,
    onPageChange,
    count,
    rowsPerPage,
    ...rest
}: TablePaginationActionsProps) => {
    const maxPage = useMemo(
        () => Math.ceil(count / rowsPerPage) - 1,
        [count, rowsPerPage]
    );
    const [current, setPage] = useState(page);
    const delayedPage = useDebounce(current, 1000);
    const handlePageChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const insertedPage = Number(evt.target.value);
        if (insertedPage <= maxPage) {
            setPage(Number(evt.target.value));
        }
    };

    useEffect(() => {
        onPageChange(null, delayedPage);
    }, [delayedPage]);

    useEffect(() => {
        if (page !== delayedPage) {
            setPage(page);
        }
    }, [page]);

    return (
        <>
            <AppInput
                label="Jump to Page"
                className="ml-5 !w-36 min-w-[8rem] p:min-w-min"
                value={current}
                inputProps={{
                    inputProps: { max: maxPage, min: 0 },
                }}
                onChange={handlePageChange}
                type="number"
                size="small"
            />
            <TablePaginationActions
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                {...rest}
            />
        </>
    );
};

export default DefaultPaginationActions;
