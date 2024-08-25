import FailedMessage from "@/components/failed-message";
import { Loading } from "@/components/loading";
import { ResponsiveTable } from "@/components/tables";

import useRequisition from "../hooks/useRequisition";
import RequisitionForm from "./requisition-form";
import TableReqBodyRowItem from "./table-req-bodyrow";

const RequisitionTab = () => {
    const { error, headCells, rows, status } = useRequisition();
    return (
        <>
            {status === "loading" && <Loading grow />}
            {status === "error" && <FailedMessage grow text={error?.message} />}
            {status === "success" && (
                <>
                    <RequisitionForm />
                    <ResponsiveTable
                        tableStyle="bordered"
                        primaryKey="id"
                        // showToolBar
                        data={{
                            values: rows ?? [],
                            headerData: headCells,
                        }}
                        components={{
                            BodyComponent: TableReqBodyRowItem,
                        }}
                        // innerProps={{
                        //     bodyProps: {
                        //         onRowEvent: onRowAction,
                        //     },
                        // }}
                        rowCount={20}
                        rowsPerPageOptions={[5, 10, 20]}
                        size="small"
                    />
                </>
            )}
        </>
    );
};

export default RequisitionTab;
