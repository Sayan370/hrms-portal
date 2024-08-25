import React, { useMemo, useState } from "react";

interface UsePaginationProps {
    defaultPage?: number;
    rowsPerPage?: number;
}

const usePagination = (props?: UsePaginationProps) => {
    const { defaultPage, rowsPerPage = 5 } = props ?? {};
    const [page, setPage] = useState<number>(defaultPage ?? 0);
    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        page: number
    ) => {
        setPage(page);
    };
    const offset = useMemo(() => rowsPerPage * (page + 1), [page]);
    const prevOffset = useMemo(() => rowsPerPage * page, [page]);
    return {
        page,
        offset,
        prevOffset,
        handlePageChange,
    };
};

export default usePagination;
