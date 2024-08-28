import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Global } from '@emotion/react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button component
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Rating } from '@mui/material';
import useReviewListAPI from '../api/UseReviewListAPI';
import useReviewImgListAPI from '../api/useReviewImgListAPI';
import ReviewList from './ReviewList';
import ReviewImgList from './ReviewImgList';
import { useNavigate } from 'react-router-dom';

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

const ServiceInfoDrawer = ({
    open,
    setOpen,
    selectedServiceInfo,
    selectedService,
}) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const { list, listApiLoading } = useReviewListAPI(selectedService);
    const { img, imgApiLoading } = useReviewImgListAPI(selectedService);
    const [score, setScore] = useState(0);

    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };

    const handleNavigateToRegister = () => {
        const name = selectedServiceInfo.name;
        navigate(`/map/register/${selectedService}/${name}`);
    };

    useEffect(() => {
        if (list != null) {
            const totalScore = list.content.reduce(
                (acc, scores) => acc + scores.score,
                0,
            );
            let avgScore = Math.round((totalScore / list.size) * 10) / 10;
            setScore(avgScore);
        }
    }, [list]);

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
                open={open}
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
                    <Typography sx={{ pl: 2, pt: 2, color: 'text.primary' }}>
                        {selectedServiceInfo?.name}{' '}
                        {selectedServiceInfo?.serviceType}
                    </Typography>
                    <Typography sx={{ pl: 2, color: 'text.secondary' }}>
                        {selectedServiceInfo?.content}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            pl: 2,
                        }}
                    >
                        <Typography sx={{ color: 'text.warning' }}>
                            {score}
                        </Typography>
                        <Stack spacing={1}>
                            <Rating
                                name="half-rating-read"
                                value={score}
                                precision={0.5}
                                readOnly
                                size="small"
                            />
                        </Stack>
                    </Box>
                </Box>
                <Box
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <ReviewImgList img={img} />
                    <ReviewList
                        list={list}
                        selectedServiceInfo={selectedServiceInfo}
                        selectedService={selectedService}
                    />
                </Box>
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
