import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const LikeCheckbox = ({ onClick, checked }) => {
    return (
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={checked}
        sx={{
          color: "red",
          "&.Mui-checked": {
            color: "red",
          },
        }}
        onClick={onClick}
      />
    );
};

export default LikeCheckbox;