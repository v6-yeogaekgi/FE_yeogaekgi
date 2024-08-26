import React, { useState } from 'react';
import {
    IconButton,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import useReviewListAPI from './UseReviewListAPI';
import useReviewImgListAPI from './useReviewImgListAPI';
import { useReview } from './ReviewProvider';
import { useNavigate } from 'react-router-dom';

const ReviewList = () => {
    const { list, listApiLoading } = useReviewListAPI();
    const { img, imgApiLoading } = useReviewImgListAPI();
    const { selectedReview, setSelectedReview, onDelete } = useReview();
    const navigate = useNavigate(); // Initialize useNavigate

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event, reviewId) => {
        setAnchorEl(event.currentTarget);
        setSelectedReview(reviewId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedReview(null);
    };

    const handleEdit = () => {
        console.log(`Edit review ${selectedReview}`);
        navigate(`/map/edit/${selectedReview}`);
        handleMenuClose();
    };

    const handleReport = () => {
        console.log(`Report review ${selectedReview}`);
        handleMenuClose();
    };

    const handleDelete = () => {
        console.log(`Delete review ${selectedReview}`);
        onDelete(selectedReview);
        handleMenuClose();
    };

    if (!list || !Array.isArray(list.content)) {
        return <div>No reviews available.</div>;
    }

    return (
        <>
            <Swiper
                spaceBetween={1}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="mySwiper"
            >
                {img && img.length > 0 ? (
                    img.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: 'grey',
                                }}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={`Image by ${item.nickname}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <Box
                            sx={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'grey',
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                align="center"
                            >
                                No images available.
                            </Typography>
                        </Box>
                    </SwiperSlide>
                )}
            </Swiper>
            {list.content.map((review) => (
                <Card sx={{ width: '100%' }} key={review.reviewId}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="Nation"
                            >
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton
                                aria-label="settings"
                                onClick={(e) =>
                                    handleMenuClick(e, review.reviewId)
                                }
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={review.nickname}
                        subheader={`Score: ${review.score} ${review.modDate.substring(0, 10)}  `}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {review.content}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleReport}>Report</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export default ReviewList;
