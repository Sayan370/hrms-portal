import { Link } from "react-router-dom";

import PublicLayout from "@/layouts/public-layout";
import { AppButton, AppLink } from "@/components/form";

function NotFound() {
    return (
        <PublicLayout>
            <div className="flex h-full flex-col items-center justify-center">
                <h1 className="text-slate-50">Not Found</h1>
                <AppButton variant="contained" buttonProps={{ to: "/", LinkComponent: Link }}>
                    Go Home
                </AppButton>
            </div>
        </PublicLayout>
    );
}

export default NotFound;
