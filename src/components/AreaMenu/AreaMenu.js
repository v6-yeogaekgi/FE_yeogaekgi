import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));

export default function AreaMenu({ areas }) {
    // console.log("areamenu: ", areas);
    // console.log("localstorage select area: ", localStorage.getItem('selectArea'));
    const [selectArea, setSelectArea] = useState(
        localStorage.getItem('selectArea') || areas[0],
    );
    // const selectArea = localStorage.getItem('selectArea');
    // const [area, setArea] = useState(areas);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (item) => {
        setSelectArea(item);
        localStorage.setItem('selectArea', item);
        console.log(selectArea);
        handleClose();

        // 커스텀 이벤트 발생
        window.dispatchEvent(new Event('localStorageChange'));
    };

    return (
        <Box>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="text"
                disableElevation
                onClick={handleClick}
                startIcon={<KeyboardArrowDownIcon />}
                sx={{
                    fontSize: '1.5rem',
                    minWidth: '100px',
                    minHeight: '48px',
                    fontFamily:
                        selectArea === '서울'
                            ? '"Song Myung", sans-serif'
                            : selectArea === '부산'
                            ? '"Song Myung", sans-serif'
                            : 'inherit',
                    fontWeight: 700,
                }}
            >
                {selectArea}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {areas.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItemClick(item)}
                        disableRipple
                    >
                        {item}
                    </MenuItem>
                ))}
            </StyledMenu>
        </Box>
    );
}
