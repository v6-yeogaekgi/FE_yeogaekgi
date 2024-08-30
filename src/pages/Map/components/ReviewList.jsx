import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useReview } from '../provider/ReviewProvider';
import { useSelected } from '../provider/SelectedProvider';
import { getCountryImgById } from '../../../util';

const ReviewList = () => {
    const {
        list,
        selectedReview,
        setSelectedReview,
        deleteReview,
        ReviewImgList,
        reviewList,
    } = useReview();
    const { selectedServiceInfo, selectedService, toggleDrawer } =
        useSelected();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        ReviewImgList();
        reviewList();
        console.log(reviewList);
    }, [selectedService]);

    const handleMenuClick = (event, reviewId) => {
        setAnchorEl(event.currentTarget);
        setSelectedReview(reviewId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedReview(null);
    };

    const handleEdit = () => {
        const name = selectedServiceInfo.name;
        navigate(`/map/edit/${name}/${selectedService}/${selectedReview}`);
        handleMenuClose();
    };

    const handleReport = () => {
        console.log(`Report review ${selectedReview}`);
        handleMenuClose();
    };

    const handleDelete = async () => {
        try {
            await deleteReview(selectedReview);
            reviewList();
            ReviewImgList();
            await handleMenuClose();
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };

    if (!list || !list.content || !Array.isArray(list.content)) {
        return <div>리뷰가 없습니다.</div>;
    }

    return (
        <>
            {list.content.map((review) => (
                <Card sx={{ width: '100%' }} key={review.reviewId}>
                    <CardHeader
                        avatar={
                            <Avatar
                                alt="Country Flag"
                                src={getCountryImgById(
                                    `${review.country.code}`,
                                )}
                            ></Avatar>
                        }
                        action={
                            <IconButton
                                onClick={(e) =>
                                    handleMenuClick(e, review.reviewId)
                                }
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={review.nickname}
                        subheader={`Score: ${review.score} ${review.modDate.substring(0, 10)}`}
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
                <MenuItem onClick={handleEdit}>EDIT</MenuItem>
                <MenuItem onClick={handleReport}>REPORT</MenuItem>
                <MenuItem onClick={handleDelete}>DELETE</MenuItem>
            </Menu>
        </>
    );
};

export default ReviewList;
