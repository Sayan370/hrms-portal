import React from "react";
import {
    Box,
    CircularProgress,
    CircularProgressProps,
    Typography,
} from "@mui/material";

export default function CircularProgressWithLabel({
    size,
    ...rest
}: CircularProgressProps & { value: number }) {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" size={size} {...rest} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Typography
                    fontSize={typeof size === "number" ? size / 3 : undefined}
                    variant="caption"
                    component="div"
                    color="text.secondary">{`${Math.round(
                    rest.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
