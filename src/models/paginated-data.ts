export interface PaginatedData {
    pageNumber: number;
    rowsPerPage: number;
}

export interface ServerPaginatedData<T> {
    data: T;
    totalnumber: number;
}
export interface ServerPaginatedDataWithOffset<T>
    extends ServerPaginatedData<T> {
    offset: number;
}
