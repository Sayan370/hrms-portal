import {
    ArrowRight,
    BusinessOutlined,
    ChevronRight,
    PaymentsOutlined,
    ReceiptLongOutlined,
} from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { Link } from "react-router-dom";

import { AuthedRoutes } from "@/constants/route-constants";
import { getFormattedNumber } from "@/utils/object-utils";
import PageWithHeaderFooter from "@/layouts/page-with-header-footer";
import useUserRole from "@/hooks/useUserRole";
import InfoCard, { InfoCardActions } from "@/components/cards";
import { AppButton } from "@/components/form";

import useDashboard from "./hooks/useDashboard";

const DashboardPage = () => {
    const { menuItems } = useDashboard();
    const { shouldShow: shouldShowCPO } = useUserRole({
        allowedRoles: ["CPO", "SuperAdmin"],
    });
    const { shouldShow: shouldShowHR } = useUserRole({
        allowedRoles: ["HRHead", "SuperAdmin"],
    });
    const onExport = () => {
        window.open(
            "https://docs.google.com/spreadsheets/d/1odemWls5b3MjxEZxRQi6S40uHS-xOKwX4MaRtXsQJoM/edit?gid=0#gid=0"
        );
    };
    const onPendingDocumentExport = () => {
        window.open(
            "https://docs.google.com/spreadsheets/d/1_HbGeR9ktd6djrhWgqqpk1vGzG1qJSyRuOowTQqAYhY/edit?gid=0#gid=0"
        );
    };
    const onPendingLeaveExport = () => {
        window.open(
            "https://docs.google.com/spreadsheets/d/1ejxRnCVAJ9sG-2MSTvAGmCcUNso5-6LB5JqjsmoWMeA/edit?gid=0#gid=0"
        );
    };

    return (
        <PageWithHeaderFooter classes={{ body: "@container" }}>
            <div className="mx-auto grid w-full grid-cols-1 gap-4 tp:w-10/12 tp:grid-cols-2 d:grid-cols-3">
                {shouldShowHR && (
                    <>
                        <InfoCard
                            className="!bg-red-100 dark:!bg-red-900"
                            title="Total Employees"
                            menu={menuItems}>
                            <div className="my-4">
                                <span className="ml-2 text-3xl font-bold">
                                    200
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-green-100 dark:!bg-green-900"
                            title="Active Employees"
                            menu={menuItems}>
                            <div className="my-4">
                                <span className="ml-2 text-3xl font-bold">
                                    105
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-primary-100 dark:!bg-primary-950"
                            title="Employees On Leave"
                            menu={menuItems}>
                            <div className="my-4">
                                <span className="my-4 ml-2 text-3xl font-bold">
                                    10
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-yellow-100 dark:!bg-yellow-600"
                            title="Pending Leave Requests"
                            menu={menuItems}>
                            <div className="my-4">
                                {/* <span>INR</span> */}
                                <span className="my-4 ml-2 text-3xl font-bold">
                                    2
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onPendingLeaveExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-orange-100 dark:!bg-orange-600"
                            title="Pending Document Verifications"
                            menu={menuItems}>
                            <div className="my-4">
                                {/* <span>INR</span> */}
                                <span className="my-4 ml-2 text-3xl font-bold">
                                    1
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onPendingDocumentExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-blue-100 dark:!bg-blue-600"
                            title="Managerial Employee Cost"
                            menu={menuItems}>
                            <div className="my-4">
                                <span>INR</span>
                                <span className="my-4 ml-2 text-3xl font-bold">
                                    {getFormattedNumber(10000000, "hi-IN")}
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-orange-100 dark:!bg-orange-600"
                            title="Non-Managerial Employee Cost"
                            menu={menuItems}>
                            <div className="my-4">
                                <span>INR</span>
                                <span className="my-4 ml-2 text-3xl font-bold">
                                    {getFormattedNumber(4000000, "hi-IN")}
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-amber-100 dark:!bg-amber-600"
                            title="Other Staff Cost"
                            menu={menuItems}>
                            <div className="my-4">
                                <span>INR</span>
                                <span className="my-4 ml-2 text-3xl font-bold">
                                    {getFormattedNumber(600000, "hi-IN")}
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                    </>
                )}
                {shouldShowCPO && (
                    <>
                        <InfoCard
                            className="!bg-red-100 dark:!bg-red-900"
                            title="Total Stock Count"
                            menu={menuItems}>
                            <div className="my-4">
                                <span className="ml-2 text-3xl font-bold">
                                    200
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-green-100 dark:!bg-green-900"
                            title="Pending Requisitions"
                            menu={menuItems}>
                            <div className="my-4">
                                <span className="ml-2 text-3xl font-bold">
                                    105
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-primary-100 dark:!bg-primary-950"
                            title="Aging Inventory Items"
                            menu={menuItems}>
                            <div className="my-4">
                                <span className="my-4 ml-2 text-3xl font-bold">
                                    10
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                        <InfoCard
                            className="!bg-yellow-100 dark:!bg-yellow-600"
                            title="Out-of-Stock Items"
                            menu={menuItems}>
                            <div className="my-4">
                                {/* <span>INR</span> */}
                                <span className="my-4 ml-2 text-3xl font-bold">
                                    2
                                </span>
                            </div>
                            <InfoCardActions>
                                <AppButton
                                    buttonProps={{
                                        endIcon: <ChevronRight />,
                                    }}
                                    variant="text"
                                    onClick={onExport}>
                                    See More
                                </AppButton>
                            </InfoCardActions>
                        </InfoCard>
                    </>
                )}
            </div>
        </PageWithHeaderFooter>
    );
};

export default DashboardPage;
