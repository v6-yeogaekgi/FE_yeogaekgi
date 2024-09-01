import * as React from 'react';
import Button from '@mui/material/Button';

// className도 매개변수로 받아야 되나? 네네네 그래서 제가 추가할게요 ㅎㅎ

const BasicButton = ({
                         text,
                         variant = 'outlined',
                         btnColor = '#4653f9',
                         width,
                         onClick,
                         textColor = 'white',
                         endIcon,
                         startIcon,
                         size,
                         className = '',
                         height = '50px',
                         isActive = true,
                     }) => {
    // variant = text | contained | outlined
    return (
        <Button
            className={className}
            variant={variant}
            onClick={onClick}
            disabled={!isActive}
            sx={{
                borderColor: (variant === 'outlined') ? btnColor : '',
                textColor: textColor,
                backgroundColor: (variant === 'outlined') ? '' : btnColor,
                '&:hover': {
                    backgroundColor: (variant === 'outlined') ? '' : btnColor,
                    filter: 'brightness(80%)',
                },
                width: width,
                height: height,
                textTransform: 'capitalize',
                fontFamily: 'Noto Sans, sans-serif',
                fontSize: '16px',
                borderRadius: 5,
                mt: 1,
                mb: 1,
            }}
            startIcon={startIcon}
            endIcon={endIcon}
            size={size}

        >
            {text}
        </Button>

    );
};

export default BasicButton;
// export default Button;
