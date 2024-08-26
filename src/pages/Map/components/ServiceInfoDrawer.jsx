import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Global } from '@emotion/react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button component
import * as React from 'react';
import { useSelected } from './SelectedProvider';
import ReviewList from './ReviewList'; // Correctly import ReviewList component
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ReviewProvider } from './ReviewProvider'; // Import useNavigate from react-router-dom
const drawerBleeding = 56;

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const ServiceInfoDrawer = () => {
    const { Open, setOpen, SelectedServiceInfo } = useSelected();
    const navigate = useNavigate(); // Initialize useNavigate
    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };

    const handleNavigateToRegister = () => {
        navigate('/map/register');
    };

    return (
        <>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(60% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={Open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
                swipeAreaWidth={0}
                disableSwipeToOpen={false}
                disableBackdropTransition={true}
                allowSwipeInChildren={true}
                ModalProps={{
                    keepMounted: true,
                    BackdropProps: {
                        invisible: true,
                    },
                }}
                PaperProps={{
                    sx: {
                        width: '400px',
                        left: 'calc(50% - 200px)',
                    },
                }}
            >
                <Box
                    sx={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>
                        {SelectedServiceInfo?.name}
                        <br />
                        {SelectedServiceInfo?.content}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <ReviewProvider>
                        <ReviewList />
                    </ReviewProvider>
                </Box>
                {/* Add a button to navigate to the register page */}
                <Box sx={{ px: 2, pb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleNavigateToRegister}
                    >
                        Register
                    </Button>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default ServiceInfoDrawer;
