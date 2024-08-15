import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const StarCheckbox = ({ onClick }) => {
    return (
        <Checkbox
            icon={<StarBorderIcon />}
            checkedIcon={<StarIcon />}
            sx={{
                color: "yellow",
                "&.Mui-checked": {
                    color: "yellow",
                },
            }}
            onClick={onClick}
        />
    );
};

export default StarCheckbox;