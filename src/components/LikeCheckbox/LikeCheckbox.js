import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const LikeCheckbox = ({ onClick }) => {
    return (
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
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