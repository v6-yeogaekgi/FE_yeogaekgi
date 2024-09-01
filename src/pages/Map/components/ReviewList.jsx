import React, { useEffect, useRef, useCallback, useContext } from 'react';
import { useReview } from '../provider/ReviewProvider';
import { useSelected } from '../provider/SelectedProvider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TranslateIcon from '@mui/icons-material/Translate';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { getCountryCodeForTranslate, getCountryImgById } from '../../../util';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Button,
    Box,
} from '@mui/material';
import { AllStateContext } from '../../../App';
import useConfirmDialog from '../../../hooks/useConfirmDialog/useConfirmDialog';

const ReviewList = () => {
    const {
        list,
        selectedReview,
        setSelectedReview,
        deleteReview,
        ReviewImgList,
        reviewList,
        deepLApi,
        hasMore,
        apiLoading,
    } = useReview();
    const { selectedService, selectedServiceInfo } = useSelected();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [translationStates, setTranslationStates] = React.useState({});
    const userString = localStorage.getItem('member');
    const { dialog } = useContext(AllStateContext);
    const user = JSON.parse(userString);
    const target = useRef(null);
    const navigate = useNavigate();
    const { openConfirmDialog, ConfirmDialog } = useConfirmDialog();
    const loadMoreReviews = useCallback(() => {
        if (hasMore && !apiLoading) {
            reviewList();
        }
    }, [hasMore, apiLoading, reviewList]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreReviews(); // Load more reviews when the last element is in view
                }
            },
            {
                threshold: 1.0, // Trigger when the element is fully in view
            },
        );

        if (target.current) {
            observer.observe(target.current);
        }

        return () => {
            if (observer && target.current) {
                observer.unobserve(target.current);
            }
        };
    }, [loadMoreReviews]);

    useEffect(() => {
        if (selectedService) {
            reviewList(true); // Reload review list on service change
        }
    }, [selectedService]);

    useEffect(() => {
        ReviewImgList();
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

    const handleDelete = async () => {
        await deleteReview(selectedReview);
        await reviewList(true);
        await ReviewImgList();
        handleMenuClose(); // Close the menu
    };

    const handleTranslate = async (reviewId, content, lang) => {
        const isTranslated = translationStates[reviewId]?.isTranslated;

        if (isTranslated) {
            setTranslationStates((prev) => ({
                ...prev,
                [reviewId]: { isTranslated: false, translatedContent: null },
            }));
        } else {
            try {
                const translatedContentText = await deepLApi(
                    content,
                    getCountryCodeForTranslate(lang),
                );
                setTranslationStates((prev) => ({
                    ...prev,
                    [reviewId]: {
                        isTranslated: true,
                        translatedContent: translatedContentText,
                    },
                }));
            } catch (error) {
                dialog.alert.openAlertDialog(
                    'Translation Failed',
                    'There was an error while translating the review content.',
                );
            }
        }
    };

    if (!list || !Array.isArray(list)) {
        return <div>No reviews available.</div>;
    }

    return (
        <>
            {list.map((review, index) => (
                <Card
                    sx={{ width: '100%', mb: 2 }}
                    key={`${review.reviewId}-${index}`}
                >
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
                            user.nickname === review.nickname && (
                                <IconButton
                                    onClick={(e) =>
                                        handleMenuClick(e, review.reviewId)
                                    }
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            )
                        }
                        title={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {review.nickname}
                                {review.paymentId && (
                                    <VerifiedRoundedIcon
                                        sx={{ color: 'primary.main', ml: 1 }}
                                    />
                                )}
                            </Box>
                        }
                        subheader={`Score: ${review.score} ${review.modDate.substring(0, 10)}`}
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
            <div ref={target} style={{ height: '20px' }} />
            {apiLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Typography>Loading more reviews...</Typography>
                </Box>
            )}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>EDIT</MenuItem>
                <MenuItem onClick={handleDelete}>DELETE</MenuItem>
            </Menu>
        </>
    );
};

export default ReviewList;
