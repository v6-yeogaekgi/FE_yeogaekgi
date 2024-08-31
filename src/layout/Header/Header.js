import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Music from '../../components/Music/music';
import "./style.css";
import { useState } from 'react';
import AreaMenu from '../../components/AreaMenu/AreaMenu';

const Header = ({ menuName, areas }) => {
    const navigate = useNavigate();
    const isHome = menuName === 'Home';
    
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ flexGrow: 1, color: '000', padding: 0 }} className="header">
            <AppBar
                position="static" elevation={0}
                sx={{ backgroundColor: 'white', color: 'black' }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{width: 40, visibility: isHome ? 'visible' : 'hidden', position: 'absolute', left: 10}}>
                        {isHome && (
                            <AreaMenu areas={areas}/>
                        )}
                    </Box>
                    <Box sx={{width: 40, visibility: isHome ? 'hidden' : 'visible', position: 'absolute', left: 10}}>
                        {!isHome && (
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
                        )}
                    </Box>
                    <Typography variant="h6" component="div" sx={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                        {menuName}
                    </Typography>
                    <Box sx={{ position: 'absolute', right: 10 }}>
                        <Music />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
