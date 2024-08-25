import { Link } from "react-router-dom";

import PageWithHeaderFooter from "@/layouts/page-with-header-footer";
import { AppButton } from "@/components/form";

function WIP() {
    return (
        <PageWithHeaderFooter>
            <div className="flex h-full flex-col items-center justify-center">
                <h1 className="text-slate-600">Coming Soon</h1>
                <AppButton buttonProps={{ LinkComponent: Link, to: "/" }} variant="contained">
                    Go to Home
                </AppButton>
            </div>
        </PageWithHeaderFooter>
    );
}

export default WIP;
