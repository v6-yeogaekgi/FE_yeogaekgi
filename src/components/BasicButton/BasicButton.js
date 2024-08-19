import * as React from "react";
import Button from "@mui/material/Button";

// className도 매개변수로 받아야 되나?

const BasicButton = ({ text, variant, btnColor, width, onClick, textColor, endIcon, startIcon, size }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        backgroundColor: btnColor,
        color: textColor,
        "&:hover": {
          backgroundColor: btnColor,
          filter: "brightness(80%)",
        },
        width: width,
        textTransform: 'none',
      }}
      startIcon={startIcon}
      endIcon={endIcon}
      size = {size}

    >
      {text}
    </Button>
  );
};

export default BasicButton;
