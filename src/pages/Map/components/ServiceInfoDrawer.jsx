import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Global } from '@emotion/react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Rating } from '@mui/material';
import ReviewList from './ReviewList';
import ReviewImgList from './ReviewImgList';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { useSelected } from '../provider/SelectedProvider';
import { useReview } from '../provider/ReviewProvider';

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
    const {
        open,
        selectedServiceInfo,
        selectedService,
        like,
        handleLikeChange,
        likeCheck,
        toggleDrawer,
        setViewLikeCnt,
        viewLikeCount,
    } = useSelected();
    const { list } = useReview();

    useEffect(() => {
        if (selectedServiceInfo && selectedServiceInfo.likeCnt !== undefined) {
            setViewLikeCnt(selectedServiceInfo.likeCnt);
            likeCheck();
        }
    }, [selectedServiceInfo]);

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
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        visibility: 'visible',
                    },
                }}
            >
                <Box sx={{ mb: 2 }}>
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
                                display: 'flex', // flexbox를 사용해 수직 중앙 정렬
                                alignItems: 'center', // 텍스트를 수직 중앙에 배치
                                height: 40, // 고정 높이 설정
                            }}
                            variant="h6"
                        >
                            {selectedServiceInfo?.name}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                                ml: 1,
                                display: 'flex', // flexbox를 사용해 수직 중앙 정렬
                                pt: 0.5,
                                alignItems: 'center', // 텍스트를 수직 중앙에 배치
                                height: 40, // 고정 높이 설정
                            }}
                        ></Typography>
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
                            checked={like}
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
                        {viewLikeCount}
                    </Box>
                </Box>

                <Typography
                    sx={{
                        pl: 2,
                        pr: 3,
                        color: 'text.secondary',
                    }}
                >
                    {selectedServiceInfo?.content}
                </Typography>

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
                        overflow: 'auto',
                    }}
                >
                    <ReviewImgList />
                    <ReviewList />
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
