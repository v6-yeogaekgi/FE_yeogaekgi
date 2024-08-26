import * as React from "react";
import Button from "@mui/material/Button";

// className도 매개변수로 받아야 되나? 네네네 그래서 제가 추가할게요 ㅎㅎ

const BasicButton = ({ text, variant, btnColor, width, onClick, textColor, endIcon, startIcon, size, className=''}) => {
    // variant = text | contained | outlined
  return (
    <Button
      className={className}
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
// export default Button;
