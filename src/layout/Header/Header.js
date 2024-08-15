import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import "./style.css";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Header = ({ menuName }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ flexGrow: 1, color: '000', className: 'header'}}>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                            '&:active': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            },
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        {menuName}
                    </Typography>
                    <Box sx={{ width: 48 }} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;