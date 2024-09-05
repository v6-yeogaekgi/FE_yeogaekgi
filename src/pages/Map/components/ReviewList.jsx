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
    Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useReview } from '../provider/ReviewProvider';
import { useSelected } from '../provider/SelectedProvider';
import { getCountryCodeForTranslate, getCountryImgById } from '../../../util';
import TranslateIcon from '@mui/icons-material/Translate';

const ReviewList = () => {
    const {
        list,
        selectedReview,
        setSelectedReview,
        deleteReview,
        ReviewImgList,
        reviewList,
        deepLApi,
    } = useReview();
    const { selectedServiceInfo, selectedService } = useSelected();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [translationStates, setTranslationStates] = useState({});

    useEffect(() => {
        ReviewImgList();
        reviewList();
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
            handleMenuClose();
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };

    const handleTranslate = async (reviewId, content, lang) => {
        const isTranslated = translationStates[reviewId]?.isTranslated;

        if (isTranslated) {
            setTranslationStates({
                ...translationStates,
                [reviewId]: { isTranslated: false, translatedContent: null },
            });
        } else {
            try {
                const translatedContentText = await deepLApi(
                    content,
                    getCountryCodeForTranslate(lang),
                );
                console.log('번역된 언어' + translatedContentText);
                console.log('번환된 코드' + getCountryCodeForTranslate(lang));
                setTranslationStates({
                    ...translationStates,
                    [reviewId]: {
                        isTranslated: true,
                        translatedContent: translatedContentText,
                    },
                });
            } catch (error) {
                console.error('Translation failed:', error);
            }
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
                            />
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
                        subheader={`Score: ${
                            review.score
                        } ${review.modDate.substring(0, 10)}`}
                    />
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {translationStates[review.reviewId]?.isTranslated
                                ? translationStates[review.reviewId]
                                      .translatedContent
                                : review.content}
                        </Typography>
                        <Button
                            id="translate-button"
                            size="small"
                            aria-label="translate"
                            startIcon={<TranslateIcon />}
                            sx={{
                                color: '#4653f9',
                                padding: '4px 8px',
                                fontSize: '0.75rem',
                                height: '24px',
                                minWidth: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                '& .MuiButton-startIcon': {
                                    marginRight: 0,
                                },
                            }}
                            onClick={() =>
                                handleTranslate(
                                    review.reviewId,
                                    review.content,
                                    review.country.code,
                                )
                            }
                        />
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
