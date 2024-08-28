import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const ReviewList = ({ list, selectedService, selectedServiceInfo }) => {
    useEffect(() => {
        console.log('ReviewList received new list:', list);
    }, [list]);

    const { selectedReview, setSelectedReview, onDelete, onCreate, onUpdate } =
        useReview();
    const navigate = useNavigate();
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
        const name = selectedServiceInfo.name;
        navigate(`/map/edit/${name}/${selectedService}/${selectedReview}`);
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
