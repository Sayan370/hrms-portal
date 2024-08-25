import { useMemo } from "react";
import { selectUser } from "@/stores/modules/authentication";
import {
    BusinessOutlined,
    ChevronRight,
    GetApp,
    PaymentsOutlined,
    ReceiptLongOutlined,
    VisibilityOff,
} from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { useSelector } from "react-redux";

import { UserRole } from "@/models/responses/user-role-data";
import { AuthedRoutes } from "@/constants/route-constants";

const useDashboard = () => {
    const menuItems = [
        { title: "Hide", value: "hide", icon: <VisibilityOff /> },
        { title: "Export", value: "export", icon: <GetApp /> },
    ];

    return { menuItems };
};

export default useDashboard;
