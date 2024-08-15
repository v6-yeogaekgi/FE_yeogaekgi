import * as React from "react";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function LeftArrowButton({variant, onClick}) {
    return (
        <Button
            variant={variant}
            startIcon={<ChevronLeftIcon />}
            onClick={onClick}
        >
            Back
        </Button>
    );
}