import React, { FC } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

import ActionDialog from "@/components/action-dialog";
import ActionSidebar, {
    ActionSidebarBody,
    ActionSidebarTitle,
} from "@/components/action-sidebar";
import { AppButton } from "@/components/form";

interface PreviewSidebarProps {
    open: boolean;
    onClose: () => void;
    pdfUrl: string | null;
}

const FilePreviewSidebar: FC<PreviewSidebarProps> = ({
    open,
    onClose,
    pdfUrl,
}) => {
    return (
        <ActionSidebar
            className="!z-[9999]"
            open={open}
            onClose={onClose}
            size="medium">
            <ActionSidebarTitle>PDF Preview</ActionSidebarTitle>
            <ActionSidebarBody>
                {pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        title="PDF Preview"
                        style={{
                            border: "none",
                            margin: 0,
                            padding: 0,
                        }}
                    />
                ) : (
                    <p>No PDF to preview</p>
                )}
            </ActionSidebarBody>
            <DialogActions>
                <AppButton onClick={onClose} color="primary">
                    Close
                </AppButton>
            </DialogActions>
        </ActionSidebar>
    );
};

export default FilePreviewSidebar;
