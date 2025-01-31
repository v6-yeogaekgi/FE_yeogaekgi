import React, { useEffect, useRef, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Global } from '@emotion/react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Rating } from '@mui/material';
import ReviewList from './ReviewList';
import ReviewImgList from './ReviewImgList';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useSelected } from '../provider/SelectedProvider';
import { useReview } from '../provider/ReviewProvider';
import BasicButton from '../../../components/BasicButton/BasicButton';

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
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [isInfoExpanded, setIsInfoExpanded] = useState(false); // 정보 섹션의 열림 상태 관리
    const {
        open,
        selectedServiceInfo,
        selectedService,
        like,
        setLike,
        setViewLikeCnt,
        handleLikeChange,
        likeCheck,
        toggleDrawer,
        viewLikeCnt,
    } = useSelected();
    const { avgScore, img } = useReview();

    useEffect(() => {
        const fetchLikeData = async () => {
            if (selectedService) {
                const result = await likeCheck();
                console.log('likeCheck result:', result); // 콘솔에 반환된 값 출력
                if (result) {
                    setLike(result.likeStatus);
                    setViewLikeCnt(result.count);
                }
            }
        };
        fetchLikeData();
    }, [selectedService]);

    useEffect(() => {
        console.log('총 리뷰 수 ' + avgScore);
        if (avgScore) {
            setScore(avgScore);
        } else {
            setScore(0);
        }
    }, [img, avgScore]);

    const handleNavigateToRegister = () => {
        const name = selectedServiceInfo.name; // service name
        const serviceId = selectedService;
        navigate(`/map/register/${name}/${serviceId}`);
    };

    const toggleInfoExpansion = () => {
        setIsInfoExpanded(!isInfoExpanded);
    };

    return (
        <>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(70% - ${drawerBleeding}px)`,
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
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        visibility: 'visible',
                    },
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <Puller />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        pl: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'text.primary',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                height: 40,
                            }}
                            variant="h6"
                        >
                            {selectedServiceInfo?.name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: 'lightgrey',
                            mr: 3,
                        }}
                    >
                        <Checkbox
                            checked={like || false}
                            icon={<FavoriteBorder />}
                            onChange={handleLikeChange}
                            checkedIcon={<Favorite sx={{ color: 'red' }} />}
                            sx={{
                                p: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        />
                        {viewLikeCnt}
                    </Box>
                </Box>
                <Typography
                    sx={{
                        pl: 2,
                        pr: 3,
                        color: 'text.secondary',
                    }}
                >
                    {selectedServiceInfo?.address}
                </Typography>

                <Box sx={{ pl: 2, pr: 3 }}>
                    <Typography
                        onClick={toggleInfoExpansion}
                        sx={{
                            color: 'text.secondary',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Information {isInfoExpanded ? '🔼' : '🔽'}
                    </Typography>
                    {isInfoExpanded && (
                        <Typography
                            sx={{
                                mt: 1,
                                color: 'text.secondary',
                            }}
                        >
                            {selectedServiceInfo?.content}
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: 2,
                    }}
                >
                    <Typography
                        sx={{
                            color: 'text.primary',
                            mr: 1,
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'medium',
                        }}
                    >
                        {score}
                    </Typography>
                    <Stack
                        spacing={1}
                        sx={{ mr: 1, display: 'flex', alignItems: 'center' }}
                    >
                        <Rating
                            name="half-rating-read"
                            value={score}
                            precision={0.5}
                            readOnly
                            size="medium"
                        />
                    </Stack>
                </Box>

                <Box
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflowY: 'auto',
                    }}
                >
                    <ReviewImgList />
                    <ReviewList />
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                    <BasicButton
                        text="Register"
                        variant="contained"
                        btnColor="#4653f9"
                        width="100%"
                        onClick={handleNavigateToRegister}
                        textColor="white"
                        height="50px"
                        isActive={true}
                    />
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default ServiceInfoDrawer;
